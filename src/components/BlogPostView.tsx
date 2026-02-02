/**
 * ============================================================================
 * BLOG POST VIEW TEMPLATE - TIER 3
 * ============================================================================
 * Beautiful template for displaying individual blog posts
 * Professional design matching the main website aesthetic
 * ============================================================================
 */

import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Header } from './Header';
import { Footer } from './Footer';
import { Badge } from './ui/badge';
import { projectId } from '../utils/supabase/info';

interface BlogPostViewProps {
  slug: string;
  onBack?: () => void;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export function BlogPostView({ slug, onBack }: BlogPostViewProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e8e0d145/api/posts/by-slug/${slug}`);
      const result = await response.json();
      if (result.success && result.post) {
        setPost(result.post);
        
        // Update page title and meta
        if (result.post.metaTitle) {
          document.title = result.post.metaTitle;
        }
      } else {
        setError('Article not found');
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setError('Failed to load article');
    } finally {
      setIsLoading(false);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'This article does not exist'}</p>
            <Button onClick={() => window.location.href = '/'} className="bg-[#10b981] hover:bg-[#059669]">
              Return Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Article Hero */}
      <div className="relative bg-gradient-to-br from-[#003366] to-[#002244] text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </button>
          )}
          
          <Badge className="mb-4 bg-[#10b981]">Resource Article</Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container mx-auto px-4 max-w-4xl -mt-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-4xl py-16">
        <div className="prose prose-lg max-w-none">
          <div 
            className="article-content leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Share this article</h3>
            <div className="flex gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-[#003366] to-[#002244] rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Let our experienced team help you navigate your mortgage journey with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/contact'}
              className="bg-[#10b981] hover:bg-[#059669] text-white"
            >
              Get in Touch
            </Button>
            <Button
              onClick={() => window.location.href = '/#calculator'}
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white/20"
            >
              Calculate Your Payment
            </Button>
          </div>
        </div>
      </article>

      <Footer />
      
      <style>{`
        .article-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #1a1a1a;
        }
        
        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #003366;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #003366;
        }
        
        .article-content p {
          margin-bottom: 1.5rem;
        }
        
        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
        }
        
        .article-content a {
          color: #10b981;
          text-decoration: underline;
        }
        
        .article-content a:hover {
          color: #059669;
        }
        
        .article-content strong {
          font-weight: 600;
          color: #003366;
        }
        
        .article-content blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}
