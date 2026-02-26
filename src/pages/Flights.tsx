import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, MapPin, Calendar, Users, Search } from "lucide-react";
import Footer from "@/components/Footer";

const Flights = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">Find & Book Flights</h1>
            <p className="text-xl text-white/80">
              Explore the world with JetRoutes - your trusted flight booking partner
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Destinations</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <p className="text-muted-foreground">Daily Flights</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Airlines</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 text-center">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <p className="text-muted-foreground">Support</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md border-2 border-border p-8">
              <Plane className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Best Prices</h3>
              <p className="text-muted-foreground mb-4">
                Compare and save on flights to your favorite destinations with our transparent pricing.
              </p>
              <Link to="/">
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                  Search Flights
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md border-2 border-border p-8">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Wide Network</h3>
              <p className="text-muted-foreground mb-4">
                Fly anywhere in the world with our extensive network of airlines and travel partners.
              </p>
              <Button disabled className="w-full opacity-50">
                Explore Destinations
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md border-2 border-border p-8">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Easy Changes</h3>
              <p className="text-muted-foreground mb-4">
                Modify or cancel your flights with ease using our flexible booking options.
              </p>
              <Link to="/manage-trips">
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                  Manage Trips
                </Button>
              </Link>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-12 border-2 border-primary/20">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Choose JetRoutes?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Transparent Pricing</h3>
                  <p className="text-muted-foreground">No hidden fees or surprises at checkout.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-white font-bold">
                    ✓
                  </div>
                </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">24/7 Customer Support</h3>
                <p className="text-muted-foreground">Our team is always here to help you.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-white font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Secure Booking</h3>
                <p className="text-muted-foreground">Your personal data is protected with encryption.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-white font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Flexible Options</h3>
                <p className="text-muted-foreground">Change or cancel your flights anytime.</p>
              </div>
            </div>
          </div>
        </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to book your flight?</h2>
            <Link to="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-6 text-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Flights Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Flights;
