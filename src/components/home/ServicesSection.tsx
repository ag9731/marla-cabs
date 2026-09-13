import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Airport Transfers",
    description: "Punctual pickups and drop-offs to ensure you never miss a flight. Available 24/7.",
    href: "/services/airport-transfers",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800",
    photographer: "Phil Mosley"
  },
  {
    title: "Outstation Cabs",
    description: "Comfortable long-distance travel with experienced drivers for your weekend getaways.",
    href: "/services/outstation-cabs",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800",
    photographer: "Dino Reichmuth"
  },
  {
    title: "Corporate Travel",
    description: "Professional chauffeur-driven cars for business meetings and corporate events.",
    href: "/services/corporate-travel",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800",
    photographer: "Sean Pollock"
  },
  {
    title: "Wedding Cars",
    description: "Luxury premium cars to make your special day even more memorable.",
    href: "/services/wedding-cars",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800",
    photographer: "Thomas William"
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Premium Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you need a quick ride to the airport or a luxury car for a special event, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group relative bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                {/* Image source: Unsplash, Photographer: {service.photographer} */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {service.description}
                </p>
                <Link 
                  href={service.href}
                  className="inline-flex items-center text-accent font-semibold hover:text-accent/80 transition-colors"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
