import { createClient } from '@/lib/supabase/server'
import { PostEditor } from '../post-editor'

export default async function NewPostPage() {
  const supabase = await createClient()
  
  // Fetch categories and tags for the editor
  const [catsRes, tagsRes] = await Promise.all([
    supabase.from('blog_categories').select('*').order('name'),
    supabase.from('blog_tags').select('*').order('name')
  ])

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <PostEditor 
        categories={catsRes.data || []} 
        tags={tagsRes.data || []} 
      />
    </div>
  )
}
