'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { tagSchema, type TagFormData } from '@/lib/validations/blog'

async function checkAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  
  const { data: isAdmin } = await supabase.from('admin_users').select('id').eq('id', user.id).single()
  if (!isAdmin) throw new Error('Unauthorized Admin')
  
  return supabase
}

export async function createTag(data: TagFormData) {
  try {
    const supabase = await checkAuth()
    const validatedData = tagSchema.parse(data)

    const { error } = await supabase
      .from('blog_tags')
      .insert([validatedData])

    if (error) {
      if (error.code === '23505') return { error: 'A tag with this slug already exists.' }
      return { error: error.message }
    }

    revalidatePath('/admin/blog/tags')
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An unknown error occurred.' }
  }
}

export async function deleteTag(id: string) {
  try {
    const supabase = await checkAuth()
    const { error } = await supabase
      .from('blog_tags')
      .delete()
      .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/blog/tags')
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An unknown error occurred.' }
  }
}
