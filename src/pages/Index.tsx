import Navbar from "@/components/Navbar";
import FlightSearchForm from "@/components/FlightSearchForm";
import HeroBanner from "@/components/HeroBanner";
import DestinationCards from "@/components/DestinationCards";
import PromoStrip from "@/components/PromoStrip";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      {/* Hero section: booking form + promo */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <FlightSearchForm />
          </div>
          <div className="flex justify-center">
            <HeroBanner />
          </div>
        </div>
      </main>

      <DestinationCards />
      <PromoStrip />
      <Footer />
    </div>
  );
};

export default Index;
