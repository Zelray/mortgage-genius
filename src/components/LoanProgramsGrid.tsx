import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

export function LoanProgramsGrid() {
  const programs = [
    {
      title: "VA Loans",
      description: "Zero down payment options for our nation's heroes with competitive rates and no PMI requirements.",
      image: "https://images.unsplash.com/photo-1591110105952-bbbb956d7063?w=600&h=400&fit=crop&auto=format&q=75",
      alt: "Proud veteran homeowner smiling",
      badge: "0% Down",
      badgeColor: "bg-[#10b981]",
      link: "/az/buyers/va-loan-purchase"
    },
    {
      title: "FHA Loans",
      description: "First-time homebuyers rejoice! As little as 3.5% down with flexible credit requirements.",
      image: "https://images.unsplash.com/photo-1593884165215-43fdc8b9ad47?w=600&h=400&fit=crop&auto=format&q=75",
      alt: "Excited first-time homebuyer",
      badge: "3.5% Down",
      badgeColor: "bg-[#2563eb]",
      link: "/az/buyers/fha-loan"
    },
    {
      title: "Conventional",
      description: "Traditional financing with competitive rates, flexible terms, and the most options available.",
      image: "https://images.unsplash.com/photo-1758523671637-5a39ea2c129b?w=600&h=400&fit=crop&auto=format&q=75",
      alt: "Family moving into new home",
      badge: "Popular",
      badgeColor: "bg-[#f59e0b]",
      link: "/az/buyers/conventional-mortgage"
    },
    {
      title: "Jumbo Loans",
      description: "Financing for luxury properties that exceed conventional loan limits with premium service.",
      image: "https://images.unsplash.com/photo-1685514823717-7e1ff6ee0563?w=600&h=400&fit=crop&auto=format&q=75",
      alt: "Beautiful luxury home exterior",
      badge: "Premium",
      badgeColor: "bg-[#8b5cf6]",
      link: "/az/buyers/jumbo-loan"
    },
    {
      title: "USDA Loans",
      description: "100% financing for eligible rural properties with no down payment required for qualified buyers.",
      image: "https://images.unsplash.com/photo-1758244016374-6c174ad28487?w=600&h=400&fit=crop&auto=format&q=75",
      alt: "Scenic rural property landscape",
      badge: "0% Down",
      badgeColor: "bg-[#10b981]",
      link: "/az/buyers/usda-loan"
    },
    {
      title: "Refinancing",
      description: "Lower your monthly payments, access equity, or switch to better terms with our refinance options.",
      image: "https://images.unsplash.com/photo-1746557416662-0623ff3f4c73?w=600&h=400&fit=crop&auto=format&q=75",
      alt: "Couple reviewing refinance documents",
      badge: "Save Money",
      badgeColor: "bg-[#10b981]",
      link: "/refinance"
    },
    {
      title: "HELOC",
      description: "Access your home equity with a flexible credit line. Use funds for renovations, debt consolidation, or emergencies.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format&q=75",
      alt: "Modern home renovation project",
      badge: "Flexible",
      badgeColor: "bg-[#6366f1]",
      link: "/heloc"
    }
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Find Your Perfect Loan
          </h2>
          <p className="text-muted-foreground">
            Whether you're buying your first home or refinancing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <Link
              key={program.title}
              to={program.link || "#"}
              className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer block"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <ImageWithFallback
                  src={program.image}
                  alt={program.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`${program.badgeColor} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                    {program.badge}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-foreground">{program.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
                
                {/* Learn More Link */}
                <button className="flex items-center gap-2 text-sm text-primary font-semibold group-hover:text-[#10b981] transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-lg transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View All Loan Programs
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}