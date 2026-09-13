import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-accent" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
          Ready for your next journey?
        </h2>
        <p className="max-w-2xl mx-auto text-xl text-primary-foreground/80 mb-10">
          Book your cab in minutes. No advance payment required. Experience the best-in-class travel service today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/book" 
            className="inline-flex h-14 items-center justify-center rounded-md bg-accent px-8 py-3 text-lg font-bold text-accent-foreground shadow-xl transition-transform hover:scale-105"
          >
            Book Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a 
            href="tel:+916366819755" 
            className="inline-flex h-14 items-center justify-center rounded-md border-2 border-white/20 bg-white/10 px-8 py-3 text-lg font-bold text-white shadow-xl transition-colors hover:bg-white/20 backdrop-blur"
          >
            Call Us: +91 63668 19755
          </a>
        </div>
      </div>
    </section>
  );
}
