import { createClient } from '@/lib/supabase/server'
import { PostEditor } from '../post-editor'
import { notFound } from 'next/navigation'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = await createClient()
  
  const [postRes, catsRes, tagsRes] = await Promise.all([
    supabase.from('blog_posts').select('*, blog_post_tags(tag_id)').eq('id', id).single(),
    supabase.from('blog_categories').select('*').order('name'),
    supabase.from('blog_tags').select('*').order('name')
  ])

  if (postRes.error || !postRes.data) {
    notFound()
  }

  // Format the date correctly for datetime-local input if it exists
  const postData = { ...postRes.data }
  if (postData.published_at) {
    // Slice to remove the Z and seconds/ms to fit datetime-local format YYYY-MM-DDThh:mm
    postData.published_at = new Date(postData.published_at).toISOString().slice(0, 16)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <PostEditor 
        initialData={postData}
        categories={catsRes.data || []} 
        tags={tagsRes.data || []} 
      />
    </div>
  )
}
