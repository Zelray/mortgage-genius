import { DollarSign, Users, Star, Clock } from 'lucide-react';

export function TrustIndicators() {
  const indicators = [
    {
      icon: DollarSign,
      value: "$500M+",
      label: "Funded",
    },
    {
      icon: Users,
      value: "2,000+",
      label: "Happy Homeowners",
    },
    {
      icon: Star,
      value: "5.0★",
      label: "Average Rating",
    },
    {
      icon: Clock,
      value: "48 Hour",
      label: "Approval",
    }
  ];

  return (
    <section className="py-8 bg-[#1e3a5f] border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {indicators.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-2"
            >
              <item.icon className="w-10 h-10 text-[#10b981]" />
              <div className="text-2xl md:text-3xl font-bold text-white">{item.value}</div>
              <div className="text-sm text-white/70">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}