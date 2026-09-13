import { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { Phone, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Cab | Marla Cabs",
  description: "Book your cab online instantly. No advance payment required. Available 24/7 across India.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column - Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Book Your Ride</h1>
              <p className="text-lg text-muted-foreground">
                Fill out the form to request a booking. Our team will contact you within 15 minutes to confirm the details and finalize the fare.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-6">Why book with us?</h3>
              <ul className="space-y-4">
                {[
                  "Zero Advance Payment Required",
                  "Transparent All-Inclusive Pricing",
                  "Verified Professional Drivers",
                  "Free Cancellation up to 2 hours prior",
                  "24/7 Customer Support Helpline"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary text-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
              <Phone className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2">Need it urgently?</h3>
              <p className="text-white/80 mb-6">Call us directly for immediate bookings.</p>
              <a href="tel:+916366819755" className="text-3xl font-black text-accent hover:text-white transition-colors">
                +91 63668 19755
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>

        </div>
      </div>
    </div>
  );
}
