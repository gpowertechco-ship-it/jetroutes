import { Button } from "@/components/ui/button";
import { Gift, Zap, Star, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";

const Rewards = () => {
  const rewards = [
    {
      title: "Earn Points",
      description: "Earn 1 mile for every dollar spent on flights",
      icon: Star,
    },
    {
      title: "Redeem Awards",
      description: "Use your miles to book free or discounted flights",
      icon: Gift,
    },
    {
      title: "Exclusive Perks",
      description: "Early seat selection, priority boarding, and more",
      icon: Zap,
    },
    {
      title: "Status Tiers",
      description: "Reach higher tiers and unlock premium benefits",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">JetRoutes Rewards</h1>
            <p className="text-xl text-white/80">Earn points on every flight and redeem amazing rewards</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg border-2 border-border p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Start Earning Today</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Join JetRoutes Rewards and start accumulating miles with every flight. Earn points that can be
              redeemed for free tickets, seat upgrades, and exclusive perks.
            </p>
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3">
              Join Program
            </Button>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/20">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Sign up</h3>
                  <p className="text-muted-foreground text-sm">Create your free account</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Book & Fly</h3>
                  <p className="text-muted-foreground text-sm">Earn miles on every flight</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Redeem</h3>
                  <p className="text-muted-foreground text-sm">Use miles for flights and upgrades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {rewards.map((reward, idx) => {
            const Icon = reward.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-md border-2 border-border p-6">
                <Icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold text-lg text-foreground mb-2">{reward.title}</h3>
                <p className="text-muted-foreground text-sm">{reward.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tier System */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-border p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Status Tiers</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Silver", miles: "0-25,000", benefits: ["Bonus miles", "Priority boarding"] },
              { name: "Gold", miles: "25,000-75,000", benefits: ["All Silver benefits", "Free seat selection", "Lounge access"] },
              { name: "Platinum", miles: "75,000+", benefits: ["All Gold benefits", "Free upgrades", "Concierge service"] },
            ].map((tier, idx) => (
              <div key={idx} className={`rounded-lg p-6 border-2 ${idx === 1 ? "border-accent bg-accent/5" : "border-border bg-white"}`}>
                <h3 className={`text-2xl font-bold mb-2 ${idx === 1 ? "text-accent" : "text-primary"}`}>
                  {tier.name}
                </h3>
                <p className="text-muted-foreground mb-4">{tier.miles} miles</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span className="text-primary font-bold">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rewards;
