import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, ArrowRight, Clock, Heart, MapPin, Users, Wifi, Zap, Flame, TrendingDown, ArrowRightLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { airlines, airports } from "@/lib/airlines";
import type { Airline } from "@/lib/airlines";

interface Flight {
  id: string;
  airlineData: Airline;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  transit?: string[];
  price: number;
  seats: number;
  isBestPrice?: boolean;
  isPopular?: boolean;
  returnDepartTime?: string;
  returnArriveTime?: string;
  returnDuration?: string;
  returnStops?: number;
  baggage?: { checkedBags: number; carryOn: number; weight: string };
  from?: string;
  to?: string;
  departDate?: string;
}

const SavedFlights = () => {
  const navigate = useNavigate();
  const [savedFlights, setSavedFlights] = useState<Flight[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to load wishlist:", e);
      }
    }
  }, []);

  // Note: In a real app, you'd fetch full flight details from a database
  // For now, we show a message that the feature is available after searching
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-nav via-nav to-nav/80 text-white py-12 px-4 border-b border-nav/20 shadow-lg">
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <Heart className="h-8 w-8 fill-accent text-accent" />
              Saved Flights
            </h1>
            <p className="text-white/80">
              {wishlist.length > 0
                ? `You have ${wishlist.length} saved flight${wishlist.length !== 1 ? "s" : ""}`
                : "Start saving flights to compare and book later"}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-7xl">
          {wishlist.length > 0 ? (
            <div className="space-y-4">
              <Card className="p-6 bg-white/60 backdrop-blur-md border-2 border-accent/20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-foreground mb-4">How to View Your Saved Flights</h2>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-accent min-w-fit">1.</span>
                    <span>Go to Flight Search and select your departure and arrival airports</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent min-w-fit">2.</span>
                    <span>Search for flights to generate the results</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent min-w-fit">3.</span>
                    <span>Your saved flights will appear with a filled heart icon</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent min-w-fit">4.</span>
                    <span>Click the Select button to proceed with booking</span>
                  </li>
                </ol>
              </Card>

              <div className="text-center py-12">
                <Plane className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Saved Flight Details Not Available</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Detailed saved flight information is shown when you search for flights with the same route. Your {wishlist.length} saved flight{wishlist.length !== 1 ? "s" : ""} are stored and will be highlighted when available.
                </p>
                <Button
                  className="bg-gradient-to-r from-nav to-primary hover:from-nav/90 hover:to-primary/90 text-white font-semibold"
                  onClick={() => navigate("/", { replace: true })}
                >
                  Search Flights
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Saved Flights Yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {isLoggedIn
                  ? "When searching for flights, click the heart icon to save flights for later. They'll appear here for quick access."
                  : "Log in to save flights and access them from any device."}
              </p>
              <Button
                className="bg-gradient-to-r from-nav to-primary hover:from-nav/90 hover:to-primary/90 text-white font-semibold"
                onClick={() => navigate("/", { replace: true })}
              >
                Start Searching
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SavedFlights;
