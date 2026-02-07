'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-[80vh] bg-void-black"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl lg:text-display font-bold text-ice-white mb-6"
        >
          READY TO MAKE HISTORY?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans text-lg text-[#AAAAAA] leading-relaxed mb-12"
        >
          Book a private consultation. See the stones.
          <br />
          Touch the legacy. Claim your place among legends.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/contact"
            className="hero-cta inline-flex items-center justify-center px-8 py-4 border-2 border-gold-royal bg-gold-royal text-void-black font-tech text-[13px] tracking-[3px] transition-all duration-500 hover:bg-transparent hover:text-gold-royal hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] group"
          >
            SCHEDULE VIEWING
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
              &#8594;
            </span>
          </Link>
          <Link
            href="/shop"
            className="hero-cta inline-flex items-center justify-center px-8 py-4 border-2 border-gold-royal bg-transparent text-white font-tech text-[13px] tracking-[3px] transition-all duration-500 hover:bg-gold-royal hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] group"
          >
            BROWSE VAULT
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
              &#8594;
            </span>
          </Link>
        </motion.div>

        {/* VIP Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="font-sans text-sm text-white/40 mb-1">
            Or call our VIP line: <span className="text-gold-whisper">+92-XXX-XXXXXXX</span>
          </p>
          <p className="font-tech text-[11px] tracking-[2px] text-white/30">
            AVAILABLE 7 DAYS, 10 AM - 10 PM PKT
          </p>
        </motion.div>
      </div>
    </section>
  )
}
