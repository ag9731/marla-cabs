import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Marla Cabs",
  description: "Read our latest travel tips, destination guides, and cab booking advice.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  
  const { data: posts } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      published_at,
      featured_image,
      category:blog_categories(name)
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="container relative z-10 px-4 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Travel & Lifestyle Blog
          </h1>
          <p className="text-xl text-white/80">
            Discover destinations, travel tips, and stories to inspire your next journey.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No blog posts published yet.</h3>
              <p className="text-slate-500">Check back later for exciting travel stories and tips!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const dateStr = post.published_at 
                  ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : 'Recent';
                  
                return (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full"
                  >
                    <Link href={`/blog/${post.slug}`} className="relative h-64 block overflow-hidden">
                      <Image
                        src={post.featured_image || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* @ts-expect-error category comes from join */}
                      {post.category?.name && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                          <Tag className="w-3 h-3" />
                          {/* @ts-expect-error category comes from join */}
                          {post.category.name}
                        </div>
                      )}
                    </Link>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {dateStr}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          Admin
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-accent transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p className="text-slate-600 mb-8 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors mt-auto"
                      >
                        Read Article
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
