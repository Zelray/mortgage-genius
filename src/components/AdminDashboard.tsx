/**
 * ============================================================================
 * ADMIN DASHBOARD - TIER 3
 * ============================================================================
 * Main admin interface for managing content
 * Features: Blog posts, SEO settings, user management
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { 
  FileText, Users, Settings, LogOut, Plus, Edit, Trash2, Eye,
  Search, Filter, LayoutDashboard, Image as ImageIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { projectId } from '../utils/supabase/info';
import logo from 'figma:asset/e6340308c6134549e4377a10a79640b817e82f3d.png';

interface AdminDashboardProps {
  accessToken: string;
  userRole: string;
  onLogout: () => void;
  onEditPost: (postId: string | null) => void;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'published' | 'draft';
  createdAt: string;
  author: string;
}

export function AdminDashboard({ accessToken, userRole, onLogout, onEditPost }: AdminDashboardProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e8e0d145/api/posts`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const result = await response.json();
      if (result.success) {
        setPosts(result.posts || []);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e8e0d145/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Post deleted successfully');
        loadPosts();
      } else {
        toast.error(result.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Mortgage Genius" className="h-12 w-auto" />
              <div className="border-l pl-4">
                <h1 className="font-bold text-xl text-[#003366]">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                {userRole === 'admin' ? 'Administrator' : 'Editor'}
              </Badge>
              <Button
                variant="outline"
                onClick={onLogout}
                className="text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-white p-1 border">
            <TabsTrigger value="posts" className="gap-2">
              <FileText className="w-4 h-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Settings className="w-4 h-4" />
              SEO Settings
            </TabsTrigger>
            {userRole === 'admin' && (
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
            )}
          </TabsList>

          {/* POSTS TAB */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#003366]">Resource Articles</h2>
                <p className="text-muted-foreground">Create and manage educational content</p>
              </div>
              <Button
                onClick={() => onEditPost(null)}
                className="bg-[#10b981] hover:bg-[#059669]"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Posts List */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No articles found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery ? 'Try a different search term' : 'Get started by creating your first article'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => onEditPost(null)} className="bg-[#10b981] hover:bg-[#059669]">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Article
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>/resources/{post.slug}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/resources/${post.slug}`, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditPost(post.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* SEO TAB */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Manage meta tags and search engine optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">SEO editor coming in next update...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USERS TAB */}
          {userRole === 'admin' && (
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Add and manage admin users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management coming in next update...</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
