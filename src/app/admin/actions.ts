'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // Clear cache for layout to reflect logged out state
  revalidatePath('/', 'layout')
  
  // Navigate back to login
  redirect('/admin/login')
}
