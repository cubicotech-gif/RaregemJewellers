'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, RotateCcw, Sparkles, Truck, Package, ArrowLeftRight } from 'lucide-react'

const guarantees = [
  {
    icon: Shield,
    title: 'GIA CERTIFIED',
    description:
      'Every stone comes with laboratory certification. No exceptions. No compromises.',
  },
  {
    icon: RotateCcw,
    title: 'BUY-BACK AT 80%',
    description:
      'Changed your mind? We buy back at 80% purchase price within 12 months.',
  },
  {
    icon: Sparkles,
    title: 'LIFETIME POLISH',
    description:
      "Bring it back. We'll restore the shine. Forever. No questions asked.",
  },
]

const extras = [
  { icon: Truck, text: 'Insured International Shipping' },
  { icon: Package, text: 'Discreet, Unmarked Packaging' },
  { icon: ArrowLeftRight, text: '30-Day Size Exchange' },
]

export function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-void-black gold-pattern"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-display font-bold text-ice-white mb-3">
            OUR WORD IS BINDING.
          </h2>
          <p className="font-headline text-xl italic text-gold-whisper/80 tracking-wider">
            Backed by gemological science.
          </p>
        </motion.div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {guarantees.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              className="guarantee-card border border-white/10 bg-obsidian/50 p-8 lg:p-10 text-center"
            >
              <item.icon className="w-10 h-10 text-gold-royal mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="font-accent text-lg tracking-[2px] text-ice-white mb-4">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-[#AAAAAA] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extra Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {extras.map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <item.icon className="w-4 h-4 text-gold-royal/70" strokeWidth={1.5} />
              <span className="font-sans text-sm text-white/60 tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
