import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import { Footer } from './Footer';
import ReactMarkdown from 'react-markdown';
import client from '../../tina/__generated__/client';

interface TinaPageProps {
  collection: string;
  slug: string;
}

interface PageData {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    headline?: string;
    subheadline?: string;
  };
  body?: any;
  lastUpdated?: string;
  state?: string;
  stateAbbr?: string;
}

export function TinaPage({ collection, slug }: TinaPageProps) {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPage();
  }, [collection, slug]);

  const loadPage = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const relativePath = `${slug}.mdx`;
      
      let result;
      if (collection === 'statePage') {
        result = await client.queries.statePage({ relativePath });
      } else if (collection === 'legalPage') {
        result = await client.queries.legalPage({ relativePath });
      } else if (collection === 'loanPage') {
        result = await client.queries.loanPage({ relativePath });
      } else {
        throw new Error(`Unknown collection: ${collection}`);
      }

      if (result.data) {
        const data = result.data[collection] as any;
        setPageData({
          title: data.title || '',
          metaTitle: data.metaTitle || data.title,
          metaDescription: data.metaDescription || '',
          hero: data.hero || undefined,
          lastUpdated: data.lastUpdated || undefined,
          state: data.state || undefined,
          stateAbbr: data.stateAbbr || undefined,
          body: data.body || data._body,
        });
      } else {
        throw new Error('No data returned');
      }
    } catch (err) {
      console.error('Error loading page:', err);
      setError('Failed to load page content');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'This page does not exist'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderBody = (body: any) => {
    if (typeof body === 'string') {
      return <ReactMarkdown>{body}</ReactMarkdown>;
    }
    
    if (body?.children) {
      return body.children.map((child: any, index: number) => {
        if (child.type === 'h2') {
          return <h2 key={index}>{child.children?.[0]?.text || ''}</h2>;
        }
        if (child.type === 'h3') {
          return <h3 key={index}>{child.children?.[0]?.text || ''}</h3>;
        }
        if (child.type === 'p') {
          return <p key={index}>{child.children?.[0]?.text || ''}</p>;
        }
        if (child.type === 'ul') {
          return (
            <ul key={index}>
              {child.children?.map((li: any, liIndex: number) => (
                <li key={liIndex}>{li.children?.[0]?.text || ''}</li>
              ))}
            </ul>
          );
        }
        return null;
      });
    }
    
    return null;
  };

  return (
    <>
      <Helmet>
        <title>{pageData.metaTitle || pageData.title}</title>
        <meta name="description" content={pageData.metaDescription || ''} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        {pageData.hero?.headline && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#1e40af] to-[#6366f1]">
              <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
              <div className="absolute top-0 -right-20 w-96 h-96 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            </div>

            <div className="relative container mx-auto px-4 py-16 max-w-5xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                {pageData.hero.headline}
              </h1>
              {pageData.hero.subheadline && (
                <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up animation-delay-200">
                  {pageData.hero.subheadline}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Simple Header for Legal Pages */}
        {!pageData.hero?.headline && (
          <div className="bg-gradient-to-r from-[#003366] to-[#1e40af] text-white py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">{pageData.title}</h1>
              {pageData.lastUpdated && (
                <p className="text-white/80">Last Updated: {pageData.lastUpdated}</p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#003366] prose-a:text-[#10b981] prose-a:no-underline hover:prose-a:underline">
            {renderBody(pageData.body)}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
