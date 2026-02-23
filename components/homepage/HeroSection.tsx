'use client'

import { Button } from '@/components/ui/button-luxury'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=85"
          alt="Dramatic men's engagement ring on dark velvet"
          fill
          className="object-cover scale-105"
          priority
          quality={90}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-kronos-black/60 via-kronos-black/40 to-kronos-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-kronos-black/50 via-transparent to-kronos-black/50"></div>
        {/* Subtle gold vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,13,13,0.8)_100%)]"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-kronos-gold/40"></div>
          <span className="text-xs font-sans font-semibold text-kronos-gold uppercase tracking-[0.3em]">
            Men&apos;s Engagement Rings
          </span>
          <div className="w-12 h-px bg-kronos-gold/40"></div>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-kronos-white mb-4 leading-[0.95] tracking-tight">
          Forged For
        </h1>
        <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 leading-[0.95] tracking-tight gradient-gold-text">
          Eternity
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-kronos-muted max-w-2xl mx-auto mb-14 leading-relaxed font-sans font-light">
          Rare gemstones. Master craftsmanship. Rings as exceptional
          as the bond they represent.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/shop">
            <Button variant="filled" size="xl" className="group min-w-[220px]">
              Explore Collection
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="xl" className="min-w-[220px]">
              Our Craft
            </Button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-24">
          {[
            { value: '500+', label: 'Rare Gems' },
            { value: '2,000+', label: 'Happy Couples' },
            { value: '25+', label: 'Countries' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-kronos-gold mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] text-kronos-muted uppercase tracking-[0.2em] font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-kronos-muted/50 uppercase tracking-[0.2em] font-sans">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-kronos-gold/50 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
