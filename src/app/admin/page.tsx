import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch counts
  const [postsRes, draftsRes] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'draft')
  ])

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
      <p className="text-slate-500 mb-8">Welcome back, {user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-slate-500 font-medium text-sm">Published Posts</h3>
          <p className="text-4xl font-bold text-slate-900 mt-2">{postsRes.count || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-slate-500 font-medium text-sm">Drafts</h3>
          <p className="text-4xl font-bold text-slate-900 mt-2">{draftsRes.count || 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/blog/new" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-sm">
            Write New Post
          </Link>
          <Link href="/admin/blog" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-sm">
            Manage Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
