import { ArrowRightLeft, CalendarDays, Search, Users, ChevronDown, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import LoadingScreen from "@/components/LoadingScreen";

const airports = [
  // New York Area (4 terminals)
  { code: "JFK", city: "New York", state: "NY" },
  { code: "EWR", city: "Newark", state: "NJ" },
  { code: "LGA", city: "Manhattan", state: "NY" },
  { code: "SWF", city: "New Windsor", state: "NY" },
  
  // Texas (6 terminals)
  { code: "DFW", city: "Dallas", state: "TX" },
  { code: "DAL", city: "Dallas", state: "TX" },
  { code: "IAH", city: "Houston", state: "TX" },
  { code: "HOU", city: "Houston", state: "TX" },
  { code: "SAT", city: "San Antonio", state: "TX" },
  { code: "AUS", city: "Austin", state: "TX" },
  
  // Other Major US Cities
  { code: "LAX", city: "Los Angeles", state: "CA" },
  { code: "ORD", city: "Chicago", state: "IL" },
  { code: "DEN", city: "Denver", state: "CO" },
  { code: "SFO", city: "San Francisco", state: "CA" },
  { code: "SEA", city: "Seattle", state: "WA" },
  { code: "ATL", city: "Atlanta", state: "GA" },
  { code: "MIA", city: "Miami", state: "FL" },
  { code: "BOS", city: "Boston", state: "MA" },
  { code: "LAS", city: "Las Vegas", state: "NV" },
  { code: "HNL", city: "Honolulu", state: "HI" },
];

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("roundtrip");
  const [from, setFrom] = useState("LAX");
  const [to, setTo] = useState("");
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [departDate, setDepartDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalGuests = adults + children;

  const filteredFromAirports = airports.filter(
    (a) => a.code !== to && (a.code.toLowerCase().includes(fromSearch.toLowerCase()) || 
                             a.city.toLowerCase().includes(fromSearch.toLowerCase()) ||
                             a.state.toLowerCase().includes(fromSearch.toLowerCase()))
  );

  const filteredToAirports = airports.filter(
    (a) => a.code !== from && (a.code.toLowerCase().includes(toSearch.toLowerCase()) || 
                               a.city.toLowerCase().includes(toSearch.toLowerCase()) ||
                               a.state.toLowerCase().includes(toSearch.toLowerCase()))
  );

  const swapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setFromSearch("");
    setToSearch("");
  };

  const getAirportLabel = (code: string) => {
    const airport = airports.find((a) => a.code === code);
    return airport ? `${airport.city}, ${airport.state} (${airport.code})` : "";
  };

  const handleSearchFlights = () => {
    if (!to) {
      alert("Please select a destination");
      return;
    }

    setIsLoading(true);

    // Simulate search delay then navigate
    setTimeout(() => {
      navigate("/search-flights", {
        state: {
          from,
          to,
          departDate: departDate ? format(departDate, "EEE MMM d, yyyy") : "",
          returnDate: returnDate ? format(returnDate, "EEE MMM d, yyyy") : "",
          adults,
          children,
          tripType,
        },
      });
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg border border-border/30 backdrop-blur">
      <h2 className="text-3xl font-bold text-card-foreground mb-2">Book a flight</h2>
      <p className="text-card-foreground/60 text-sm mb-6">Find and book your perfect journey</p>

      {/* Trip Type */}
      <div className="mb-4">
        <label className="booking-label">Trip type</label>
        <Select value={tripType} onValueChange={setTripType}>
          <SelectTrigger className="border-0 border-b border-input rounded-none bg-transparent px-0 pt-4 pb-2 h-auto shadow-none focus:ring-0 font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="roundtrip">Round trip</SelectItem>
            <SelectItem value="oneway">One way</SelectItem>
            <SelectItem value="multicity">Multi-city</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* From / To */}
      <div className="mb-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="booking-label">From</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search city..."
                value={fromSearch || getAirportLabel(from)}
                onChange={(e) => {
                  setFromSearch(e.target.value);
                  setFromOpen(true);
                }}
                onFocus={() => setFromOpen(true)}
                className="border-0 border-b border-input rounded-none bg-transparent px-0 pt-4 pb-2 w-full shadow-none focus:outline-none focus:ring-0 font-medium"
              />
              {fromOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-input rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {filteredFromAirports.map((a) => (
                    <button
                      key={a.code}
                      onClick={() => {
                        setFrom(a.code);
                        setFromSearch("");
                        setFromOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors flex items-center gap-2"
                    >
                      <Plane className="h-3.5 w-3.5 text-muted-foreground" />
                      {a.city}, {a.state} ({a.code})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={swapAirports}
            className="pb-3 text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <label className="booking-label">Going to</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search city..."
                value={toSearch || getAirportLabel(to)}
                onChange={(e) => {
                  setToSearch(e.target.value);
                  setToOpen(true);
                }}
                onFocus={() => setToOpen(true)}
                className="border-0 border-b border-input rounded-none bg-transparent px-0 pt-4 pb-2 w-full shadow-none focus:outline-none focus:ring-0 font-medium"
              />
              {toOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-input rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {filteredToAirports.map((a) => (
                    <button
                      key={a.code}
                      onClick={() => {
                        setTo(a.code);
                        setToSearch("");
                        setToOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors flex items-center gap-2"
                    >
                      <Plane className="h-3.5 w-3.5 text-muted-foreground" />
                      {a.city}, {a.state} ({a.code})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className={cn("grid gap-4 mb-4", tripType === "oneway" ? "grid-cols-1" : "grid-cols-2")}>
        <div>
          <label className="booking-label">Departure</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-between booking-field cursor-pointer w-full text-left">
                <span className={cn("font-medium", !departDate && "text-muted-foreground")}>
                  {departDate ? format(departDate, "EEE MMM d") : "Select date"}
                </span>
                <CalendarDays className="h-4 w-4 text-accent" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departDate}
                onSelect={setDepartDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        {tripType !== "oneway" && (
          <div>
            <label className="booking-label">Return date</label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center justify-between booking-field cursor-pointer w-full text-left">
                  <span className={cn("font-medium", !returnDate && "text-muted-foreground")}>
                    {returnDate ? format(returnDate, "EEE MMM d") : "Select date"}
                  </span>
                  <CalendarDays className="h-4 w-4 text-accent" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  disabled={(date) => date < (departDate || new Date())}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Guests */}
      <div className="mb-6">
        <label className="booking-label">Guests</label>
        <Popover open={guestOpen} onOpenChange={setGuestOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center justify-between booking-field cursor-pointer w-full text-left">
              <span className="text-card-foreground font-medium">
                {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
                {children > 0 && ` (${adults} adult, ${children} child)`}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Adults</p>
                  <p className="text-xs text-muted-foreground">12+ years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="h-8 w-8 rounded-full border border-input flex items-center justify-center text-sm hover:bg-muted transition-colors disabled:opacity-40"
                    disabled={adults <= 1}
                  >
                    −
                  </button>
                  <span className="w-4 text-center font-medium">{adults}</span>
                  <button
                    onClick={() => setAdults(Math.min(9, adults + 1))}
                    className="h-8 w-8 rounded-full border border-input flex items-center justify-center text-sm hover:bg-muted transition-colors disabled:opacity-40"
                    disabled={adults >= 9}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Children</p>
                  <p className="text-xs text-muted-foreground">2–11 years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="h-8 w-8 rounded-full border border-input flex items-center justify-center text-sm hover:bg-muted transition-colors disabled:opacity-40"
                    disabled={children <= 0}
                  >
                    −
                  </button>
                  <span className="w-4 text-center font-medium">{children}</span>
                  <button
                    onClick={() => setChildren(Math.min(8, children + 1))}
                    className="h-8 w-8 rounded-full border border-input flex items-center justify-center text-sm hover:bg-muted transition-colors disabled:opacity-40"
                    disabled={children >= 8}
                  >
                    +
                  </button>
                </div>
              </div>
              <Button
                variant="hero"
                size="sm"
                className="w-full"
                onClick={() => setGuestOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <Button
        variant="hero"
        size="lg"
        className="w-full text-base py-6 gap-3 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
        onClick={handleSearchFlights}
        disabled={isLoading}
      >
        <Search className="h-5 w-5" />
        {isLoading ? "Searching..." : "GET FLIGHTS"}
      </Button>
    </div>
    </>
  );
};

export default FlightSearchForm;
