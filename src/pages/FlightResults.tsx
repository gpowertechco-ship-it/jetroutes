import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, ArrowRight, Clock, MapPin, Users, Wifi, Zap, Filter, Flame, TrendingDown, ArrowRightLeft, Heart } from "lucide-react";
import { useState, useEffect } from "react";
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
}

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Price Filter
  const [priceFilter, setPriceFilter] = useState<[number, number]>([400, 1500]);
  const [tempPriceFilter, setTempPriceFilter] = useState<[number, number]>([400, 1500]);
  
  // Airline Filter
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  
  // Stops Filter
  const [maxStops, setMaxStops] = useState<number>(3);
  
  // Departure Time Filter
  const [departureTimeFilter, setDepartureTimeFilter] = useState<string>("all");
  
  // Duration Filter
  const [maxDuration, setMaxDuration] = useState<number>(24);
  
  // Sort Options
  const [sortBy, setSortBy] = useState<"price" | "duration" | "stops" | "departure">("price");

  const searchParams = (location.state as any) || {
    from: "LAX",
    to: "JFK",
    departDate: new Date().toLocaleDateString(),
    adults: 1,
    children: 0,
  };

  useEffect(() => {
    const generateFlights = () => {
      const newFlights: Flight[] = [];
      
      // Realistic minute intervals (5, 15, 30, 45)
      const minuteOptions = [0, 15, 30, 45];
      const getRealisticTime = (hour: number) => {
        const minute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
        return { hour: hour % 24, minute };
      };

      const formatTimeWithAMPM = (hour: number, minute: number) => {
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`;
      };

      // Realistic price points for different routes
      const pricePoints: Record<string, number[]> = {
        budget: [400.99, 425.49, 450.75, 475.25, 499.99],
        economy: [525.50, 549.99, 579.75, 599.25, 629.99, 659.50, 699.99],
        premium: [749.75, 799.50, 849.99, 899.75, 949.50],
      };

      // Check if airports are in Texas or New York
      const texasAirports = ["DFW", "DAL", "IAH", "HOU", "SAT", "AUS"];
      const newYorkAirports = ["JFK", "EWR", "LGA", "SWF"];
      
      const isFromTexas = texasAirports.includes(searchParams.from);
      const isToTexas = texasAirports.includes(searchParams.to);
      const isFromNewYork = newYorkAirports.includes(searchParams.from);
      const isToNewYork = newYorkAirports.includes(searchParams.to);

      // Check if this is a Texas-New York route (any terminal to any terminal)
      const isTexasNewYorkRoute = 
        (isFromTexas && isToNewYork) || 
        (isFromNewYork && isToTexas);

      // Check if this is a Newark-Manhattan route
      const isNewarkManhattanRoute = 
        (searchParams.from === "EWR" && searchParams.to === "LGA") ||
        (searchParams.from === "LGA" && searchParams.to === "EWR");

      for (let i = 0; i < 8; i++) {
        const stops = Math.floor(Math.random() * 3);
        const durationHours = Math.floor(Math.random() * 4) + 4;
        const durationMinutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
        
        const departTime = getRealisticTime(Math.floor(Math.random() * 22) + 1);
        const arriveTime = getRealisticTime((departTime.hour + durationHours) % 24);
        
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        
        // Realistic pricing
        let basePrice: number;
        const isRoundtrip = searchParams.tripType === "roundtrip";
        
        if (isRoundtrip) {
          // Round-trip flights: minimum $400 base price
          if (isTexasNewYorkRoute) {
            // Texas-New York routes: $400-500 budget range
            const priceVariation = [400.99, 415.50, 425.75, 440.25, 450.99, 475.50, 499.99];
            basePrice = priceVariation[Math.floor(Math.random() * priceVariation.length)];
          } else if (isNewarkManhattanRoute) {
            // Newark-Manhattan: $400-450 range
            const priceVariation = [400.99, 415.50, 425.75, 440.25, 450.99];
            basePrice = priceVariation[Math.floor(Math.random() * priceVariation.length)];
          } else {
            // Other routes: all starting from $400
            const allPrices = [...pricePoints.budget, ...pricePoints.economy, ...pricePoints.premium];
            basePrice = allPrices[Math.floor(Math.random() * allPrices.length)];
          }
        } else {
          // One-way trips: allow wide random pricing variation
          const minPrice = 200;
          const maxPrice = 1200;
          basePrice = Math.round((Math.random() * (maxPrice - minPrice) + minPrice) * 100) / 100;
        }
        
        // Add taxes and fees (12%) with realistic decimal
        const taxesAndFees = Math.round(basePrice * 0.12 * 100) / 100;
        const price = Math.round((basePrice + taxesAndFees) * 100) / 100;

        let transitPoints: string[] = [];
        if (stops === 1) {
          transitPoints = ["ORD"];
        } else if (stops === 2) {
          transitPoints = ["ORD", "DEN"];
        }

        // Baggage information
        const baggageOptions = [
          { checkedBags: 1, carryOn: 1, weight: "50 lbs" },
          { checkedBags: 2, carryOn: 1, weight: "100 lbs" },
          { checkedBags: 2, carryOn: 2, weight: "150 lbs" },
        ];
        const baggage = baggageOptions[Math.floor(Math.random() * baggageOptions.length)];

        // Generate return flight data if it's a round trip
        let returnFlightData = {};
        if (searchParams.tripType === "roundtrip") {
          const returnDurationMinutes = Math.floor(Math.random() * 4) * 15;
          const returnDepartTime = getRealisticTime(Math.floor(Math.random() * 22) + 1);
          const returnArriveTime = getRealisticTime((returnDepartTime.hour + durationHours) % 24);

          returnFlightData = {
            returnDepartTime: formatTimeWithAMPM(returnDepartTime.hour, returnDepartTime.minute),
            returnArriveTime: formatTimeWithAMPM(returnArriveTime.hour, returnArriveTime.minute),
            returnDuration: `${durationHours}h ${returnDurationMinutes}m`,
            returnStops: Math.floor(Math.random() * 3),
          };
        }

        newFlights.push({
          id: `flight-${i}`,
          airlineData: airline,
          departTime: formatTimeWithAMPM(departTime.hour, departTime.minute),
          arriveTime: formatTimeWithAMPM(arriveTime.hour, arriveTime.minute),
          duration: `${durationHours}h ${durationMinutes}m`,
          stops,
          transit: transitPoints,
          price,
          seats: Math.floor(Math.random() * 150) + 10,
          isBestPrice: i === 0,
          isPopular: i === 1 || i === 3,
          baggage,
          ...returnFlightData,
        });
      }
      const sortedFlights = newFlights.sort((a, b) => a.price - b.price);
      
      // Get min and max prices from flights
      const minPrice = Math.floor(sortedFlights[0].price);
      const maxPrice = Math.ceil(sortedFlights[sortedFlights.length - 1].price);
      
      setFlights(sortedFlights);
      setPriceFilter([minPrice, maxPrice]);
      setTempPriceFilter([minPrice, maxPrice]);
    };

    generateFlights();
    
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to load wishlist:", e);
      }
    }
  }, [searchParams.tripType]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...flights];

    // Apply price filter
    filtered = filtered.filter(f => f.price >= priceFilter[0] && f.price <= priceFilter[1]);

    // Apply airline filter
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter(f => selectedAirlines.includes(f.airlineData.code));
    }

    // Apply stops filter
    filtered = filtered.filter(f => f.stops <= maxStops);

    // Apply departure time filter
    if (departureTimeFilter !== "all") {
      filtered = filtered.filter(f => {
        const time = parseInt(f.departTime.split(":")[0]);
        const isPM = f.departTime.includes("PM");
        const hour24 = isPM && time !== 12 ? time + 12 : (time === 12 && !isPM ? 0 : time);
        
        switch (departureTimeFilter) {
          case "morning": return hour24 >= 6 && hour24 < 12;
          case "afternoon": return hour24 >= 12 && hour24 < 17;
          case "evening": return hour24 >= 17 && hour24 < 21;
          case "night": return hour24 >= 21 || hour24 < 6;
          default: return true;
        }
      });
    }

    // Apply duration filter
    filtered = filtered.filter(f => {
      const durationParts = f.duration.split("h");
      const hours = parseInt(durationParts[0]);
      return hours <= maxDuration;
    });

    // Apply sorting
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "duration":
          const aDurationParts = a.duration.split("h");
          const aDurationHours = parseInt(aDurationParts[0]);
          const bDurationParts = b.duration.split("h");
          const bDurationHours = parseInt(bDurationParts[0]);
          return aDurationHours - bDurationHours;
        case "stops":
          return a.stops - b.stops;
        case "departure":
          const aTime = a.departTime;
          const bTime = b.departTime;
          return aTime.localeCompare(bTime);
        default:
          return 0;
      }
    });

    setFilteredFlights(sorted);
  }, [flights, priceFilter, selectedAirlines, maxStops, departureTimeFilter, maxDuration, sortBy]);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const fromAirport = searchParams.from;
  const toAirport = searchParams.to;
  const totalPassengers = searchParams.adults + searchParams.children;
  
  // Get unique airlines from flights
  const uniqueAirlines = Array.from(new Set(flights.map(f => f.airlineData.code)))
    .map(code => flights.find(f => f.airlineData.code === code)!.airlineData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-nav via-nav to-nav/80 text-white py-12 px-4 border-b border-nav/20 shadow-lg">
        <div className="flex justify-center">
          <div className="w-full grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-white/80 text-sm font-medium mb-2">Your Flight Search</p>
              <h1 className="text-4xl font-bold mb-4">
                {fromAirport} <span className="text-accent">→</span> {toAirport}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  <span>{searchParams.departDate}</span>
                </div>
                {searchParams.returnDate && (
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-4 w-4" />
                    <span>{searchParams.returnDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{totalPassengers} Passenger{totalPassengers > 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="capitalize font-semibold text-accent">{searchParams.tripType?.replace('roundtrip', 'Round Trip').replace('oneway', 'One Way').replace('multicity', 'Multi-City') || 'Round Trip'}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-accent mb-2">{flights.length}</p>
              <p className="text-white/80">Flights Available</p>
              <p className="text-sm text-white/70 mt-2">Sorted by best prices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-7xl grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-bold text-foreground">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-secondary rounded-lg"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {(showFilters || window.innerWidth >= 1024) && (
              <div className="space-y-4">
                {/* Price Range Filter */}
                <Card className="p-5 bg-white/60 backdrop-blur-md border-2 border-accent/10 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-foreground text-sm">Price Range</h4>
                    <TrendingDown className="h-4 w-4 text-accent" />
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-muted-foreground w-8 font-medium">Min</label>
                        <input
                          type="number"
                          value={tempPriceFilter[0]}
                          onChange={(e) => setTempPriceFilter([parseInt(e.target.value) || 0, tempPriceFilter[1]])}
                          className="w-full px-3 py-2 text-xs border-2 border-primary/20 rounded-lg bg-white focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-muted-foreground w-8 font-medium">Max</label>
                        <input
                          type="number"
                          value={tempPriceFilter[1]}
                          onChange={(e) => setTempPriceFilter([tempPriceFilter[0], parseInt(e.target.value) || 10000])}
                          className="w-full px-3 py-2 text-xs border-2 border-primary/20 rounded-lg bg-white focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={tempPriceFilter[1]}
                        onChange={(e) => setTempPriceFilter([tempPriceFilter[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gradient-to-r from-primary/30 to-accent rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {filteredFlights.length} flights in range
                    </p>
                  </div>
                </Card>

                {/* Airlines Filter */}
                <Card className="p-5 bg-white/60 backdrop-blur-md border-2 border-primary/10 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-foreground text-sm mb-3">Airlines</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {uniqueAirlines.map((airline) => (
                      <label key={airline.code} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline.code)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAirlines([...selectedAirlines, airline.code]);
                            } else {
                              setSelectedAirlines(selectedAirlines.filter(code => code !== airline.code));
                            }
                          }}
                          className="w-4 h-4 rounded border-input cursor-pointer accent-primary"
                        />
                        <span className="ml-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {airline.name}
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({flights.filter((f) => f.airlineData.code === airline.code).length})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Stops Filter */}
                <Card className="p-5 bg-white/60 backdrop-blur-md border-2 border-primary/10 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-foreground text-sm mb-3">Number of Stops</h4>
                  <div className="space-y-3">
                    {[0, 1, 2, 3].map((stopCount) => (
                      <label key={stopCount} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="stops"
                          checked={maxStops === stopCount}
                          onChange={() => setMaxStops(stopCount)}
                          className="w-4 h-4 rounded border-input cursor-pointer accent-primary"
                        />
                        <span className="ml-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {stopCount === 0 ? "Non-stop" : stopCount === 1 ? "1 Stop" : stopCount === 2 ? "2 Stops" : "3+ Stops"}
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({flights.filter((f) => f.stops <= stopCount).length})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Departure Time Filter */}
                <Card className="p-5 bg-white/60 backdrop-blur-md border-2 border-primary/10 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-foreground text-sm mb-3">Departure Time</h4>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Times" },
                      { value: "morning", label: "Morning (6:00 - 12:00)" },
                      { value: "afternoon", label: "Afternoon (12:00 - 17:00)" },
                      { value: "evening", label: "Evening (17:00 - 21:00)" },
                      { value: "night", label: "Night (21:00+ or 6:00-)" }
                    ].map((time) => (
                      <label key={time.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="departureTime"
                          checked={departureTimeFilter === time.value}
                          onChange={() => setDepartureTimeFilter(time.value)}
                          className="w-4 h-4 rounded border-input cursor-pointer accent-primary"
                        />
                        <span className="ml-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {time.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Duration Filter */}
                <Card className="p-5 bg-white/60 backdrop-blur-md border-2 border-primary/10 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-foreground text-sm">Flight Duration</h4>
                    <span className="text-xs font-semibold text-accent">Up to {maxDuration}h</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="1"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-primary/30 to-accent rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {filteredFlights.length} flights match
                  </p>
                </Card>

                {/* Sort Options */}
                <Card className="p-5 bg-white/60 backdrop-blur-md border-2 border-accent/10 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <label className="text-sm font-bold text-foreground mb-3 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-2 text-sm border-2 border-primary/20 rounded-lg bg-white focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="price">Lowest Price</option>
                    <option value="duration">Shortest Duration</option>
                    <option value="stops">Fewest Stops</option>
                    <option value="departure">Earliest Departure</option>
                  </select>
                </Card>

                {/* Reset Filters Button */}
                <Button
                  variant="outline"
                  className="w-full rounded-lg transition-all duration-200 py-5 text-sm font-semibold"
                  onClick={() => {
                    setPriceFilter([400, 1500]);
                    setTempPriceFilter([400, 1500]);
                    setSelectedAirlines([]);
                    setMaxStops(3);
                    setDepartureTimeFilter("all");
                    setMaxDuration(24);
                    setSortBy("price");
                  }}
                >
                  Reset All Filters
                </Button>

                {/* Apply Filter Button */}
                <Button
                  className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl py-5 text-sm"
                  onClick={() => setPriceFilter([tempPriceFilter[0], tempPriceFilter[1]])}
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </div>

          {/* Flight List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-accent/10">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-nav to-primary bg-clip-text text-transparent">Available Flights</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Showing <span className="font-semibold text-accent">{filteredFlights.length}</span> of <span className="font-semibold">{flights.length}</span> flights
                </p>
              </div>
            </div>

            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <Card
                  key={flight.id}
                  className={`overflow-hidden transition-all duration-300 cursor-pointer border-2 rounded-2xl ${
                    selectedFlight === flight.id
                      ? "border-accent bg-gradient-to-br from-accent/10 to-primary/5 shadow-2xl scale-105"
                      : "border-border/20 bg-white hover:border-accent/40 hover:shadow-2xl hover:scale-102"
                  }`}
                  onClick={() => setSelectedFlight(flight.id)}
                >
                  {/* Badges */}
                  <div className={`absolute top-4 right-4 flex gap-2 z-10 ${searchParams.tripType === "roundtrip" ? "hidden" : ""}`}>
                    {flight.isBestPrice && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-accent to-accent/80 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                        <TrendingDown className="h-3.5 w-3.5" />
                        Best Price
                      </div>
                    )}
                    {flight.isPopular && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                        <Flame className="h-3.5 w-3.5" />
                        Popular
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-stretch gap-4">
                      {/* Left Column - Airline Info */}
                      <div className="flex flex-col items-start justify-start border-r-2 border-accent/15 pr-4 min-w-fit">
                        <div className="mb-0.5">
                          <p className="font-bold text-foreground text-sm">{flight.airlineData.name}</p>
                          <p className="text-xs text-muted-foreground">{flight.airlineData.code} {Math.floor(Math.random() * 9000) + 1000}</p>
                        </div>
                        <div className="space-y-12">
                          <p className="text-xs font-bold text-accent">Departure</p>
                          {searchParams.tripType === "roundtrip" && (
                            <p className="text-xs font-bold text-accent">Return</p>
                          )}
                          {searchParams.tripType === "multicity" && flight.transit && flight.transit.length > 0 && (
                            <p className="text-xs font-bold text-accent">Transit</p>
                          )}
                        </div>
                      </div>

                      {/* Middle Column - Flight Details */}
                      <div className="flex-1 flex flex-col justify-between border-r-2 border-accent/15 pr-4">
                        {/* Departure Details */}
                        <div className="pb-3 border-b-2 border-accent/10">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-foreground">{flight.departTime}</p>
                              <p className="text-xs text-muted-foreground font-medium">{fromAirport}</p>
                            </div>

                            <div className="flex flex-col items-center gap-0.5 px-2">
                              <Clock className="h-4 w-4 text-accent" />
                              <p className="text-xs font-bold text-foreground">{flight.duration}</p>
                              <p className="text-xs text-muted-foreground font-medium">
                                {flight.stops === 0 ? "Nonstop" : `${flight.stops}s`}
                              </p>
                            </div>

                            <div className="flex-1 text-right min-w-0">
                              <p className="text-sm font-bold text-foreground">{flight.arriveTime}</p>
                              <p className="text-xs text-muted-foreground font-medium">{toAirport}</p>
                            </div>
                          </div>
                        </div>

                        {/* Return Details */}
                        {searchParams.tripType === "roundtrip" && flight.returnDepartTime && (
                          <div className="pt-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-foreground">{flight.returnDepartTime}</p>
                                <p className="text-xs text-muted-foreground font-medium">{toAirport}</p>
                              </div>

                              <div className="flex flex-col items-center gap-0.5 px-2">
                                <Clock className="h-4 w-4 text-accent" />
                                <p className="text-xs font-bold text-foreground">{flight.returnDuration}</p>
                                <p className="text-xs text-muted-foreground font-medium">
                                  {flight.returnStops === 0 ? "Nonstop" : `${flight.returnStops}s`}
                                </p>
                              </div>

                              <div className="flex-1 text-right min-w-0">
                                <p className="text-sm font-bold text-foreground">{flight.returnArriveTime}</p>
                                <p className="text-xs text-muted-foreground font-medium">{fromAirport}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Transit Details - Only for multi-city */}
                        {searchParams.tripType === "multicity" && flight.transit && flight.transit.length > 0 && (
                          <div className="pt-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              {flight.transit.map((transitCode, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <div className="flex items-center justify-center bg-accent/20 text-accent px-2 py-1 rounded-lg border border-accent/30">
                                    <MapPin className="h-3 w-3 mr-0.5" />
                                    <p className="text-xs font-bold">{transitCode}</p>
                                  </div>
                                  {idx < flight.transit.length - 1 && (
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Price & Action */}
                      <div className="flex flex-col items-end justify-between min-w-fit pl-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setWishlist(
                              wishlist.includes(flight.id)
                                ? wishlist.filter(id => id !== flight.id)
                                : [...wishlist, flight.id]
                            );
                          }}
                          className="mb-2 p-2 hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <Heart
                            className={`h-5 w-5 ${wishlist.includes(flight.id) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                          />
                        </button>
                        <div className="text-right mb-2">
                          <p className="text-4xl font-black text-accent">${flight.price.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-1.5 mb-3 flex-wrap justify-end">
                          <div className="flex items-center gap-0.5 bg-gradient-to-r from-accent/20 to-accent/10 text-accent px-2.5 py-1.5 rounded-lg text-xs border-2 border-accent/30 font-semibold">
                            <Wifi className="h-3.5 w-3.5" />
                            <span className="text-xs">Wi-Fi</span>
                          </div>
                          <div className="flex items-center gap-0.5 bg-gradient-to-r from-accent/20 to-accent/10 text-accent px-2.5 py-1.5 rounded-lg text-xs border-2 border-accent/30 font-semibold">
                            <Zap className="h-3.5 w-3.5" />
                            <span className="text-xs">Power</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="font-bold py-2 px-5 text-xs bg-gradient-to-r from-nav to-primary hover:from-nav/90 hover:to-primary/90 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/checkout", { state: { flight, searchParams } });
                          }}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
                <div className="text-center">
                  <Plane className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Flights Found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPriceFilter([400, 1500]);
                      setTempPriceFilter([400, 1500]);
                      setSelectedAirlines([]);
                      setMaxStops(3);
                      setDepartureTimeFilter("all");
                      setMaxDuration(24);
                      setSortBy("price");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FlightResults;
