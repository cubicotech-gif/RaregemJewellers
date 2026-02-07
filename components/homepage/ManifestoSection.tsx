'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    value: '< 0.01%',
    label: 'RARITY',
    quote: '"If common exists, we don\'t stock it"',
  },
  {
    value: '72 HOURS',
    label: 'MINIMUM CRAFT',
    quote: '"Rushed is for the common"',
  },
  {
    value: 'LIFETIME',
    label: 'GUARANTEE',
    quote: '"We stand behind legacy"',
  },
  {
    value: 'GIA',
    label: 'CERTIFIED',
    quote: '"Truth in stone"',
  },
]

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 lg:py-0 noise-overlay"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1C1C1C 50%, #0A0A0A 100%)',
      }}
    >
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        {/* Gold Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 120 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-gold-royal to-transparent mx-auto mb-12"
        />

        {/* Main Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-3xl sm:text-4xl md:text-[56px] font-bold leading-tight gradient-gold-text mb-6"
        >
          MASS PRODUCTION IS FOR MASSES.
          <br />
          RARITY IS FOR LEGENDS.
        </motion.h2>

        {/* Gold Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 120 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-gold-royal to-transparent mx-auto mb-12"
        />

        {/* Body Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4 mb-20"
        >
          <p className="font-sans text-lg text-[#AAAAAA] leading-relaxed max-w-[800px] mx-auto">
            The ring on your finger isn&rsquo;t jewelry. It&rsquo;s a statement.
            It&rsquo;s the crystallized promise that you don&rsquo;t settle.
          </p>
          <p className="font-sans text-lg text-[#AAAAAA] leading-relaxed max-w-[800px] mx-auto">
            That when the moment arrived to declare your intentions,
            you chose a stone that took 585 million years to form&mdash;
            not something stamped out in a factory last Tuesday.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.2 }}
              className="border border-white/10 p-6 lg:p-8"
            >
              <span className="block font-accent text-2xl lg:text-3xl text-gold-royal mb-2">
                {stat.value}
              </span>
              <span className="block font-tech text-[11px] tracking-[2px] text-white uppercase mb-4">
                {stat.label}
              </span>
              <span className="block font-headline text-sm italic text-gold-whisper/80">
                {stat.quote}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
