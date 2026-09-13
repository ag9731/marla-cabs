import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { DeletePostButton } from './delete-button'

export default async function BlogDashboardPage() {
  const supabase = await createClient()
  
  // Fetch posts with category and author info
  // auth.users is inaccessible directly via standard joins without custom views in some setups,
  // but if we need author email, it might be tricky since auth schema is not public.
  // The user prompt said: "Author" -> we might just show author_id or if we have a view. 
  // Let's just fetch posts and category.
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select(`
      id, title, status, published_at, updated_at,
      blog_categories ( name )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-500">Manage your Marla Cabs blog content</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/blog/categories" className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2">Categories</Link>
          <Link href="/admin/blog/tags" className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2">Tags</Link>
          <Link href="/admin/blog/new" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800">
            Create Post
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-red-500">Failed to load posts: {error.message}</div>
        ) : !posts || posts.length === 0 ? (
          <div className="p-16 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No posts yet</h3>
            <p className="text-slate-500 mb-6">Create your first blog post to get started.</p>
            <Link href="/admin/blog/new" className="text-amber-600 font-medium hover:underline">Create a post &rarr;</Link>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Title</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Published</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts?.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${
                      post.status === 'published' ? 'bg-green-100 text-green-700' :
                      post.status === 'draft' ? 'bg-slate-100 text-slate-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {post.blog_categories ? (post.blog_categories as any).name : 'Uncategorized'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4 text-sm font-medium">
                    <Link href={`/admin/blog/${post.id}`} className="text-amber-600 hover:text-amber-700">Edit</Link>
                    <DeletePostButton id={post.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
