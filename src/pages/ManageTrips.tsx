import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, MapPin, Calendar, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";

const ManageTrips = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">Manage Your Trips</h1>
            <p className="text-xl text-white/80">View, modify, or cancel your bookings</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg border-2 border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Find Your Booking</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Booking Reference
              </label>
              <input
                type="text"
                placeholder="e.g., ABC123"
                maxLength={6}
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Last Name or Email
              </label>
              <input
                type="text"
                placeholder="Your last name or email"
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3">
              Find My Booking
            </Button>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex gap-3 mt-8">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 font-semibold text-sm">
                Need to check in or make changes?
              </p>
              <p className="text-blue-800 text-sm mt-1">
                Use your booking reference from your confirmation email to manage your trip.
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Link to="/check-in">
            <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full">
              <Plane className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Check In</h3>
              <p className="text-muted-foreground text-sm">
                Check in up to 24 hours before your flight
              </p>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 cursor-not-allowed opacity-50">
            <MapPin className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Modify Booking</h3>
            <p className="text-muted-foreground text-sm">
              Change your flight dates or passengers
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6 cursor-not-allowed opacity-50">
            <Calendar className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Cancel Booking</h3>
            <p className="text-muted-foreground text-sm">
              Cancel your flight and view refund options
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/20 mt-12">
          <h3 className="font-bold text-lg text-foreground mb-4">What Can You Do?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Check in online up to 24 hours before departure
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              View your flight details and itinerary
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Select or change your seat
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Add baggage or special services
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Contact support with questions
            </li>
          </ul>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageTrips;
