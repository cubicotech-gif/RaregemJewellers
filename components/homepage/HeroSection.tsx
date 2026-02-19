'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const WORDS = ['Timeless', 'Rare', 'Yours']

export function HeroSection() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length)
        setVisible(true)
      }, 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-obsidian">
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full
                      bg-gold-royal/[0.04] blur-[180px] animate-glow" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full
                      bg-gold-royal/[0.03] blur-[150px] animate-glow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[300px] h-[300px] rounded-full
                      bg-white/[0.01] blur-[100px]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.015]"
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-5 mb-12">
            <div className="w-10 h-px bg-gold-royal/60" />
            <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">
              Rare Gem Jewellers
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-10">
            <span className="block text-[clamp(2.8rem,8vw,7rem)] font-cormorant font-light text-ivory/90 leading-[1] tracking-[-0.03em]">
              Something
            </span>
            <span className={`block text-[clamp(2.8rem,8vw,7rem)] font-cormorant font-semibold leading-[1] tracking-[-0.03em]
                           gradient-gold-text transition-all duration-500
                           ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {WORDS[idx]}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-ivory/35 leading-relaxed max-w-md mb-14 font-sans font-light">
            Investment-grade gemstone rings handcrafted for those who
            seek what cannot be replicated. Kashmir sapphires, Burmese
            rubies, Colombian emeralds.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <Link
              href="/vault"
              className="group glass-rose px-10 py-4 inline-flex items-center gap-4
                       hover:bg-gold-royal/10 transition-all duration-500"
            >
              <span className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/90">
                Explore Collection
              </span>
              <ArrowRight className="w-4 h-4 text-gold-royal group-hover:translate-x-1.5 transition-transform duration-500" />
            </Link>

            <Link
              href="/contact"
              className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/35
                       hover:text-gold-royal transition-colors duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6">
          <div className="flex items-center justify-between text-ivory/20 text-[10px] tracking-[3px] uppercase font-sans">
            <span>GIA Certified</span>
            <span className="hidden sm:inline">Lifetime Warranty</span>
            <span className="hidden md:inline">Free Insured Shipping</span>
            <span>Est. 2000</span>
          </div>
        </div>
      </div>
    </section>
  )
}
