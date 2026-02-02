import { Heart, Award, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutMortgageGenius() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#003366]/10 text-[#003366] px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-semibold">Meet Your Mortgage Expert</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            About Mortgage Genius
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in navigating the home financing journey
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Column */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#003366] rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629507208649-70919ca33793?w=800&h=800&fit=crop&auto=format&q=80"
                  alt="Michael - Mortgage Genius"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#003366] to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold">Michael</h3>
                  <p className="text-white/90">Founder & Lead Loan Officer</p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Since beginning his journey in the mortgage industry in 2001, Michael has dedicated his career to helping families achieve their homeownership dreams. His passion for creating lasting relationships and delivering exceptional service has made Mortgage Genius a trusted name in home financing.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Michael believes that every client deserves personalized attention and honest guidance. His commitment goes beyond just closing loans – it's about understanding your unique situation, educating you on your options, and empowering you to make confident financial decisions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  "I love what I do because I get to be part of one of the most exciting moments in people's lives. Whether it's a first-time homebuyer getting their keys or a family refinancing to achieve their goals, being trusted with that responsibility is something I take seriously and appreciate deeply."
                </p>
              </div>

              {/* Key Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white rounded-lg p-4 border-2 border-[#003366]/10 hover:border-[#10b981]/30 transition-colors">
                  <Heart className="w-8 h-8 text-[#003366] mb-2" />
                  <div className="font-semibold text-sm text-foreground">Client-Focused</div>
                  <div className="text-xs text-muted-foreground mt-1">Your success is my priority</div>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-[#003366]/10 hover:border-[#10b981]/30 transition-colors">
                  <Award className="w-8 h-8 text-[#003366] mb-2" />
                  <div className="font-semibold text-sm text-foreground">Expert Guidance</div>
                  <div className="text-xs text-muted-foreground mt-1">Knowledge you can trust</div>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-[#003366]/10 hover:border-[#10b981]/30 transition-colors">
                  <Users className="w-8 h-8 text-[#003366] mb-2" />
                  <div className="font-semibold text-sm text-foreground">Personal Touch</div>
                  <div className="text-xs text-muted-foreground mt-1">Relationships that last</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
