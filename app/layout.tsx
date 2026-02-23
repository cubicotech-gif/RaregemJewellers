import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KRONOS - Men\'s Engagement Rings | Rare Gems Jewelry',
  description: 'Discover KRONOS - premium men\'s engagement rings featuring rare sapphires, emeralds, rubies, and diamonds. Handcrafted luxury for the modern man.',
  keywords: 'KRONOS, mens engagement rings, luxury jewelry, sapphire rings, emerald rings, ruby rings, diamond rings, mens rings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
