'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Video Background placeholder - cinematic dark feel */}
      <div className="absolute inset-0 bg-charcoal">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, #1C1C1C 0%, #0A0A0A 60%, #000000 100%)',
          }}
        />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 video-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Gold Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 200 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-gold-royal to-transparent mb-10"
        />

        {/* Main Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-3xl sm:text-4xl md:text-[56px] font-bold leading-tight text-ice-white mb-4"
        >
          WEEKS. NOT HOURS.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display text-3xl sm:text-4xl md:text-[56px] font-bold leading-tight gradient-gold-text mb-8"
        >
          LEGACY. NOT TRENDS.
        </motion.h2>

        {/* Gold Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 200 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-gold-royal to-transparent mb-12"
        />

        {/* Body Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-[700px] space-y-3 mb-12"
        >
          <p className="font-sans text-base lg:text-lg text-[#AAAAAA] leading-relaxed">
            Every ring: 48&ndash;72 hours of human hands.
          </p>
          <p className="font-sans text-base lg:text-lg text-[#AAAAAA] leading-relaxed">
            Every setting: Individually engineered.
          </p>
          <p className="font-sans text-base lg:text-lg text-[#AAAAAA] leading-relaxed">
            Every stone: Personally inspected under 10x magnification.
          </p>
          <p className="font-headline text-xl italic text-gold-whisper mt-6">
            Because machines don&rsquo;t understand legacy.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link
            href="/about"
            className="hero-cta inline-flex items-center justify-center px-8 py-4 border-2 border-gold-royal bg-transparent text-white font-tech text-[13px] tracking-[3px] transition-all duration-500 hover:bg-gold-royal hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] group"
          >
            WATCH OUR PROCESS
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
              &#8594;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
