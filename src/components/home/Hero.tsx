import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Premium White Innova Hycross style */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/cars/hero-innova.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <div className="space-y-6 max-w-[800px]">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
            Your Reliable Ride <br className="hidden sm:inline" />
            <span className="text-accent">Across India</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-lg sm:text-xl text-white/90">
            Professional drivers, comfortable cars, and transparent pricing. Experience the best cab service for outstation, local, and airport transfers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/book" 
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md bg-accent px-8 py-2 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
            >
              Book Your Cab
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/services" 
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md border-2 border-white bg-transparent px-8 py-2 text-base font-semibold text-white shadow-lg transition-colors hover:bg-white hover:text-primary"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
