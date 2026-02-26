import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Tag, TrendingUp, Calendar } from "lucide-react";
import Footer from "@/components/Footer";

const Offers = () => {
  const offers = [
    {
      title: "Summer Flash Sale",
      description: "Save up to 40% on flights to popular summer destinations",
      discount: "40% OFF",
      valid: "Until June 30",
      icon: Zap,
    },
    {
      title: "Family Package Deal",
      description: "Buy 2 flights, get 3rd family member 50% off",
      discount: "50% OFF",
      valid: "Until December 31",
      icon: Tag,
    },
    {
      title: "Business Traveler Promo",
      description: "Earn 3x miles on all business class bookings",
      discount: "3X MILES",
      valid: "Ongoing",
      icon: TrendingUp,
    },
    {
      title: "Early Booking Bonus",
      description: "Book 4+ weeks in advance and save 35%",
      discount: "35% OFF",
      valid: "Until next month",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">Special Offers</h1>
            <p className="text-xl text-white/80">Save on flights to your favorite destinations</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
        {/* Main CTA */}
        <div className="bg-gradient-to-r from-primary via-primary/95 to-accent text-white rounded-xl p-12 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to book?</h2>
          <p className="text-white/90 mb-6 text-lg">
            Use these exclusive offers to save on your next flight
          </p>
          <Link to="/">
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg">
              Search Flights Now
            </Button>
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-lg border-2 border-border overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{offer.title}</h3>
                    <p className="text-muted-foreground mb-4">{offer.description}</p>
                    <p className="text-xs text-muted-foreground">Valid: {offer.valid}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Icon className="h-10 w-10 text-accent" />
                  </div>
                </div>

                <div className="p-6 flex items-center justify-between">
                  <div className="text-3xl font-bold text-primary">{offer.discount}</div>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                    Claim Offer
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terms */}
        <div className="bg-white rounded-lg border-2 border-border p-6">
          <h3 className="font-bold text-lg text-foreground mb-4">Terms & Conditions</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Offers are valid for new bookings only</li>
            <li>• Cannot be combined with other promotions</li>
            <li>• Discounts apply to base fare only</li>
            <li>• Blackout dates may apply</li>
            <li>• Cancellation and change policies apply</li>
            <li>• See detailed terms at checkout</li>
          </ul>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offers;
