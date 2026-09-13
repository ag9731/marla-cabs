export type FleetVehicle = {
  id: string;
  category: string;
  models: string;
  description: string;
  capacity: number;
  luggage: number;
  features: string[];
  image: string;
  startingPrice: string;
};

export const fleetData: FleetVehicle[] = [
  {
    id: "sedan",
    category: "Sedan",
    models: "Swift Dzire, Toyota Etios",
    description: "Perfect for solo travelers, couples, or small families. Economical, easy to navigate in city traffic, and highly fuel-efficient.",
    capacity: 4,
    luggage: 2,
    features: ["Air Conditioning", "Comfortable Seating", "Music System", "GPS Navigation"],
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    startingPrice: "₹12 / km"
  },
  {
    id: "ertiga",
    category: "Ertiga",
    models: "Maruti Suzuki Ertiga",
    description: "A compact MPV that offers the perfect balance of space, comfort, and economy. Ideal for medium-sized families.",
    capacity: 6,
    luggage: 3,
    features: ["Rear AC Vents", "Flexible Seating", "Smooth Suspension", "Spacious Cabin"],
    image: "/images/cars/ertiga.jpg",
    startingPrice: "₹16 / km"
  },
  {
    id: "innova-crysta",
    category: "Innova Crysta",
    models: "Toyota Innova Crysta",
    description: "The undisputed king of Indian highways. Offers unmatched comfort, superior legroom, and a robust build.",
    capacity: 6,
    luggage: 4,
    features: ["Plush Captain Seats", "Dual Automatic AC", "Extra Legroom", "High Safety Rating"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    startingPrice: "₹19 / km"
  },
  {
    id: "toyota-hybrid",
    category: "Toyota Hybrid",
    models: "Toyota Innova Hycross Hybrid",
    description: "Experience the pinnacle of eco-friendly luxury travel. Silent cabin, premium interiors, and ultra-smooth hybrid technology.",
    capacity: 6,
    luggage: 4,
    features: ["Panoramic Sunroof", "Ventilated Seats", "Silent Hybrid Drive", "Premium Interiors"],
    image: "/images/cars/toyota-hybrid.jpg",
    startingPrice: "₹22 / km"
  },
  {
    id: "tempo-traveller",
    category: "Tempo Traveller",
    models: "Force Traveller (A/C)",
    description: "The ultimate group travel solution. Ideal for corporate outings, large family vacations, and group tours.",
    capacity: 12,
    luggage: 10,
    features: ["Reclining Push-back Seats", "Individual AC Vents", "Ample Luggage Space", "Premium Audio System"],
    image: "/images/cars/tempo-traveller.jpg",
    startingPrice: "₹22 / km"
  },
  {
    id: "urbania",
    category: "Urbania",
    models: "Force Urbania 16 Seater",
    description: "The next generation of luxury group travel. European-style premium van offering unparalleled comfort and stand-up height.",
    capacity: 16,
    luggage: 12,
    features: ["Aviation Style Seats", "Independent Suspension", "Standing Height Cabin", "Panoramic Windows"],
    image: "/images/cars/urbania.jpg",
    startingPrice: "₹42 / km"
  }
];
