import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, CheckCircle2 } from "lucide-react";
import { fleetData } from "@/content/fleet";

export function FleetSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Diverse Fleet</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From economical Sedans to luxury Toyota Hybrids and premium Urbanias, we have the perfect vehicle for every journey.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleetData.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all group flex flex-col">
              {/* Car Image - Modern layout */}
              <div className="relative h-56 bg-slate-100 overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.category}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                  Starts {car.startingPrice}
                </div>
              </div>

              {/* Car Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary">{car.category}</h3>
                  <p className="text-sm font-medium text-accent mt-1">{car.models}</p>
                </div>

                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {car.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{car.capacity} Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Briefcase className="w-4 h-4 text-accent" />
                    <span>{car.luggage} Bags</span>
                  </div>
                </div>

                <div className="space-y-2 mb-8 flex-1">
                  {car.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/book"
                  className="block w-full text-center bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent hover:text-accent-foreground transition-colors mt-auto"
                >
                  Book {car.category}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/fleet"
            className="inline-flex items-center justify-center font-semibold text-accent hover:text-primary transition-colors"
          >
            View Complete Fleet Details <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
