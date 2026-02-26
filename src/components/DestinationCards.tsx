import { useState } from "react";

const destinations = [
  { name: "Miami", price: "from $149", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop" },
  { name: "Las Vegas", price: "from $99", image: "/LA.jpg" },
  { name: "Denver", price: "from $129", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop" },
  { name: "Honolulu", price: "from $349", image: "/Honolulu.jpg" },
];

const DestinationCards = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (destName: string) => {
    setLoadedImages((prev) => new Set(prev).add(destName));
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Popular destinations
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Explore our most-searched getaways
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((dest) => (
            <div key={dest.name} className="dest-card group aspect-[3/4] relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Loading...</p>
                </div>
              </div>
              <img
                src={dest.image}
                alt={`${dest.name} destination`}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loadedImages.has(dest.name) ? "opacity-100" : "opacity-0"}`}
                loading="lazy"
                onLoad={() => handleImageLoad(dest.name)}
              />
              <div className="dest-card-overlay" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="text-primary-foreground text-xl font-bold drop-shadow-lg">{dest.name}</h3>
                <p className="text-primary-foreground/80 text-sm drop-shadow">{dest.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationCards;
