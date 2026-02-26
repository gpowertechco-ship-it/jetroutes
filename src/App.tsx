import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import FlightResults from "./pages/FlightResults";
import SavedFlights from "./pages/SavedFlights";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import CryptoPayment from "./pages/CryptoPayment";
import Confirmation from "./pages/Confirmation";
import CryptoWaitingApproval from "./pages/CryptoWaitingApproval";
import ForgotPassword from "./pages/ForgotPassword";
import Help from "./pages/Help";
import ContactUs from "./pages/ContactUs";
import CheckIn from "./pages/CheckIn";
import Flights from "./pages/Flights";
import ManageTrips from "./pages/ManageTrips";
import FlightStatus from "./pages/FlightStatus";
import Rewards from "./pages/Rewards";
import Offers from "./pages/Offers";
import Vacations from "./pages/Vacations";
import InfoPage from "./pages/InfoPage";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/search-flights" element={<FlightResults />} />
          <Route path="/saved-flights" element={<SavedFlights />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/crypto-payment" element={<CryptoPayment />} />
          <Route path="/crypto-waiting-approval" element={<CryptoWaitingApproval />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/manage-trips" element={<ManageTrips />} />
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/vacations" element={<Vacations />} />
          <Route path="/about-us" element={<InfoPage title="About JetRoutes" description="Learn more about our mission and values" />} />
          <Route path="/careers" element={<InfoPage title="Careers" description="Join our growing team" />} />
          <Route path="/media" element={<InfoPage title="Media" description="Press releases and media kit" />} />
          <Route path="/community" element={<InfoPage title="Community Investment" description="Supporting communities worldwide" />} />
          <Route path="/accessibility" element={<InfoPage title="Accessibility" description="We're committed to accessibility for all" />} />
          <Route path="/advisories" element={<InfoPage title="Travel Advisories" description="Important travel information" />} />
          <Route path="/terms" element={<InfoPage title="Terms of Use" description="Our terms and conditions" />} />
          <Route path="/privacy" element={<InfoPage title="Privacy Policy" description="How we protect your data" />} />
          <Route path="/cookies" element={<InfoPage title="Cookie Policy" description="Understanding our use of cookies" />} />
          <Route path="/conditions" element={<InfoPage title="Conditions of Carriage" description="Conditions for airline travel" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
