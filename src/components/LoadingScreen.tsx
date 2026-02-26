import { useEffect } from "react";

const LoadingScreen = () => {
  useEffect(() => {
    // Ensure no scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-nav to-nav/80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8 relative w-24 h-24 mx-auto">
          {/* Outer dotted circle */}
          <div className="absolute inset-0 border-4 border-dotted border-accent/30 rounded-full" />
          
          {/* Rotating dotted circle */}
          <div className="absolute inset-0 border-4 border-dotted border-transparent border-t-accent rounded-full animate-spin" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Searching Flights</h2>
        <p className="text-white/70 text-lg">Finding the best prices for you...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
