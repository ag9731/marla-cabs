'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { categorySchema, type CategoryFormData } from '@/lib/validations/blog'

async function checkAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  
  const { data: isAdmin } = await supabase.from('admin_users').select('id').eq('id', user.id).single()
  if (!isAdmin) throw new Error('Unauthorized Admin')
  
  return supabase
}

export async function createCategory(data: CategoryFormData) {
  try {
    const supabase = await checkAuth()
    const validatedData = categorySchema.parse(data)

    const { error } = await supabase
      .from('blog_categories')
      .insert([validatedData])

    if (error) {
      if (error.code === '23505') return { error: 'A category with this slug already exists.' }
      return { error: error.message }
    }

    revalidatePath('/admin/blog/categories')
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An unknown error occurred.' }
  }
}

export async function deleteCategory(id: string) {
  try {
    const supabase = await checkAuth()
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/blog/categories')
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An unknown error occurred.' }
  }
}
