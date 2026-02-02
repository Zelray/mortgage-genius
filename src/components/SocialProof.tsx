import { Star } from 'lucide-react';
import { GoogleReviewCarousel } from './GoogleReviewCarousel';

export function SocialProof() {
  return (
    <section className="py-12 bg-gradient-to-b from-muted to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 text-[#f59e0b] px-3 py-1 rounded-full mb-3 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold">Client Success Stories</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">
            Hear from families who've achieved their homeownership dreams
          </p>
        </div>

        <GoogleReviewCarousel />
      </div>
    </section>
  );
}