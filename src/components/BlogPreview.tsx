import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BlogPreview() {
  const posts = [
    {
      title: "5 Tips for First-Time Homebuyers in 2024",
      excerpt: "Navigating the housing market can be overwhelming. Here are essential tips to help you make informed decisions...",
      category: "First-Time Buyers",
      date: "Jan 8, 2025",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format&q=75"
    },
    {
      title: "Understanding Mortgage Rates: What Affects Your Rate",
      excerpt: "Mortgage rates fluctuate daily. Learn how credit scores, loan types, and market conditions impact your rate...",
      category: "Market Insights",
      date: "Jan 5, 2025",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&auto=format&q=75"
    },
    {
      title: "VA Loans Explained: Benefits and Eligibility",
      excerpt: "Military service comes with incredible homeownership benefits. Discover how VA loans can help veterans...",
      category: "VA Loans",
      date: "Jan 2, 2025",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=600&h=400&fit=crop&auto=format&q=75"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Latest Mortgage News & Tips
          </h2>
          <p className="text-muted-foreground">
            Stay informed with expert insights and market updates
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {posts.map((post, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Featured Image */}
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white text-foreground text-xs">{post.category}</Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <button className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2">
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}