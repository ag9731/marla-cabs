import { createClient } from '@/lib/supabase/server'
import { TagManager } from './tag-manager'

import Link from 'next/link'

export default async function TagsPage() {
  const supabase = await createClient()
  const { data: tags } = await supabase.from('blog_tags').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Tags</h1>
        <Link href="/admin/blog" className="text-amber-600 hover:underline">Back to Blog</Link>
      </div>

      <TagManager initialTags={tags || []} />
    </div>
  )
}
