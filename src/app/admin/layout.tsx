'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './logout-button'
import { LayoutDashboard, FileText, Tags, FolderTree, Menu, X } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Avoid running this layout logic strictly inside /admin/login 
  // as login doesn't need the dashboard shell.
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/blog', icon: FileText },
    { name: 'Categories', href: '/admin/blog/categories', icon: FolderTree },
    { name: 'Tags', href: '/admin/blog/tags', icon: Tags },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0F172A] text-white p-4 flex justify-between items-center z-50">
        <span className="font-bold text-xl">MARLA CABS</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'flex' : 'hidden'} 
        md:flex flex-col w-full md:w-64 bg-[#0F172A] text-slate-300 flex-shrink-0
        md:h-screen md:sticky top-0 z-40
      `}>
        <div className="p-6 hidden md:block">
          <h2 className="text-2xl font-bold text-white tracking-tight">MARLA CABS</h2>
          <p className="text-xs text-amber-500 font-medium tracking-widest mt-1 uppercase">Admin Portal</p>
        </div>

        <nav className="mt-6 md:mt-2 px-4 space-y-1 flex-1">
          {navItems.map(item => {
            // Active logic: if exact match, or if it's under blog (e.g., /admin/blog/new)
            const isActive = item.href === '/admin' 
              ? pathname === '/admin' 
              : pathname.startsWith(item.href) && (
                  // prevent /admin/blog matching /admin/blog/categories
                  item.href === '/admin/blog' ? !pathname.includes('/categories') && !pathname.includes('/tags') : true
                )

            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-amber-500 text-slate-900' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout area */}
        <div className="p-4 border-t border-slate-800 mt-auto">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden min-h-[calc(100vh-64px)] md:min-h-screen">
        {children}
      </main>
    </div>
  )
}
