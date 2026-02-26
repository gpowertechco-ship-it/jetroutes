import { Button } from "@/components/ui/button";
import { AlertCircle, Plane, Clock } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";

const FlightStatus = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (flightNumber) {
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">Flight Status</h1>
            <p className="text-xl text-white/80">Check the status of any flight in real-time</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg border-2 border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Track Your Flight</h2>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Flight Number
                </label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  placeholder="e.g., AA123"
                  className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Departure Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3"
            >
              Check Status
            </Button>
          </form>

          {searched && (
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
              <div className="flex items-start gap-3 mb-6">
                <Plane className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground">{flightNumber}</h3>
                  <p className="text-muted-foreground">Scheduled Departure: 2:30 PM EST</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-2 border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">Status</span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                      On Time
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-border">
                    <p className="text-muted-foreground text-sm">Departure</p>
                    <p className="font-semibold text-foreground">John F. Kennedy Intl</p>
                    <p className="text-sm text-muted-foreground">Gate 24</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-border">
                    <p className="text-muted-foreground text-sm">Arrival</p>
                    <p className="font-semibold text-foreground">Los Angeles Intl</p>
                    <p className="text-sm text-muted-foreground">ETA: 5:45 PM PST</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Flight Duration</span>
                  </div>
                  <p className="text-muted-foreground">5 hours 15 minutes (Nonstop)</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex gap-3 mt-8">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 font-semibold text-sm">Real-time Updates</p>
              <p className="text-blue-800 text-sm mt-1">
                Check back frequently for the latest status updates
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlightStatus;
