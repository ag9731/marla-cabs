import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "5 Tips for Stress-Free Airport Transfers",
    excerpt: "Learn how to plan your airport travel to avoid last-minute rushes and ensure a smooth start to your journey.",
    date: "Oct 15, 2023",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600",
    slug: "tips-for-stress-free-airport-transfers"
  },
  {
    title: "Choosing the Right Cab for Outstation Trips",
    excerpt: "Should you book a Sedan or an SUV? We break down the pros and cons based on group size and luggage.",
    date: "Oct 28, 2023",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600",
    slug: "choosing-right-cab-for-outstation"
  },
  {
    title: "Corporate Travel Safety Standards",
    excerpt: "How Marla Cabs ensures maximum safety, hygiene, and punctuality for our corporate clients.",
    date: "Nov 05, 2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600",
    slug: "corporate-travel-safety-standards"
  }
];

export function BlogPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Travel Tips & Guides</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Read the latest articles from our travel experts.
            </p>
          </div>
          <Link href="/blog" className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors">
            View all posts <ArrowRight className="ml-1 w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.slug} className="group flex flex-col bg-white rounded-2xl overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="text-accent font-semibold flex items-center">
                  Read more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
