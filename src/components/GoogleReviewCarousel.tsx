import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function GoogleReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format&q=75",
      initials: "SJ",
      rating: 5,
      date: "2 weeks ago",
      text: "Working with Mortgage Genius was the best decision we made! Michael and his team guided us through every step of our first home purchase. They were incredibly patient with all our questions and got us an amazing rate. The whole process was smooth and stress-free. Couldn't be happier with our new home!",
      loanType: "FHA Loan",
      verified: true
    },
    {
      name: "Robert Martinez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format&q=75",
      initials: "RM",
      rating: 5,
      date: "1 month ago",
      text: "As a veteran, I appreciated how knowledgeable they were about VA loans. The team made the entire process incredibly easy and explained everything in terms I could understand. They saved me thousands compared to what other lenders quoted. Highly recommend to all my military friends!",
      loanType: "VA Loan",
      verified: true
    },
    {
      name: "Jennifer Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format&q=75",
      initials: "JC",
      rating: 5,
      date: "3 weeks ago",
      text: "The team made refinancing so easy! They explained all my options clarity and helped me choose the best one for my situation. My monthly payment dropped by $400! The communication was excellent throughout, and they responded to my emails within hours. Thank you for the incredible service!",
      loanType: "Refinance",
      verified: true
    },
    {
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format&q=75",
      initials: "DT",
      rating: 5,
      date: "1 week ago",
      text: "Outstanding service from start to finish! We were pre-approved within 24 hours and closed on our dream home in just 3 weeks. The team was always available to answer questions and made what could have been a stressful process completely seamless. Will definitely use them again!",
      loanType: "Conventional",
      verified: true
    },
    {
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format&q=75",
      initials: "MG",
      rating: 5,
      date: "2 months ago",
      text: "I cannot say enough good things about this company! As a first-time homebuyer, I was nervous about the whole process, but they made everything so simple. They took the time to educate me on every step and found me the perfect loan program. Thank you for helping me achieve my dream!",
      loanType: "FHA Loan",
      verified: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((current) => (current + 1) % reviews.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Review Card */}
      <Card className="p-8 bg-white shadow-xl">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="w-14 h-14">
            <AvatarImage 
              src={reviews[currentIndex].avatar} 
              alt={reviews[currentIndex].name}
              loading="lazy"
            />
            <AvatarFallback className="bg-primary text-white">
              {reviews[currentIndex].initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-lg">{reviews[currentIndex].name}</h4>
              {reviews[currentIndex].verified && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="flex gap-1">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{reviews[currentIndex].date}</span>
            </div>
            
            <div className="inline-block bg-[#10b981]/10 text-[#10b981] text-xs px-3 py-1 rounded-full font-semibold">
              {reviews[currentIndex].loanType}
            </div>
          </div>
        </div>

        <p className="text-foreground leading-relaxed mb-6">
          "{reviews[currentIndex].text}"
        </p>

        {/* Google Logo */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Posted on</span>
          <svg className="w-16 h-6" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.86 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
            <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
            <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
            <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
            <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
            <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
          </svg>
        </div>
      </Card>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white shadow-lg hover:bg-gray-100 rounded-full w-12 h-12"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white shadow-lg hover:bg-gray-100 rounded-full w-12 h-12"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Google Rating Summary */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-md">
          <div className="text-left">
            <div className="text-3xl font-bold">4.9</div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
            </div>
          </div>
          <div className="h-10 w-px bg-gray-300" />
          <div className="text-left">
            <div className="text-sm text-muted-foreground">Based on</div>
            <div className="font-semibold">250+ Google Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
}
