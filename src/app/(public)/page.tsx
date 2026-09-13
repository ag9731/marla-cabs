import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FleetSection } from "@/components/home/FleetSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ServicesSection />
        <FleetSection />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <PopularRoutes />
        <BlogPreview />
        <CTASection />
      </main>
    </div>
  );
}
