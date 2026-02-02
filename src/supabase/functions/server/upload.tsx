/**
 * ============================================================================
 * IMAGE UPLOAD API - TIER 3
 * ============================================================================
 * Handle image uploads to Supabase Storage
 * Returns signed URL for uploaded images
 * ============================================================================
 */

import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";

const upload = new Hono();

const BUCKET_NAME = 'make-e8e0d145-blog-images';

const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

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

  return user;
};

/**
 * POST /upload-image
 * Upload an image file to Supabase Storage
 */
upload.post("/", async (c) => {
  try {
    const user = await verifyAuth(c);
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ success: false, error: 'File must be an image' }, 400);
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ success: false, error: 'File must be less than 5MB' }, 400);
    }

    const supabase = getSupabaseAdmin();

    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false, // Private bucket, we'll use signed URLs
        fileSizeLimit: 5 * 1024 * 1024 // 5MB
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        return c.json({ success: false, error: 'Failed to initialize storage' }, 500);
      }
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const ext = file.name.split('.').pop();
    const filename = `${timestamp}-${randomStr}.${ext}`;
    const filepath = `blog-images/${filename}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filepath, uint8Array, {
        contentType: file.type,
        cacheControl: '31536000', // 1 year
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ success: false, error: 'Failed to upload file' }, 500);
    }

    // Generate signed URL (valid for 10 years for blog images)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filepath, 315360000); // 10 years in seconds

    if (signedUrlError || !signedUrlData) {
      console.error('Signed URL error:', signedUrlError);
      return c.json({ success: false, error: 'Failed to generate image URL' }, 500);
    }

    return c.json({
      success: true,
      url: signedUrlData.signedUrl,
      filename: filename,
      path: filepath
    });

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ success: false, error: 'Upload failed' }, 500);
  }
});

export default upload;
