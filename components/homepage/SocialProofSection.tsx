'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const clientPhotos = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
  'https://images.unsplash.com/photo-1611651191254-c1e6c5d0e92d?w=400&q=80',
  'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80',
  'https://images.unsplash.com/photo-1603561596112-0a132b757a32?w=400&q=80',
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80',
]

const testimonial = {
  quote:
    'After 3 months of searching, I found RARE LEGACY. The Tanzanite? Flawless. The setting? Art. She said yes before I finished kneeling.',
  name: 'ABDULLAH K.',
  location: 'DUBAI',
}

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-obsidian"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl sm:text-4xl lg:text-display font-bold text-ice-white text-center mb-16"
        >
          LEGENDS RECOGNIZE LEGENDS
        </motion.h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-16">
          {clientPhotos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={src}
                alt={`Client ring photo ${i + 1}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gold-royal/0 group-hover:bg-gold-royal/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-[700px] mx-auto text-center"
        >
          <p className="font-headline text-xl lg:text-2xl italic text-gold-whisper leading-relaxed mb-6">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <p className="font-tech text-sm tracking-[3px] text-white/60">
            &mdash; {testimonial.name}, {testimonial.location}
          </p>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <span className="font-tech text-sm tracking-[2px] text-gold-royal">
            @RARELEGACY_PK
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold-royal/50 text-gold-royal text-[11px] font-tech tracking-[2px] transition-all duration-400 hover:bg-gold-royal hover:text-void-black"
          >
            FOLLOW FOR LEGACY
          </a>
        </motion.div>
      </div>
    </section>
  )
}
