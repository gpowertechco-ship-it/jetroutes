import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  const heroImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop";
  
  return (
    <div className="promo-card relative h-full min-h-[300px] md:min-h-[400px] flex flex-col justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Beautiful tropical beach"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-hero-teal/60 to-hero-teal/40" />
      <div className="relative z-10 p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-hero-teal-foreground leading-tight mb-4">
          Escape to<br />Paradise
        </h2>
        <p className="text-hero-teal-foreground/90 text-base md:text-lg mb-6 max-w-sm">
          Save up to 30% off select base fares on flights to sun destinations.
        </p>
        <Button variant="hero-outline" size="lg">
          Book now
        </Button>
      </div>
    </div>
  );
};

export default HeroBanner;
