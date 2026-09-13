import { Search, Car, CalendarCheck, Map } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Enter Trip Details",
      description: "Provide your pickup, drop locations, and preferred dates.",
      icon: Search,
    },
    {
      title: "Choose Your Car",
      description: "Select from our wide range of well-maintained vehicles.",
      icon: Car,
    },
    {
      title: "Confirm Booking",
      description: "Submit your details and get instant confirmation.",
      icon: CalendarCheck,
    },
    {
      title: "Enjoy Your Ride",
      description: "Experience a comfortable and safe journey with us.",
      icon: Map,
    },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">How It Works</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Booking a cab with Marla Cabs is quick, easy, and completely transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-primary-foreground/20" />
          
          {steps.map((step, index) => (
            <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary border-4 border-accent flex items-center justify-center mb-6 shadow-xl">
                <step.icon className="w-10 h-10 text-accent" />
              </div>
              <div className="absolute top-0 right-0 -mr-3 -mt-3 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center border-4 border-primary">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-primary-foreground/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
