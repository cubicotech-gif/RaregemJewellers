'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HERO_WORDS = ['Legacy', 'Power', 'Rarity', 'Forever']

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % HERO_WORDS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-end pb-20 lg:pb-32 overflow-hidden bg-black">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[800px] bg-gold-royal/[0.03] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2
                      bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Decorative Side Lines */}
      <div className="hidden lg:block absolute left-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-royal/20 to-transparent" />
      <div className="hidden lg:block absolute right-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-royal/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Top Eyebrow */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-px bg-gold-royal" />
          <span className="text-[11px] font-medium tracking-[6px] uppercase text-gold-royal">
            Rare Legacy Jewellers
          </span>
        </div>

        {/* Main Headline - Dramatic Large Typography inspired by Frank Jewelry */}
        <div className="mb-12">
          <h1 className="font-playfair text-[clamp(3rem,10vw,9rem)] font-bold text-white leading-[0.95] tracking-tight">
            Jewellery
            <br />
            <span className="text-white/20">For The</span>
            <br />
            <span className="relative inline-block">
              <span className="gradient-gold-text">{HERO_WORDS[currentWord]}</span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gold-royal/40" />
            </span>
          </h1>
        </div>

        {/* Bottom Row - Description + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Description */}
          <div className="lg:col-span-5">
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed font-cormorant italic mb-8">
              Investment-grade gemstone rings handcrafted for the modern man.
              Kashmir sapphires, Burmese rubies, Colombian emeralds &mdash;
              each piece a legacy in the making.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vault"
                className="group inline-flex items-center gap-3 px-10 py-5
                         bg-gold-royal hover:bg-gold-light transition-all duration-500"
              >
                <span className="text-[12px] font-bold tracking-[3px] uppercase text-black">
                  Explore The Vault
                </span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5
                         border border-white/20 hover:border-gold-royal/50 transition-all duration-500"
              >
                <span className="text-[12px] font-bold tracking-[3px] uppercase text-white/80
                             group-hover:text-gold-royal transition-colors">
                  Book Consultation
                </span>
              </Link>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Stats */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl lg:text-4xl font-playfair font-bold text-gold-royal">16</p>
              <p className="text-[10px] tracking-[2px] uppercase text-white/40 mt-2">Rare Pieces</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-playfair font-bold text-gold-royal">7</p>
              <p className="text-[10px] tracking-[2px] uppercase text-white/40 mt-2">Gemstones</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-playfair font-bold text-gold-royal">GIA</p>
              <p className="text-[10px] tracking-[2px] uppercase text-white/40 mt-2">Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[3px] uppercase text-white/30">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-royal/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
