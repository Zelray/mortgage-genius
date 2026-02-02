import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export function StateSelection() {
  const states = [
    {
      name: "Florida",
      tagline: "Sunshine State Living",
      highlights: ["No State Income Tax", "Year-Round Sunshine", "Strong Market"],
      active: true,
      gradient: "from-orange-500 to-yellow-500",
      link: "/fl-mortgage-broker"
    },
    {
      name: "Arizona",
      tagline: "Desert Paradise",
      highlights: ["Affordable Living", "Growing Economy", "Outdoor Lifestyle"],
      active: true,
      gradient: "from-red-500 to-orange-500",
      link: "/az-mortgage-broker"
    },
    {
      name: "Texas",
      tagline: "Lone Star Opportunity",
      highlights: ["No State Income Tax", "Booming Cities", "Low Cost of Living"],
      active: true,
      gradient: "from-blue-600 to-red-600",
      link: "/tx-mortgage-broker"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-muted relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Choose Your State to Get Started
          </h2>
          <p className="text-muted-foreground">
            Licensed and ready to help in Florida, Arizona & Texas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {states.map((state) => (
            <Link
              key={state.name}
              to={state.link}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer block"
            >
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-br ${state.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-white opacity-50" />
                </div>
                {/* Spotlight Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{state.name}</h3>
                  <p className="text-xs text-muted-foreground">{state.tagline}</p>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {state.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 rounded-full bg-[#10b981]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 group-hover:bg-[#10b981] transition-colors duration-300 text-sm">
                  Explore {state.name}
                  <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Active Badge */}
              {state.active && (
                <div className="absolute top-3 right-3">
                  <div className="bg-[#10b981] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    Active
                  </div>
                </div>
              )}

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#10b981] rounded-xl transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}