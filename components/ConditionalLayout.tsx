'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import { CustomCursor } from './CustomCursor'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  const isHomePage = pathname === '/'

  // Admin routes get no navbar/footer
  if (isAdminRoute) {
    return <>{children}</>
  }

  // Homepage manages its own layout flow (navbar is fixed/overlaid)
  if (isHomePage) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }

  // Regular routes get navbar and footer
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen pt-40">
        {children}
      </main>
      <Footer />
    </>
  )
}
