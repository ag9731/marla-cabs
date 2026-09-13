import { ShieldCheck, Banknote, UserCheck, Clock } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Transparent Pricing",
      description: "No hidden charges, no surge pricing. What you see is what you pay.",
      icon: Banknote,
    },
    {
      title: "Verified Drivers",
      description: "Professional, background-verified drivers with years of experience.",
      icon: UserCheck,
    },
    {
      title: "Well-Maintained Fleet",
      description: "Clean, sanitized, and regularly serviced vehicles for your safety.",
      icon: ShieldCheck,
    },
    {
      title: "On-Time Guarantee",
      description: "Punctual service ensuring you reach your destination without delays.",
      icon: Clock,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
              Why Choose Marla Cabs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We don't just provide a ride; we provide peace of mind. With thousands of happy customers, our focus remains firmly on safety, reliability, and comfort.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <reason.icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-1">{reason.title}</h4>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl lg:ml-auto w-full lg:w-11/12">
            {/* 
              Image source: Unsplash 
              Photographer: Eutah Mizushima
            */}
            <img 
              src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1000" 
              alt="Professional chauffeur" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/95 backdrop-blur p-6 rounded-xl shadow-lg border-l-4 border-accent">
                <p className="text-lg font-semibold text-primary">"The most reliable service I've used in India."</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">- Rahul S., Frequent Traveller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
