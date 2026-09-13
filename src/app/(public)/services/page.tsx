import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/content/services";

export const metadata: Metadata = {
  title: "Our Services | Marla Cabs",
  description: "Explore our wide range of cab services including airport transfers, outstation, local city rides, corporate travel, and wedding cars.",
};

export default function ServicesPage() {
  const services = Object.values(servicesData);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Reliable, comfortable, and affordable transportation solutions tailored for every need.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-primary mb-3">{service.title}</h2>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {service.shortDescription}
                  </p>
                  <Link 
                    href={`/services/${service.id}`}
                    className="inline-flex items-center text-accent font-semibold hover:text-accent/80 transition-colors"
                  >
                    Explore Service
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
