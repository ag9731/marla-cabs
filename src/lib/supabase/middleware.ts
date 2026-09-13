import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with cross-browser cookies, etc.
  
  // This will securely refresh the session if needed
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    let isAuthorized = false

    // Check if user is an admin by querying the admin_users table.
    // Because of RLS, this will ONLY return data if the user is in the table.
    if (user) {
      const { data } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .single()

      if (data) {
        isAuthorized = true
      }
    }

    // Handle /admin/login route
    if (request.nextUrl.pathname === '/admin/login') {
      if (isAuthorized) {
        // If they are an authorized admin, redirect to /admin
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }
      // If logged in but unauthorized, let them stay on login to switch accounts
      // or redirect them? Let's just let the page render. 
      return supabaseResponse
    }

    // Handle /admin/unauthorized route
    if (request.nextUrl.pathname === '/admin/unauthorized') {
      if (isAuthorized) {
        // If they are authorized, redirect to /admin
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }
      if (!user) {
        // If not even logged in, redirect to login
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }
      return supabaseResponse
    }

    // For all other /admin routes (like /admin, /admin/dashboard, etc)
    if (!user) {
      // If they are NOT logged in
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    if (!isAuthorized) {
      // If they ARE logged in but NOT authorized
      const url = request.nextUrl.clone()
      url.pathname = '/admin/unauthorized'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
