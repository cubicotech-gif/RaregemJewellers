import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata: Metadata = {
  title: 'Rare Gems Jewelry - Exquisite Collection for Men & Women',
  description: 'Discover our exclusive collection of rare gemstone jewelry. Premium quality rings, necklaces, and accessories for both men and women.',
  keywords: 'rare gems, jewelry, gemstones, men jewelry, women jewelry, luxury accessories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
