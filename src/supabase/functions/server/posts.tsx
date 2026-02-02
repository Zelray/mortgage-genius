/**
 * ============================================================================
 * BLOG POSTS API - TIER 3
 * ============================================================================
 * CRUD operations for blog posts
 * Routes: GET /posts, POST /posts, GET /posts/:id, PUT /posts/:id, DELETE /posts/:id
 * ============================================================================
 */

import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const posts = new Hono();

const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};

// Verify user is authenticated
const verifyAuth = async (c: any) => {
  const authHeader = c.req.header('Authorization');
  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    return null;
  }

  const supabase = getSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role || 'editor',
    name: user.user_metadata?.name || user.email
  };
};

/**
 * GET /posts
 * Get all posts (public can see published, auth can see all)
 */
posts.get("/", async (c) => {
  try {
    const user = await verifyAuth(c);
    const statusFilter = c.req.query('status'); // published, draft, or all

    // Get all posts from KV store
    const allPosts = await kv.getByPrefix('post:');

    let filteredPosts = allPosts;

    // Filter by status
    if (!user && statusFilter !== 'all') {
      // Public users only see published posts
      filteredPosts = allPosts.filter((p: any) => p.status === 'published');
    } else if (statusFilter && statusFilter !== 'all') {
      filteredPosts = allPosts.filter((p: any) => p.status === statusFilter);
    }

    // Sort by creation date (newest first)
    filteredPosts.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ success: true, posts: filteredPosts });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return c.json({ success: false, error: 'Failed to fetch posts' }, 500);
  }
});

/**
 * GET /posts/by-slug/:slug
 * Get a single post by slug (public endpoint)
 */
posts.get("/by-slug/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');

    // Get all posts and find by slug
    const allPosts = await kv.getByPrefix('post:');
    const post = allPosts.find((p: any) => p.slug === slug);

    if (!post) {
      return c.json({ success: false, error: 'Post not found' }, 404);
    }

    // Only return published posts to public
    const user = await verifyAuth(c);
    if (!user && post.status !== 'published') {
      return c.json({ success: false, error: 'Post not found' }, 404);
    }

    return c.json({ success: true, post });

  } catch (error) {
    console.error('Error fetching post:', error);
    return c.json({ success: false, error: 'Failed to fetch post' }, 500);
  }
});

/**
 * GET /posts/:id
 * Get a single post by ID (requires auth)
 */
posts.get("/:id", async (c) => {
  try {
    const user = await verifyAuth(c);
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const post = await kv.get(`post:${id}`);

    if (!post) {
      return c.json({ success: false, error: 'Post not found' }, 404);
    }

    return c.json({ success: true, post });

  } catch (error) {
    console.error('Error fetching post:', error);
    return c.json({ success: false, error: 'Failed to fetch post' }, 500);
  }
});

/**
 * POST /posts
 * Create a new post (requires auth)
 */
posts.post("/", async (c) => {
  try {
    const user = await verifyAuth(c);
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const postData = await c.req.json();

    // Validate required fields
    if (!postData.title || !postData.slug) {
      return c.json({ success: false, error: 'Title and slug are required' }, 400);
    }

    // Check if slug already exists
    const allPosts = await kv.getByPrefix('post:');
    const slugExists = allPosts.some((p: any) => p.slug === postData.slug);
    if (slugExists) {
      return c.json({ success: false, error: 'A post with this slug already exists' }, 400);
    }

    // Generate ID
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const post = {
      id,
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt || '',
      content: postData.content || '',
      featuredImage: postData.featuredImage || '',
      status: postData.status || 'draft',
      metaTitle: postData.metaTitle || postData.title,
      metaDescription: postData.metaDescription || postData.excerpt || '',
      author: user.name,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`post:${id}`, post);

    return c.json({ success: true, post });

  } catch (error) {
    console.error('Error creating post:', error);
    return c.json({ success: false, error: 'Failed to create post' }, 500);
  }
});

/**
 * PUT /posts/:id
 * Update an existing post (requires auth)
 */
posts.put("/:id", async (c) => {
  try {
    const user = await verifyAuth(c);
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const existingPost = await kv.get(`post:${id}`);

    if (!existingPost) {
      return c.json({ success: false, error: 'Post not found' }, 404);
    }

    const updateData = await c.req.json();

    // If slug is being changed, check it doesn't conflict
    if (updateData.slug && updateData.slug !== existingPost.slug) {
      const allPosts = await kv.getByPrefix('post:');
      const slugExists = allPosts.some((p: any) => p.slug === updateData.slug && p.id !== id);
      if (slugExists) {
        return c.json({ success: false, error: 'A post with this slug already exists' }, 400);
      }
    }

    const updatedPost = {
      ...existingPost,
      ...updateData,
      id, // Don't allow ID change
      authorId: existingPost.authorId, // Don't allow author change
      createdAt: existingPost.createdAt, // Don't allow creation date change
      updatedAt: new Date().toISOString()
    };

    await kv.set(`post:${id}`, updatedPost);

    return c.json({ success: true, post: updatedPost });

  } catch (error) {
    console.error('Error updating post:', error);
    return c.json({ success: false, error: 'Failed to update post' }, 500);
  }
});

/**
 * DELETE /posts/:id
 * Delete a post (requires auth)
 */
posts.delete("/:id", async (c) => {
  try {
    const user = await verifyAuth(c);
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const existingPost = await kv.get(`post:${id}`);

    if (!existingPost) {
      return c.json({ success: false, error: 'Post not found' }, 404);
    }

    // Only admins or the author can delete
    if (user.role !== 'admin' && user.id !== existingPost.authorId) {
      return c.json({ success: false, error: 'Unauthorized to delete this post' }, 403);
    }

    await kv.del(`post:${id}`);

    return c.json({ success: true, message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Error deleting post:', error);
    return c.json({ success: false, error: 'Failed to delete post' }, 500);
  }
});

export default posts;
