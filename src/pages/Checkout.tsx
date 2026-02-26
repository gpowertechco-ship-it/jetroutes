import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, ArrowLeft, Clock, MapPin, Users, Wind, Shield, Feather, Wifi, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { countries } from "@/lib/countries";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Mr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatUpgradeCost, setSeatUpgradeCost] = useState(0);
  const [selectedBaggage, setSelectedBaggage] = useState("1"); // "0" = none, "1" = 1 bag, "2" = 2 bags
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // If logged in, load user data from signup
    if (loggedIn) {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setFirstName(user.firstName || "");
          setLastName(user.lastName || "");
          setEmail(user.email || "");
          setPhone(user.phone || "");
          setStreet(user.street || "");
          setCity(user.city || "");
          setProvince(user.province || "");
          setPostalCode(user.postalCode || "");
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }
  }, []);

  const { flight, searchParams } = (location.state as any) || {};

  if (!flight) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No flight selected. Please go back and select a flight.</p>
            <Button onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passportNumber.trim()) newErrors.passportNumber = "Passport number is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!passportExpiry) newErrors.passportExpiry = "Passport expiry date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleSeatSelection = (seatCode: string, isBusinessClass: boolean) => {
    const businessUpgradePrice = 75;
    setSelectedSeats([seatCode]);
    
    // Calculate upgrade cost only if business class is selected
    if (isBusinessClass) {
      setSeatUpgradeCost(businessUpgradePrice * totalPassengers);
    } else {
      setSeatUpgradeCost(0);
    }
  };

  const handleProceedToPayment = () => {
    if (!isLoggedIn) {
      // Force user to sign up
      navigate("/signup", { 
        state: { 
          redirect: "/checkout",
          flight,
          searchParams,
          message: "Create an account to proceed with your booking"
        },
        replace: false 
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Navigate to payment
    navigate("/payment", {
      state: {
        flight,
        searchParams,
        totalPrice,
        selectedSeats,
        seatUpgradeCost,
        selectedBaggage,
        baggageCost,
        selectedAddons,
        addonsCost,
        passengerInfo: {
          title,
          firstName,
          lastName,
          dateOfBirth,
          passportNumber,
          passportExpiry,
          nationality,
          email,
          phone,
        }
      }
    });
  };

  const totalPassengers = (searchParams?.adults || 0) + (searchParams?.children || 0);
  const flightSubtotal = flight.price * totalPassengers;
  const taxesAndFees = Math.round(flightSubtotal * 0.12 * 100) / 100;
  
  // Calculate baggage cost
  const baggageCost = selectedBaggage === "0" ? 0 : selectedBaggage === "1" ? 35 * totalPassengers : 65 * totalPassengers;
  
  // Calculate add-ons cost
  const addonsCost = selectedAddons.reduce((total, addon) => {
    switch (addon) {
      case "travel-insurance": return total + (15 * totalPassengers);
      case "priority-boarding": return total + (25 * totalPassengers);
      case "meals": return total + (20 * totalPassengers);
      case "baggage-protection": return total + (12 * totalPassengers);
      default: return total;
    }
  }, 0);
  
  const totalPrice = flightSubtotal + taxesAndFees + seatUpgradeCost + baggageCost + addonsCost;

  // Helper function to format departure time in 12-hour format with AM/PM
  const formatDepartureTime = (timeString: string) => {
    // If already formatted with AM/PM, return as is
    if (timeString.includes(" AM") || timeString.includes(" PM")) {
      return timeString;
    }
    // If in 24-hour format, convert to 12-hour with AM/PM
    const [time] = timeString.split(" ");
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, "0")}:${minuteStr} ${ampm}`;
  };

  // Helper function to format duration (remove seconds if present)
  const formatDuration = (durationString: string) => {
    // Match pattern like "4h 15m" or "4h 15m 30s"
    const match = durationString.match(/(\d+)h\s*(\d+)m/);
    if (match) {
      return `${match[1]}h ${match[2]}m`;
    }
    return durationString;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slideInUp 0.5s ease-out; }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        input:focus, select:focus {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 animate-fade-in"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Flights
          </Button>

          <div className="grid grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Forms & Details */}
            <div className="space-y-4">
              {/* Authentication Alert */}
              {!isLoggedIn && (
                <Card className="overflow-hidden border-amber-200 bg-amber-50 animate-slide-up">
                  <div className="p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-900 font-semibold text-sm">Authentication Required</p>
                      <p className="text-amber-800 text-sm mt-1">
                        You must sign in or create an account to complete your booking
                      </p>
                    </div>
                  </div>
                </Card>
              )}

            {/* Flight Summary */}
            <Card className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up w-full">
              <div className="bg-gradient-to-r from-nav to-nav/80 p-4 text-white">
                <h2 className="text-lg font-bold mb-1">Your Flight Details</h2>
                <p className="text-white/80 text-xs">Review your booking</p>
              </div>

              <div className="p-4">
                {/* Flight Info */}
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{flight.airlineData.name}</p>
                      <p className="text-xs text-muted-foreground">Flight {flight.airlineData.code} {Math.floor(Math.random() * 9000) + 1000}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    {/* Departure */}
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">DEPART</p>
                      <p className="text-lg font-bold text-foreground">{formatDepartureTime(flight.departTime)}</p>
                      <p className="text-xs text-muted-foreground mt-1">{searchParams?.from}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{searchParams?.departDate}</p>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 w-full justify-center mb-2">
                        <div className="flex-1 h-px bg-border" />
                        <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <p className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {formatDuration(flight.duration)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {flight.stops === 0 ? "Non-stop" : `${flight.stops}s`}
                      </p>
                    </div>

                    {/* Arrival */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">ARRIVE</p>
                      <p className="text-lg font-bold text-foreground">{formatDepartureTime(flight.arriveTime)}</p>
                      <p className="text-xs text-muted-foreground mt-1">{searchParams?.to}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{searchParams?.departDate}</p>
                    </div>
                  </div>
                </div>

                {/* Return Flight Info - Only for round trip */}
                {searchParams?.tripType === "roundtrip" && flight.returnDepartTime && (
                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="text-xs font-bold text-accent uppercase mb-2">Return Flight</p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {/* Return Departure */}
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">DEPART</p>
                        <p className="text-lg font-bold text-foreground">{formatDepartureTime(flight.returnDepartTime)}</p>
                        <p className="text-xs text-muted-foreground mt-1">{searchParams?.to}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{searchParams?.returnDate}</p>
                      </div>

                      {/* Return Duration */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2 w-full justify-center mb-2">
                          <div className="flex-1 h-px bg-border" />
                          <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                          <div className="flex-1 h-px bg-border" />
                        </div>
                        <p className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {formatDuration(flight.returnDuration)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {flight.returnStops === 0 ? "Non-stop" : `${flight.returnStops}s`}
                        </p>
                      </div>

                      {/* Return Arrival */}
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">ARRIVE</p>
                        <p className="text-lg font-bold text-foreground">{formatDepartureTime(flight.returnArriveTime)}</p>
                        <p className="text-xs text-muted-foreground mt-1">{searchParams?.from}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{searchParams?.returnDate}</p>
                      </div>
                    </div>
                  </div>
                )}

                {searchParams?.tripType !== "roundtrip" && (
                  <div className="mb-6 pb-6 border-b border-border" />
                )}

                {/* Amenities */}
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-lg">
                    <Wifi className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Wi-Fi Included</span>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-lg">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Power Outlets</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Passenger Details - Minimal */}
            <Card className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up w-full">
              <div className="bg-gradient-to-r from-nav to-nav/80 p-4 text-white">
                <h2 className="text-lg font-bold mb-1">Passport Information</h2>
                <p className="text-white/80 text-xs">Required for this flight</p>
              </div>

              <div className="p-4 space-y-4">
                {/* Title Selection */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Title</label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Passport Number *</label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="A12345678"
                      className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Passport Expiry *</label>
                    <input
                      type="date"
                      value={passportExpiry}
                      onChange={(e) => setPassportExpiry(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.passportExpiry && <p className="text-red-500 text-xs mt-1">{errors.passportExpiry}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Date of Birth *</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>
              </div>
            </Card>

            {/* Seat Selection */}
            <Card className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up w-full">
              <div className="bg-gradient-to-r from-nav to-nav/80 p-4 text-white">
                <h2 className="text-lg font-bold mb-1">Select Your Seat</h2>
                <p className="text-white/80 text-xs">Choose preferred seat</p>
              </div>

              <div className="p-4">
                {/* Business Class Section */}
                <div className="mb-4">
                  <h3 className="font-bold text-foreground mb-2 text-sm flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-accent"></span>
                    Business (+$75)
                  </h3>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {["1A", "1B", "1C", "1D"].map((seat) => (
                      <button
                        key={seat}
                        onClick={() => toggleSeatSelection(seat, true)}
                        className={`py-2 px-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                          selectedSeats.includes(seat)
                            ? "bg-accent text-accent-foreground border-2 border-accent"
                            : "bg-accent/20 text-accent border-2 border-accent/30 hover:border-accent/60"
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Economy Class Section */}
                <div>
                  <h3 className="font-bold text-foreground mb-2 text-sm flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                    Economy
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }, (_, i) => {
                      const row = Math.floor(i / 4) + 2;
                      const col = String.fromCharCode(65 + (i % 4));
                      return `${row}${col}`;
                    }).map((seat) => (
                      <button
                        key={seat}
                        onClick={() => toggleSeatSelection(seat, false)}
                        className={`py-2 px-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                          selectedSeats.includes(seat)
                            ? "bg-primary text-primary-foreground border-2 border-primary"
                            : "bg-primary/20 text-primary border-2 border-primary/30 hover:border-primary/60"
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Selected Seat</p>
                    <p className="text-base font-bold text-foreground">{selectedSeats[0]}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Baggage & Add-ons */}
            <Card className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up w-full">
              <div className="bg-gradient-to-r from-nav to-nav/80 p-4 text-white">
                <h2 className="text-lg font-bold mb-1">Baggage & Add-ons</h2>
                <p className="text-white/80 text-xs">Enhance your experience</p>
              </div>

              <div className="p-4 space-y-4">
                {/* Checked Baggage */}
                <div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">Checked Baggage</h3>
                  <div className="space-y-2">
                    {[
                      { value: "0", label: "No Baggage", price: "$0" },
                      { value: "1", label: "1 Bag", price: "$35/p" },
                      { value: "2", label: "2 Bags", price: "$65/p" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 p-2 border-2 border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors" style={{borderColor: selectedBaggage === option.value ? "var(--color-accent)" : undefined}}>
                        <input
                          type="radio"
                          name="baggage"
                          value={option.value}
                          checked={selectedBaggage === option.value}
                          onChange={(e) => setSelectedBaggage(e.target.value)}
                          className="w-4 h-4 cursor-pointer accent-accent"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-xs">{option.label}</p>
                        </div>
                        <span className="text-xs font-semibold text-accent">{option.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="border-t border-border pt-4">
                  <h3 className="font-bold text-foreground mb-2 text-sm">Add-ons</h3>
                  <div className="space-y-2">
                    {[
                      { value: "travel-insurance", label: "Travel Insurance", price: "$15/p" },
                      { value: "priority-boarding", label: "Priority Boarding", price: "$25/p" },
                      { value: "meals", label: "Extra Meals", price: "$20/p" },
                    ].map((addon) => (
                      <label key={addon.value} className="flex items-center gap-3 p-2 border-2 border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAddons([...selectedAddons, addon.value]);
                            } else {
                              setSelectedAddons(selectedAddons.filter(a => a !== addon.value));
                            }
                          }}
                          className="w-4 h-4 cursor-pointer accent-primary"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-xs">{addon.label}</p>
                        </div>
                        <span className="text-xs font-semibold text-primary">{addon.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Add-ons Summary */}
                {(baggageCost > 0 || addonsCost > 0) && (
                  <div className="mt-4 p-3 bg-secondary/50 rounded-lg border-l-4 border-primary">
                    <p className="text-xs text-muted-foreground mb-1">Additional Charges</p>
                    {baggageCost > 0 && (
                      <p className="text-xs font-semibold text-foreground">Baggage: ${baggageCost.toFixed(2)}</p>
                    )}
                    {addonsCost > 0 && (
                      <p className="text-xs font-semibold text-foreground">Add-ons: ${addonsCost.toFixed(2)}</p>
                    )}
                  </div>
                )}
              </div>
            </Card>
            </div>

            {/* Right Column - Price Summary */}
            <div>
              <Card className="border-border/50 shadow-lg sticky top-8">
                <div className="bg-gradient-to-r from-nav to-nav/80 p-6 text-white">
                  <h3 className="text-xl font-bold">Price Summary</h3>
                </div>

                <div className="p-6 space-y-4">
                  {/* Passengers */}
                  <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Passengers</p>
                    <div className="space-y-1">
                      {searchParams?.adults > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{searchParams.adults} Adult{searchParams.adults > 1 ? "s" : ""}</span>
                          <span className="font-medium text-foreground">${(flight.price * searchParams.adults).toFixed(2)}</span>
                        </div>
                      )}
                      {searchParams?.children > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{searchParams.children} Child{searchParams.children > 1 ? "ren" : ""}</span>
                          <span className="font-medium text-foreground">${(flight.price * searchParams.children).toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3 pb-4 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Flight Subtotal</span>
                    <span className="font-medium text-foreground">${flightSubtotal.toFixed(2)}</span>
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
                    <span className="font-medium text-foreground">${taxesAndFees.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="py-4 bg-primary/10 px-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-4xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout powered by encrypted payment gateway
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

export default Checkout;

