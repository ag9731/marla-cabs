'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { postSchema, type PostFormData } from '@/lib/validations/blog'

async function checkAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  
  const { data: isAdmin } = await supabase.from('admin_users').select('id').eq('id', user.id).single()
  if (!isAdmin) throw new Error('Unauthorized Admin')
  
  return { supabase, user }
}

export async function createPost(data: PostFormData) {
  try {
    const { supabase, user } = await checkAuth()
    
    // Create the core post payload (explicitly exclude tags)
    const { tags, ...postData } = data
    const payload = {
      ...postData,
      author_id: user.id,
      published_at: data.status === 'published' && !data.published_at ? new Date().toISOString() : data.published_at
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert([payload])
      .select('id')
      .single()

    if (error) {
      if (error.code === '23505') return { error: 'A post with this slug already exists. Please choose a unique slug.' }
      return { error: error.message }
    }

    // Insert tags mapping
    if (data.tags && data.tags.length > 0) {
      const tagPayload = data.tags.map(t => ({ post_id: post.id, tag_id: t }))
      await supabase.from('blog_post_tags').insert(tagPayload)
    }

    revalidatePath('/admin/blog')
    return { success: true, id: post.id }
  } catch (error: unknown) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An unknown error occurred' }
  }
}

export async function updatePost(id: string, data: PostFormData) {
  try {
    const { supabase, user } = await checkAuth()
    
    const { tags, ...postData } = data
    const payload = {
      ...postData,
      published_at: data.status === 'published' && !data.published_at ? new Date().toISOString() : data.published_at,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', id)

    if (error) {
      if (error.code === '23505') return { error: 'A post with this slug already exists. Please choose a unique slug.' }
      return { error: error.message }
    }

    // Update tags: delete all existing and re-insert
    await supabase.from('blog_post_tags').delete().eq('post_id', id)
    
    if (data.tags && data.tags.length > 0) {
      const tagPayload = data.tags.map(t => ({ post_id: id, tag_id: t }))
      await supabase.from('blog_post_tags').insert(tagPayload)
    }

    revalidatePath('/admin/blog')
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An unknown error occurred.' }
  }
}

export async function deletePost(id: string) {
  try {
    const { supabase } = await checkAuth()
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) return { error: error.message }
    
    revalidatePath('/admin/blog')
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An unknown error occurred.' }
  }
}
