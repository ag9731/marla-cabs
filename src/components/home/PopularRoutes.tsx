import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const routes = [
  {
    destination: "Ooty",
    title: "Bangalore to Ooty",
    description: "Travel to the Queen of Hill Stations. Enjoy a scenic, comfortable drive through the Nilgiris.",
    image: "/images/destinations/ooty.jpg",
  },
  {
    destination: "Madikeri",
    title: "Bangalore to Madikeri",
    description: "Escape to the coffee plantations and misty hills of Coorg with our expert drivers.",
    image: "/images/destinations/madikeri.jpg",
  },
  {
    destination: "Kerala",
    title: "Bangalore to Kerala",
    description: "Explore the magical backwaters and lush greenery of God's Own Country seamlessly.",
    image: "/images/destinations/kerala.jpg",
  },
  {
    destination: "Gokarna",
    title: "Bangalore to Gokarna",
    description: "Ride to pristine beaches and sacred temples in total comfort and safety.",
    image: "/images/destinations/gokarna.jpg",
  },
  {
    destination: "Chikmagalur",
    title: "Bangalore to Chikmagalur",
    description: "Relax in the lap of nature. We offer smooth rides to the land of coffee.",
    image: "/images/destinations/chikmagalur.jpg",
  },
  {
    destination: "Thiruvananthapuram",
    title: "Bangalore to Thiruvananthapuram",
    description: "Long-distance travel made effortless and premium for your Kerala trips.",
    image: "/images/destinations/thiruvananthapuram.jpg",
  }
];

export function PopularRoutes() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Popular Routes from Bangalore</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Travel to your favorite weekend getaways and prominent destinations with our reliable outstation fleet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route) => (
            <div key={route.title} className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={route.image}
                  alt={route.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-primary mb-2">{route.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{route.description}</p>
                <Link 
                  href="/book" 
                  className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-bold text-accent-foreground shadow-sm transition-transform hover:scale-105"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
