'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import { CustomCursor } from './CustomCursor'
import { ScrollProgress } from './ScrollProgress'

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
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }

  // Regular routes get navbar and footer with proper header spacing
  // Header total = 32px top bar + 96px main = 128px
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen" style={{ paddingTop: '128px' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
