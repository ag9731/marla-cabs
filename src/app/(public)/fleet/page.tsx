import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, CheckCircle2, Navigation } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import { fleetData } from "@/content/fleet";

export const metadata: Metadata = {
  title: "Our Fleet | Marla Cabs",
  description: "Explore our wide range of well-maintained vehicles including Sedans, Ertiga, Innova Crysta, and Urbania.",
};

export default function FleetPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Fleet</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Choose the perfect vehicle for your journey. From economical sedans to premium luxury coaches.
          </p>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 bg-slate-50 flex-1 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {fleetData.map((car) => (
              <div key={car.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all group flex flex-col">
                {/* Car Image */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.category}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-primary shadow-sm border border-slate-200">
                    Starts {car.startingPrice}
                  </div>
                </div>

                {/* Car Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-primary">{car.category}</h2>
                    <p className="text-sm font-semibold text-accent mt-1">{car.models}</p>
                  </div>

                  <p className="text-muted-foreground text-base mb-8 line-clamp-3 flex-1">
                    {car.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8 border-t border-b py-6">
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-lg border">
                      <Users className="w-6 h-6 text-accent" />
                      <span className="font-semibold text-sm">{car.capacity} Seats</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-lg border">
                      <Briefcase className="w-6 h-6 text-accent" />
                      <span className="font-semibold text-sm">{car.luggage} Bags</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h4 className="font-bold text-primary mb-4">Key Features</h4>
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href="/book"
                    className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent hover:text-accent-foreground transition-colors mt-auto text-lg shadow-md hover:shadow-xl"
                  >
                    Book {car.category}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Navigation className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary mb-4">All Our Vehicles Include</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Regardless of the category you choose, every Marla Cabs vehicle comes standard with comprehensive safety features, GPS tracking, a commercial transport permit, and an experienced, verified chauffeur.
          </p>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
