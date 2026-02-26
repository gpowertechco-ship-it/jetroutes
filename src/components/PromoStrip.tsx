import { Gift, CreditCard, Star } from "lucide-react";

const promos = [
  {
    icon: Gift,
    title: "Rewards members earn more",
    desc: "Earn points on every flight and redeem for free trips.",
  },
  {
    icon: CreditCard,
    title: "Flexible booking",
    desc: "Change or cancel your plans with no fees on select fares.",
  },
  {
    icon: Star,
    title: "Best price guarantee",
    desc: "Find a lower fare? We'll match it and give you bonus points.",
  },
];

const PromoStrip = () => {
  return (
    <section className="bg-gradient-to-r from-secondary/80 to-secondary/40 backdrop-blur py-16 px-4 border-y border-border/20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {promos.map((promo) => (
          <div key={promo.title} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <promo.icon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{promo.title}</h3>
              <p className="text-muted-foreground text-sm">{promo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoStrip;
