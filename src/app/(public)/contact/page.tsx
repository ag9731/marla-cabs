import { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Marla Cabs",
  description: "Get in touch with Marla Cabs. We are available 24/7 for bookings, support, and corporate enquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Have a question or need to make a corporate enquiry? We're here to help 24/7.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Get In Touch</h2>
                <p className="text-lg text-muted-foreground">
                  Our customer support team is always ready to assist you with bookings, itinerary planning, or any travel-related queries.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-primary text-xl">Phone</h3>
                  <p className="text-muted-foreground text-sm">Call us directly for urgent bookings and support.</p>
                  <a href="tel:+916366819755" className="text-accent font-bold mt-auto hover:underline">+91 63668 19755</a>
                </div>

                <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-primary text-xl">Email</h3>
                  <p className="text-muted-foreground text-sm">For corporate queries and general information.</p>
                  <a href="mailto:support@marlacabs.com" className="text-accent font-bold mt-auto hover:underline">support@marlacabs.com</a>
                </div>

                <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-primary text-xl">Head Office</h3>
                  <p className="text-muted-foreground text-sm">123, Business Park, Phase 1, New Delhi, India 110001</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-primary text-xl">Working Hours</h3>
                  <p className="text-muted-foreground text-sm">Our booking and support center operates 24 hours a day, 7 days a week.</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-white p-8 rounded-2xl border shadow-xl">
                <h2 className="text-2xl font-bold text-primary mb-6">Send an Enquiry</h2>
                {/* Reusing the robust booking form for general enquiries too */}
                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
