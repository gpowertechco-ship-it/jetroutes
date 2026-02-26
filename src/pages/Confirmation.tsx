import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, Home, Clock, MapPin, Users, Printer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sendConfirmationEmail } from "@/lib/email-service";
import { downloadTicketHTML, printTicket } from "@/lib/ticket-generator";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { flight, searchParams, totalPrice, passengerInfo, selectedMethod, selectedSeats, seatUpgradeCost, selectedBaggage, baggageCost, selectedAddons, addonsCost, selectedWallet } = (location.state as any) || {};

  // Generate booking reference and date
  const bookingReference = `JR${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const bookingDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Send confirmation email when page loads
  useEffect(() => {
    if (flight && passengerInfo && totalPrice) {
      sendConfirmationEmail({
        bookingReference,
        bookingDate,
        passengerInfo,
        flight,
        searchParams,
        totalPrice,
        selectedSeats,
        seatUpgradeCost,
        selectedBaggage,
        baggageCost,
        selectedAddons,
        addonsCost,
        selectedMethod,
        selectedWallet,
      });
    }
  }, []); // Empty dependency to run only once on mount

  if (!flight) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Booking information not available.</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const paymentMethodLabels: Record<string, string> = {
    card: "Credit/Debit Card",
    wallet: "Digital Wallet",
    bank: "Bank Transfer",
  };

  // Helper function to format departure time in 12-hour format with AM/PM
  const formatDepartureTime = (timeString: string) => {
    if (timeString.includes(" AM") || timeString.includes(" PM")) {
      return timeString;
    }
    const [time] = timeString.split(" ");
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, "0")}:${minuteStr} ${ampm}`;
  };

  // Helper function to format duration (remove seconds if present)
  const formatDuration = (durationString: string) => {
    const match = durationString.match(/(\d+)h\s*(\d+)m/);
    if (match) {
      return `${match[1]}h ${match[2]}m`;
    }
    return durationString;
  };

  // Handle ticket download
  const handleDownloadTicket = () => {
    downloadTicketHTML({
      bookingReference,
      bookingDate,
      passengerInfo,
      flight,
      searchParams,
      totalPrice,
      selectedSeats,
      seatUpgradeCost,
      selectedBaggage,
      baggageCost,
      selectedAddons,
      addonsCost,
      selectedMethod,
      selectedWallet,
    });
  };

  // Handle print ticket
  const handlePrintTicket = () => {
    printTicket({
      bookingReference,
      bookingDate,
      passengerInfo,
      flight,
      searchParams,
      totalPrice,
      selectedSeats,
      seatUpgradeCost,
      selectedBaggage,
      baggageCost,
      selectedAddons,
      addonsCost,
      selectedMethod,
      selectedWallet,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">Your flight has been successfully booked</p>
            <p className="text-sm text-muted-foreground mt-2">Confirmation sent to {passengerInfo?.email}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Reference */}
              <Card className="border-border/50 shadow-lg p-6 bg-primary/5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                    <p className="text-3xl font-bold text-primary">{bookingReference}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Booked on</p>
                    <p className="text-lg font-semibold text-foreground">{bookingDate}</p>
                  </div>
                </div>
              </Card>

              {/* Flight Details */}
              <Card className="border-border/50 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-nav to-nav/80 p-6 text-white">
                  <h3 className="text-2xl font-bold">Flight Details</h3>
                </div>

                <div className="p-6 space-y-6">
                  {/* Route */}
                  <div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{flight.airlineData.name}</p>
                      <p className="text-sm text-muted-foreground">Aircraft: Boeing 737</p>
                    </div>
                  </div>

                {/* Flight Route with Timeline */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{formatDepartureTime(flight.departTime)}</p>
                    <p className="text-sm text-muted-foreground mt-1">{searchParams?.from}</p>
                    <p className="text-xs text-muted-foreground mt-2">{searchParams?.departDate}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-full h-px bg-border"></div>
                    <div>
                      <p className="text-xs text-muted-foreground text-center font-medium">{formatDuration(flight.duration)}</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
                      </p>
                    </div>
                    <div className="w-full h-px bg-border"></div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{formatDepartureTime(flight.arriveTime)}</p>
                    <p className="text-sm text-muted-foreground mt-1">{searchParams?.to}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {flight.stops === 0
                        ? searchParams?.departDate
                        : new Date(new Date(searchParams?.departDate).getTime() + 1000 * 60 * 60 * 24).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Included Amenities</p>
                  <div className="flex gap-3 flex-wrap">
                    <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                      <span className="text-accent">📡</span>
                      <span className="text-sm font-medium">In-flight WiFi</span>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                      <span className="text-accent">⚡</span>
                      <span className="text-sm font-medium">USB Power</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg">
                      <span className="text-foreground">🍽️</span>
                      <span className="text-sm font-medium">Meal Service</span>
                    </div>
                  </div>
                </div>

                {/* Seat, Baggage & Add-ons */}
                {(selectedSeats?.length > 0 || selectedBaggage || selectedAddons?.length > 0) && (
                  <div className="border-t border-border pt-6 mt-6">
                    <p className="text-lg font-semibold text-foreground mb-4">Booking Upgrades</p>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedSeats?.length > 0 && (
                        <div className="bg-accent/10 p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground font-semibold mb-1">SEAT SELECTION</p>
                          <p className="text-lg font-bold text-accent">{selectedSeats[0]}</p>
                          {seatUpgradeCost > 0 && (
                            <p className="text-xs text-accent font-medium mt-1">Business Class</p>
                          )}
                        </div>
                      )}
                      {selectedBaggage && selectedBaggage !== "0" && (
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground font-semibold mb-1">CHECKED BAGGAGE</p>
                          <p className="text-lg font-bold text-primary">
                            {selectedBaggage === "1" ? "1 Bag" : "2 Bags"}
                          </p>
                          {baggageCost > 0 && (
                            <p className="text-xs text-primary font-medium mt-1">${baggageCost.toFixed(2)}</p>
                          )}
                        </div>
                      )}
                      {selectedAddons?.length > 0 && (
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg col-span-2">
                          <p className="text-xs text-muted-foreground font-semibold mb-2">ADDITIONAL ADD-ONS</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedAddons.map((addon) => {
                              const labels: Record<string, string> = {
                                "travel-insurance": "Travel Insurance",
                                "priority-boarding": "Priority Boarding",
                                "meals": "Extra Meals",
                                "baggage-protection": "Baggage Protection",
                              };
                              return (
                                <span key={addon} className="bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium">
                                  ✓ {labels[addon]}
                                </span>
                              );
                            })}
                          </div>
                          {addonsCost > 0 && (
                            <p className="text-xs text-green-900 dark:text-green-200 font-medium mt-2">${addonsCost.toFixed(2)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Passenger Details */}
            <Card className="border-border/50 shadow-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Passenger Details
              </h3>
              <div className="space-y-4">
                {/* Name and Title */}
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">PASSENGER NAME</p>
                  <p className="text-lg font-semibold text-foreground">
                    {passengerInfo?.title} {passengerInfo?.firstName} {passengerInfo?.lastName}
                  </p>
                </div>

                {/* Personal Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">DATE OF BIRTH</p>
                    <p className="font-medium text-foreground">
                      {new Date(passengerInfo?.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">NATIONALITY</p>
                    <p className="font-medium text-foreground">{passengerInfo?.nationality}</p>
                  </div>
                </div>

                {/* Passport Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">PASSPORT NUMBER</p>
                    <p className="font-mono font-semibold text-foreground">{passengerInfo?.passportNumber}</p>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">PASSPORT EXPIRY</p>
                    <p className="font-medium text-foreground">
                      {new Date(passengerInfo?.passportExpiry).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">EMAIL</p>
                    <p className="font-medium text-foreground break-all text-sm">{passengerInfo?.email}</p>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">PHONE</p>
                    <p className="font-medium text-foreground">{passengerInfo?.phone}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Flight Summary */}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 shadow-lg sticky top-8">
              <div className="bg-gradient-to-r from-accent to-accent/80 p-6 text-white">
                <h3 className="text-xl font-bold">Payment Summary</h3>
              </div>

              <div className="p-6 space-y-6">
                {/* Price Breakdown */}
                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Flight Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${(flight.price * ((searchParams?.adults || 0) + (searchParams?.children || 0))).toFixed(2)}
                    </span>
                  </div>
                  {seatUpgradeCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Seat Upgrade</span>
                      <span className="font-medium text-foreground">${seatUpgradeCost.toFixed(2)}</span>
                    </div>
                  )}
                  {baggageCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Baggage</span>
                      <span className="font-medium text-foreground">${baggageCost.toFixed(2)}</span>
                    </div>
                  )}
                  {addonsCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Add-ons</span>
                      <span className="font-medium text-foreground">${addonsCost.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="font-medium text-foreground">
                      ${(totalPrice - (flight.price * ((searchParams?.adults || 0) + (searchParams?.children || 0))) - (seatUpgradeCost || 0) - (baggageCost || 0) - (addonsCost || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                  <p className="text-4xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
                </div>

                {/* Payment Method */}
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">PAYMENT METHOD</p>
                  <p className="font-semibold text-foreground">{paymentMethodLabels[selectedMethod]}</p>
                </div>

                {/* Contact Email */}
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">CONFIRMATION EMAIL</p>
                  <p className="font-medium text-foreground break-all text-sm">{passengerInfo?.email}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={handleDownloadTicket}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Ticket
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={handlePrintTicket}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Ticket
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/")}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Check your email for your complete itinerary
                </p>
              </div>
            </Card>
          </div>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirmation;
