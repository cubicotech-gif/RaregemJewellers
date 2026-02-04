import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rare Gems Jewelry - Men\'s Engagement Rings',
  description: 'Forge your forever with rare gems as unique as your love. Premium men\'s engagement rings featuring alexandrite, tanzanite, and more.',
  keywords: 'rare gems, mens engagement rings, luxury jewelry, alexandrite, tanzanite, mens rings, engagement rings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="font-body antialiased bg-luxury-white text-luxury-black">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
