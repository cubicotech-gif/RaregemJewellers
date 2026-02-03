'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { adminAuth } from '@/lib/admin-auth'
import Sidebar from '@/components/admin/Sidebar'
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const session = adminAuth.getSession()

      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login')
        return
      }

      if (session && pathname === '/admin/login') {
        router.push('/admin')
        return
      }

      setIsAuthenticated(!!session)
      setLoading(false)
    }

    checkAuth()

    // Re-check auth every minute
    const interval = setInterval(checkAuth, 60000)

    return () => clearInterval(interval)
  }, [router, pathname])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Login page (no sidebar)
  if (pathname === '/admin/login') {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
    )
  }

  // Admin pages with sidebar
  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Toaster position="top-right" />

      <Sidebar />

      <div className="lg:pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
