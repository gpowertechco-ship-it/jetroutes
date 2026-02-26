import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plane, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";

const CheckIn = () => {
  const [bookingRef, setBookingRef] = useState("");
  const [lastNameOrEmail, setLastNameOrEmail] = useState("");
  const [checked, setChecked] = useState<boolean | null>(null);

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingRef && lastNameOrEmail) {
      // Simulate checking in
      setChecked(true);
    }
  };

  const handleReset = () => {
    setBookingRef("");
    setLastNameOrEmail("");
    setChecked(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <Plane className="h-12 w-12 mx-auto mb-4 text-white/80" />
            <h1 className="text-5xl font-bold mb-4">Online Check-In</h1>
            <p className="text-xl text-white/80">
              Check in for your flight up to 24 hours before departure
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg border-2 border-border p-8 md:p-12">
          {checked === null ? (
            // Check-in form
            <>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Begin Your Check-In
              </h2>

              <form onSubmit={handleCheckIn} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Booking Reference
                  </label>
                  <input
                    type="text"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                    placeholder="e.g., ABC123"
                    maxLength={6}
                    required
                    className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    6-character reference code from your booking confirmation
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Last Name or Email
                  </label>
                  <input
                    type="text"
                    value={lastNameOrEmail}
                    onChange={(e) => setLastNameOrEmail(e.target.value)}
                    placeholder="Your last name or email address"
                    required
                    className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                  />
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-900 font-semibold text-sm">
                      Check-in Opens 24 Hours Before Departure
                    </p>
                    <p className="text-blue-800 text-sm mt-1">
                      You can check in for your flight starting 24 hours before your scheduled departure time.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!bookingRef || !lastNameOrEmail}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-lg py-3 disabled:opacity-50"
                >
                  Check In Now
                </Button>
              </form>
            </>
          ) : checked === true ? (
            // Success state
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center h-20 w-20 bg-emerald-100 rounded-full">
                <CheckCircle className="h-12 w-12 text-emerald-600" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Check-In Successful!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Your booking reference: <strong>{bookingRef}</strong>
                </p>
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
                <h3 className="font-bold text-emerald-900 mb-3">Your Check-In Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-emerald-800">Boarding Group:</span>
                    <span className="font-semibold text-emerald-900">A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800">Seat Assignment:</span>
                    <span className="font-semibold text-emerald-900">12A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800">Status:</span>
                    <span className="font-semibold text-emerald-900">Checked In</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 flex gap-3">
                <Clock className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-yellow-900 font-semibold text-sm">
                    Remember to arrive at the airport on time
                  </p>
                  <p className="text-yellow-800 text-sm mt-1">
                    Please arrive at least 2 hours before your international flight.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-lg py-3"
              >
                Check In Another Flight
              </Button>
            </div>
          ) : null}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6">
            <h3 className="font-bold text-lg text-foreground mb-3">Benefits of Online Check-In</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>✓ Save time at the airport</li>
              <li>✓ Get your boarding pass instantly</li>
              <li>✓ Select your seat online</li>
              <li>✓ Skip the check-in counter</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md border-2 border-border p-6">
            <h3 className="font-bold text-lg text-foreground mb-3">Check-In Timeline</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 24 hours before departure: Check-in opens</li>
              <li>• 1 hour before departure: Check-in closes</li>
              <li>• Mobile boarding pass available</li>
              <li>• Gate closes 15 mins before departure</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckIn;
