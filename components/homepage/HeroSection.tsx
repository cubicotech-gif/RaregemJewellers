'use client'

import { Button } from '@/components/ui/button-luxury'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80"
          alt="Luxury men's engagement ring"
          fill
          className="object-cover opacity-40"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/60 to-brand-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span className="text-sm text-brand-gold uppercase tracking-wider font-semibold">
            Rare Gems • Handcrafted • Lifetime Warranty
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-brand-cream mb-6 text-shadow-gold uppercase tracking-tight">
          Forge Your
          <span className="block gradient-gold-text">Forever</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-12 leading-relaxed">
          Your commitment deserves more than ordinary. Discover engagement rings
          featuring rare gems as unique as your love story.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/shop">
            <Button variant="gold" size="xl" className="group">
              Discover Your Ring
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/custom">
            <Button variant="outline" size="xl">
              Custom Design
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 pt-12 border-t border-brand-gold/20">
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold mb-2">
              500+
            </div>
            <div className="text-sm text-brand-gray uppercase tracking-wider">
              Rare Gems
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold mb-2">
              2,000+
            </div>
            <div className="text-sm text-brand-gray uppercase tracking-wider">
              Happy Couples
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold mb-2">
              25+
            </div>
            <div className="text-sm text-brand-gray uppercase tracking-wider">
              Countries
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-brand-gold/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-brand-gold rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
