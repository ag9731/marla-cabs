import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Traveler",
    content: "I use Marla Cabs for all my airport transfers. The drivers are always punctual, polite, and the cars are spotless. Highly recommended for corporate travel.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Family Vacation",
    content: "We booked an Innova for our weekend trip to Lonavala. The booking process was seamless, and the driver knew all the best routes and food stops. Great experience!",
    rating: 5,
  },
  {
    name: "Amit Desai",
    role: "Daily Commuter",
    content: "Transparent pricing is what keeps me coming back. No hidden charges or surge pricing tricks. Just honest, reliable service every single time.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Read reviews from thousands of satisfied travelers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-slate-50 p-8 rounded-2xl border shadow-sm relative">
              <div className="flex gap-1 mb-4 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? "fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6">"{testimonial.content}"</p>
              <div>
                <h4 className="font-bold text-primary">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
