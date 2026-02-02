import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './ui/button';

export function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#003366] via-[#2563eb] to-[#003366] text-white relative overflow-hidden">
      {/* Animated Circles */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#10b981]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#f59e0b]/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Heading */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
              <br />
              We're Here to Help!
            </h2>
            <p className="text-lg text-white/90">
              Take the first step towards homeownership today
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#10b981] hover:bg-[#059669] text-white px-8 group animate-pulse-subtle"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 group"
            >
              <Phone className="mr-2 w-5 h-5" />
              Schedule Consultation
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-white/80">24hr Pre-Approval</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-white/80">No Hidden Fees</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-white/80">Expert Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}