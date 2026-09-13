import { Users, MapPin, Clock, ShieldCheck } from "lucide-react";

export function TrustBar() {
  const stats = [
    { id: 1, name: "Happy Customers", value: "50,000+", icon: Users },
    { id: 2, name: "Cities Covered", value: "100+", icon: MapPin },
    { id: 3, name: "Support Available", value: "24/7", icon: Clock },
    { id: 4, name: "Safe & Secure Rides", value: "100%", icon: ShieldCheck },
  ];

  return (
    <section className="bg-white py-12 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-3">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <stat.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
              </div>
              <dd className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="text-base leading-7 text-muted-foreground">{stat.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
