import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/content/services";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;
  const service = servicesData[params.slug];
  
  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | Marla Cabs`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage(props: { params: Params }) {
  const params = await props.params;
  const service = servicesData[params.slug];
  
  if (!service) {
    notFound();
  }

  return (
    <article className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content (Text & Details) */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {service.introParagraphs.map((para, idx) => (
                  <p key={idx} className="mb-6 leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-8">Why Choose This Service?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-xl border">
                      {typeof benefit === "string" ? (
                        <p className="text-primary font-medium">{benefit}</p>
                      ) : (
                        <>
                          <h3 className="font-bold text-primary text-xl mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Destinations / Routes */}
              {service.popularDestinations && service.popularDestinations.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-6">Popular Destinations</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {service.popularDestinations.map((dest, idx) => {
                      if (typeof dest === "string") {
                        return (
                          <div key={idx} className="bg-accent/10 p-4 rounded-xl border border-accent/20 text-center flex items-center justify-center min-h-[80px]">
                            <span className="font-medium text-primary">{dest}</span>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={idx} className="group relative rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow aspect-square">
                          <Image
                            src={dest.image}
                            alt={dest.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                            <span className="font-bold text-white text-lg">{dest.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pricing Guidance */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Pricing Guidance</h2>
                <div className="bg-accent/10 p-6 rounded-xl border border-accent/20">
                  <p className="text-primary font-medium text-lg leading-relaxed">
                    {service.pricingGuidance}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    * Prices are indicative and may vary based on specific requirements, exact locations, and seasonal demand. Please request a quote for exact pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Quick Book Card */}
              <div className="bg-primary text-white p-8 rounded-2xl shadow-xl sticky top-24">
                <h3 className="text-2xl font-bold mb-4">Book This Service</h3>
                <p className="text-white/80 mb-6">Get an instant confirmation for your {service.title.toLowerCase()}.</p>
                <Link href="/book" className="flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-base font-bold text-accent-foreground transition-transform hover:scale-105">
                  Book Now
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-white/60 text-sm mb-2">Prefer to talk?</p>
                  <a href="tel:+916366819755" className="text-xl font-bold hover:text-accent transition-colors">+91 63668 19755</a>
                </div>
              </div>

              {/* Inclusions List */}
              <div className="bg-slate-50 p-8 rounded-2xl border">
                <h3 className="text-xl font-bold text-primary mb-6">What's Included</h3>
                <ul className="space-y-4">
                  {service.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secondary Image */}
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                 <Image
                    src={service.secondaryImage}
                    alt={`${service.title} featured`}
                    fill
                    className="object-cover"
                  />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-slate-50 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">Common queries regarding our {service.title.toLowerCase()}.</p>
          </div>
          <div className="space-y-6">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-lg text-primary mb-3 flex items-start gap-2">
                  <span className="text-accent text-xl">Q.</span> {faq.question}
                </h4>
                <p className="text-muted-foreground pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection />
    </article>
  );
}
