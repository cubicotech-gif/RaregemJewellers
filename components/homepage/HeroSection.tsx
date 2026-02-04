'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80"
          alt="Luxury men's engagement ring"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-white/60 via-luxury-white/40 to-luxury-white/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-3 bg-luxury-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-champagne/20">
          <span className="text-champagne text-sm font-semibold uppercase tracking-wider font-body">
            Free Shipping • Lifetime Warranty • GIA Certified
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-7xl md:text-8xl font-bold uppercase tracking-tight mb-6">
          <span className="block text-luxury-black">Forge Your</span>
          <span className="block text-champagne">Forever</span>
        </h1>

        {/* Subheading */}
        <p className="font-body text-xl md:text-2xl text-warm-gray max-w-2xl mx-auto leading-relaxed mb-12">
          Your commitment deserves more than ordinary. Discover engagement rings with rare gems as unique as your love story.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Discover Your Ring
            </Button>
          </Link>
          <Link href="/custom-design">
            <Button variant="secondary" size="lg">
              Custom Design
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-champagne/20">
          <div className="text-center">
            <div className="font-heading text-4xl font-bold text-champagne mb-1">
              500+
            </div>
            <div className="font-body text-sm text-warm-gray uppercase tracking-wider">
              Rare Gems
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-4xl font-bold text-champagne mb-1">
              2,000+
            </div>
            <div className="font-body text-sm text-warm-gray uppercase tracking-wider">
              Happy Couples
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-4xl font-bold text-champagne mb-1">
              25+
            </div>
            <div className="font-body text-sm text-warm-gray uppercase tracking-wider">
              Countries
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-champagne/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-champagne rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
