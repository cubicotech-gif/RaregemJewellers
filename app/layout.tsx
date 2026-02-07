import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata: Metadata = {
  title: 'RARE LEGACY | Kashmir Sapphire & Tanzanite Engagement Rings | Karachi',
  description: 'Luxury engagement rings featuring the world\'s rarest gemstones. Kashmir sapphires, Colombian emeralds, AAA tanzanite, and Paraiba tourmaline. Hand-forged in Karachi. GIA certified. Where gemstones become heirlooms.',
  keywords: 'rare legacy, kashmir sapphire, tanzanite engagement ring, colombian emerald ring, paraiba tourmaline, luxury engagement rings, rare gemstones, GIA certified, Karachi jeweler, bespoke rings',
  openGraph: {
    title: 'RARE LEGACY | Where Gemstones Become Heirlooms',
    description: 'Luxury engagement rings featuring the world\'s rarest gemstones. Hand-forged. GIA Certified. Karachi.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100..900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
