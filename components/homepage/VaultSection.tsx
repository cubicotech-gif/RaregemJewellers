'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const collections = [
  {
    name: 'KASHMIR SAPPHIRE',
    tagline: '"The Blue Kings Covet"',
    price: 'FROM $18,500',
    image: 'https://images.unsplash.com/photo-1611651191254-c1e6c5d0e92d?w=800&q=80',
    href: '/shop?gem=sapphire',
  },
  {
    name: 'COLOMBIAN EMERALD',
    tagline: '"Emerald Empire"',
    price: 'FROM $22,000',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
    href: '/shop?gem=emerald',
  },
  {
    name: 'TANZANITE AAA',
    tagline: '"Violet Majesty"',
    price: 'FROM $15,000',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    href: '/shop?gem=tanzanite',
  },
  {
    name: 'PARAIBA TOURMALINE',
    tagline: '"Electric Dreams"',
    price: 'FROM $28,000',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757a32?w=800&q=80',
    href: '/shop?gem=paraiba',
  },
]

export function VaultSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-void-black"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-display font-bold text-ice-white mb-4">
            THE VAULT
          </h2>
          <p className="font-headline text-lg italic text-gold-whisper/80 tracking-wider">
            &ldquo;Rarity. Verified. Vaulted.&rdquo;
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collections.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
            >
              <Link
                href={item.href}
                className="collection-card group block border border-white/10 bg-obsidian overflow-hidden transition-all duration-[600ms] hover:-translate-y-3 hover:border-gold-royal hover:shadow-gold-intense"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Image */}
                <div className="relative h-[65%] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {/* Hover gold gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-royal/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-600" />
                </div>

                {/* Content */}
                <div className="flex flex-col items-center justify-center h-[35%] px-4 py-4">
                  <h3 className="font-tech text-[11px] tracking-[2px] text-white/70 mb-2 text-center">
                    {item.name}
                  </h3>
                  <p className="font-headline text-xl lg:text-2xl italic text-gold-whisper text-center mb-2">
                    {item.tagline}
                  </p>
                  <p className="font-display text-2xl lg:text-[28px] text-gold-empire font-semibold text-center mb-4">
                    {item.price}
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold-royal/50 bg-transparent text-gold-royal text-[11px] font-tech tracking-[2px] transition-all duration-400 group-hover:bg-gold-royal group-hover:text-void-black group-hover:border-gold-royal">
                    EXPLORE
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      &#8594;
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
