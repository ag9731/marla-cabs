import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CTASection } from "@/components/home/CTASection";
import DOMPurify from "isomorphic-dompurify";
import { ChevronRight } from "lucide-react";
type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, meta_title, meta_description, og_title, og_description, og_image, featured_image")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.meta_title || `${post.title} | Marla Cabs Blog`,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.og_title || post.meta_title || post.title,
      description: post.og_description || post.meta_description || post.excerpt || undefined,
      images: [post.og_image || post.featured_image || ''],
    }
  };
}

export default async function BlogPostPage(props: { params: Params }) {
  const params = await props.params;
  const supabase = await createClient();
  
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      category:blog_categories(name)
    `)
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();
  
  if (error || !post) {
    notFound();
  }

  const dateStr = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recent';

  // Sanitize the HTML content from Tiptap
  const cleanHtml = DOMPurify.sanitize(post.content || '', {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 
      'blockquote', 'br', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img'
    ],
    ALLOWED_ATTR: ['href', 'target', 'class', 'src', 'alt', 'title', 'width', 'height', 'rel']
  });

  return (
    <article className="flex flex-col min-h-screen bg-white">
      {/* Article Header (Breadcrumb, Title, Meta) */}
      <section className="pt-32 pb-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10" />
        <div className="container relative z-10 px-4 max-w-4xl mx-auto">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-white/60 mb-8 font-medium">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
            {post.category?.name && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
                <span className="text-white/90">{post.category.name}</span>
              </>
            )}
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Meta Data */}
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span>{dateStr}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              <span>Admin</span>
            </div>
            {post.category?.name && (
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-accent" />
                <span>{post.category.name}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <div className="relative w-full aspect-[21/9] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
          <Image
            src={post.featured_image || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600'}
            alt={post.image_alt || post.title}
            title={post.image_title || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          
          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-12 p-6 md:p-8 bg-slate-50 rounded-2xl border-l-4 border-accent">
              <p className="text-xl md:text-2xl text-primary font-medium italic leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}
          
          {/* Rich Text Content */}
          {/* Added overflow-x-auto to the wrapper so wide tables can scroll horizontally on mobile */}
          <div className="w-full overflow-x-auto">
            <div 
              className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:text-primary prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-p:leading-relaxed prose-li:marker:text-accent prose-table:min-w-full prose-th:bg-slate-50 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-th:border-b"
              dangerouslySetInnerHTML={{ __html: cleanHtml }} 
            />
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors bg-slate-50 px-6 py-3 rounded-full"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection />
    </article>
  );
}
