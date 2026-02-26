export interface Airline {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

// Real major airlines with actual logos
export const airlines: Airline[] = [
  {
    id: "united",
    name: "United Airlines",
    code: "UA",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/51/United_Airlines_Logo.svg",
  },
  {
    id: "american",
    name: "American Airlines",
    code: "AA",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0f/American_Airlines_logo_2013.svg",
  },
  {
    id: "delta",
    name: "Delta Air Lines",
    code: "DL",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e8/Delta_Air_Lines_Logo.svg",
  },
  {
    id: "southwest",
    name: "Southwest Airlines",
    code: "SW",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cb/Southwest_Airlines_Tactics_Logo.svg",
  },
  {
    id: "jetblue",
    name: "JetBlue Airways",
    code: "B6",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3d/JetBlue_Airways_Logo.svg",
  },
  {
    id: "alaska",
    name: "Alaska Airlines",
    code: "AS",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/35/Alaska_Airlines_Logo.svg",
  },
  {
    id: "lufthansa",
    name: "Lufthansa",
    code: "LH",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Lufthansa_Logo.svg",
  },
  {
    id: "british",
    name: "British Airways",
    code: "BA",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/ba/British_Airways.svg",
  },
  {
    id: "emirates",
    name: "Emirates",
    code: "EK",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/Emirates_logo.svg",
  },
  {
    id: "qantas",
    name: "Qantas Airways",
    code: "QF",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Qantas_Logo.svg",
  },
  {
    id: "singaporeair",
    name: "Singapore Airlines",
    code: "SQ",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6b/Singapore_Airlines_Logo.svg",
  },
  {
    id: "cathay",
    name: "Cathay Pacific",
    code: "CX",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/01/Cathay_Pacific_Logo.svg",
  },
  {
    id: "airasiax",
    name: "AirAsia X",
    code: "D7",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d6/AirAsia_X_2.svg",
  },
  {
    id: "virgin",
    name: "Virgin Atlantic",
    code: "VS",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6f/Virgin_Atlantic_2014_Logo.svg",
  },
  {
    id: "swiss",
    name: "SWISS",
    code: "LX",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/SWISS_Logo.svg",
  },
];

// Major airports worldwide
export const airports: Airport[] = [
  // US Airports - New York Area (4 terminals)
  { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "United States" },
  { code: "EWR", name: "Newark Liberty International", city: "Newark", country: "United States" },
  { code: "LGA", name: "LaGuardia", city: "Manhattan", country: "United States" },
  { code: "SWF", name: "Stewart International", city: "New Windsor", country: "United States" },
  
  // US Airports - Texas (4 terminals)
  { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", country: "United States" },
  { code: "DAL", name: "Dallas Love Field", city: "Dallas", country: "United States" },
  { code: "IAH", name: "George Bush Intercontinental", city: "Houston", country: "United States" },
  { code: "HOU", name: "William P. Hobby", city: "Houston", country: "United States" },
  { code: "SAT", name: "San Antonio International", city: "San Antonio", country: "United States" },
  { code: "AUS", name: "Austin Bergstrom International", city: "Austin", country: "United States" },
  
  // US Airports - Other
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "United States" },
  { code: "ORD", name: "Chicago O'Hare International", city: "Chicago", country: "United States" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta", city: "Atlanta", country: "United States" },
  { code: "MIA", name: "Miami International", city: "Miami", country: "United States" },
  { code: "SFO", name: "San Francisco International", city: "San Francisco", country: "United States" },
  { code: "LAS", name: "Harry Reid International", city: "Las Vegas", country: "United States" },
  { code: "BOS", name: "Boston Logan International", city: "Boston", country: "United States" },
  { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle", country: "United States" },
  
  // European Airports
  { code: "LHR", name: "London Heathrow", city: "London", country: "United Kingdom" },
  { code: "CDG", name: "Paris Charles de Gaulle", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "Germany" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "LGW", name: "London Gatwick", city: "London", country: "United Kingdom" },
  { code: "MAD", name: "Adolfo Suárez Madrid-Barajas", city: "Madrid", country: "Spain" },
  { code: "FCO", name: "Rome Fiumicino", city: "Rome", country: "Italy" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
  
  // Asian Airports
  { code: "HND", name: "Tokyo Haneda", city: "Tokyo", country: "Japan" },
  { code: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore" },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "Hong Kong" },
  { code: "BKK", name: "Bangkok Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { code: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "Malaysia" },
  { code: "NRT", name: "Tokyo Narita", city: "Tokyo", country: "Japan" },
  { code: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  
  // Middle East Airports
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "United Arab Emirates" },
  { code: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  { code: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "United Arab Emirates" },
  
  // Australian Airports
  { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "MEL", name: "Melbourne Tullamarine", city: "Melbourne", country: "Australia" },
  
  // Canadian Airports
  { code: "YYZ", name: "Toronto Pearson International", city: "Toronto", country: "Canada" },
  { code: "YVR", name: "Vancouver International", city: "Vancouver", country: "Canada" },
];

export const getAirlineByCode = (code: string): Airline => {
  return airlines.find((a) => a.code === code) || airlines[0];
};

export const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find((a) => a.code === code);
};
