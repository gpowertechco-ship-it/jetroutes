import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Palmtree, Users, Wallet } from "lucide-react";
import Footer from "@/components/Footer";

const Vacations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">Vacation Packages</h1>
            <p className="text-xl text-white/80">
              Everything you need for your perfect getaway
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
        {/* Coming Soon */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-12 border-2 border-primary/20 mb-12">
          <div className="text-center">
            <Palmtree className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Vacation Packages Coming Soon
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              We're putting together amazing vacation packages that include flights, hotels,
              activities, and more. Check back soon for exclusive deals on your dream destination!
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-3">
                Book a Flight in the Meantime
              </Button>
            </Link>
          </div>
        </div>

        {/* What to Expect */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">All-Inclusive Deals</h3>
            <p className="text-muted-foreground text-sm">
              Flights and hotels bundled at discounted rates
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Group Packages</h3>
            <p className="text-muted-foreground text-sm">
              Special rates for families and large groups
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
            <Wallet className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Flexible Payments</h3>
            <p className="text-muted-foreground text-sm">
              Installment plans for your vacation
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
            <Palmtree className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Curated Experiences</h3>
            <p className="text-muted-foreground text-sm">
              Activities and tours at popular destinations
            </p>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vacations;
