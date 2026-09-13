import { Metadata } from "next";
import Image from "next/image";
import { Shield, Target, Heart, Award } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About Us | Marla Cabs",
  description: "Learn about the Marla Cabs story, our mission to redefine travel in India, and our unwavering commitment to passenger safety.",
};

const values = [
  {
    title: "Customer First",
    description: "Every decision we make is centered around improving the travel experience for our passengers.",
    icon: Heart
  },
  {
    title: "Uncompromising Safety",
    description: "We go above and beyond standard protocols to ensure every ride is secure and monitored.",
    icon: Shield
  },
  {
    title: "Transparency",
    description: "Honest pricing with zero hidden charges. What you see during booking is exactly what you pay.",
    icon: Target
  },
  {
    title: "Service Excellence",
    description: "From our pristine vehicles to our courteous drivers, we aim for perfection in every ride.",
    icon: Award
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Abstract pattern */}
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-accent" />
          </svg>
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Marla Cabs</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Redefining the standard of road travel in India through reliability, safety, and uncompromising quality.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200"
                alt="Marla Cabs Fleet"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl mb-6">Our Story</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Marla Cabs was founded with a simple yet ambitious vision: to organize the highly fragmented inter-city cab market in India and provide travelers with a service they can implicitly trust.
                </p>
                <p>
                  What started as a small fleet of 5 cars in a single city has now grown into a comprehensive transportation network spanning across 100+ cities in India. We realized early on that travelers were not just looking for a vehicle; they were looking for peace of mind.
                </p>
                <p>
                  By enforcing strict vehicle quality standards, implementing transparent per-kilometer pricing, and focusing heavily on driver training, we have successfully completed over 50,000 trips. Today, Marla Cabs is recognized as a premium travel partner for families, solo travelers, and large corporations alike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-primary mb-4 text-center">Our Mission</h3>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                To provide safe, reliable, and high-quality transportation services that exceed customer expectations, while fostering a respectful and empowering environment for our driver partners.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-primary mb-4 text-center">Our Vision</h3>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                To become India's most trusted and preferred mobility partner, recognized globally for setting the benchmark in ground transportation safety and customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">Our Commitment to Safety</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Safety isn't just a feature; it's the foundation of our company. We have implemented a multi-layered safety protocol to protect both our passengers and our drivers on every single journey.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-1">Rigorous Driver Screening</h4>
                    <p className="text-primary-foreground/70">Extensive background checks, police verification, and behavioral assessments for all drivers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-1">GPS Tracking & SOS</h4>
                    <p className="text-primary-foreground/70">24/7 active monitoring of all vehicles from our central command center.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-1">Strict Vehicle Maintenance</h4>
                    <p className="text-primary-foreground/70">Routine mechanical inspections and mandatory pre-trip checks to prevent breakdowns.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000"
                alt="Safe travel with Marla Cabs"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
