'use client'

import Sidebar from '@/components/admin/Sidebar'
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Toaster position="top-right" />

      <Sidebar />

      <div className="lg:pl-64 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
