'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, Shield, Clock, Star, ChevronDown, Sparkles } from 'lucide-react'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  const specs = [
    '18K White Gold, Hand-Forged Setting',
    'GIA Certified Natural Tanzanite',
    '48-72 Hours of Master Craftsmanship',
    'Lifetime Polish & Maintenance',
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-void-black flex items-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 35% 40%, #0A0A0A 0%, #000000 100%)',
          }}
        />
        {/* Subtle noise */}
        <div className="absolute inset-0 noise-overlay" />
        {/* Gold glow accent - top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-royal/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      </div>

      {/* Content Container */}
      <motion.div
        style={{ opacity: mounted ? opacity : 1 }}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center pt-32 lg:pt-8">
          {/* LEFT: IMAGE SIDE */}
          <motion.div
            style={{ y: mounted ? imageY : 0 }}
            className="relative order-1"
          >
            <div className="relative aspect-square max-w-[600px] mx-auto">
              {/* Glow effect behind product */}
              <div className="absolute inset-0 scale-110 blur-3xl opacity-30">
                <div
                  className="w-full h-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(103,58,183,0.5), transparent 70%)',
                  }}
                />
              </div>

              {/* Product image */}
              <div className="relative z-10 group">
                <Image
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90"
                  alt="5.2 CT AAA Tanzanite Solitaire Ring"
                  fill
                  className="object-contain transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: 'contrast(1.15) brightness(1.1) drop-shadow(0 0 80px rgba(103,58,183,0.3))',
                  }}
                  priority
                  quality={90}
                />

                {/* Sparkle effects */}
                <div className="absolute top-[20%] left-[15%] sparkle" />
                <div className="absolute top-[60%] right-[20%] sparkle sparkle-delay-1" />
                <div className="absolute bottom-[25%] left-[25%] sparkle sparkle-delay-2" />
              </div>

              {/* Rarity badge - floating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute top-8 -right-2 lg:right-0 bg-blood-red px-4 py-2 rounded-full shadow-[0_8px_32px_rgba(139,0,0,0.4)] z-20"
              >
                <span className="text-white text-[10px] font-tech font-bold tracking-[2px]">
                  1 OF 7 WORLDWIDE
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: TEXT SIDE */}
          <motion.div
            style={{ y: mounted ? contentY : 0 }}
            className="order-2 lg:pl-4 space-y-7"
          >
            {/* Pre-heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-px bg-gold-royal" />
              <span className="text-[11px] font-tech font-medium tracking-[4px] uppercase text-gold-royal">
                ALPHA STONES
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.15] font-display font-bold tracking-tight text-white">
                Tanzanite
                <br />
                <span className="gradient-gold-text">Majesty</span>
              </h2>

              <p className="text-[16px] sm:text-[20px] font-accent font-semibold tracking-wide text-white/90 uppercase">
                5.2 CT AAA-GRADE SOLITAIRE
              </p>
            </motion.div>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-headline text-base leading-relaxed italic text-gold-whisper/90 max-w-[420px]"
            >
              &ldquo;When &lsquo;rare&rsquo; actually means rare. A gemstone found in only one
              location on Earth, crafted into a legacy you&rsquo;ll pass down for generations.&rdquo;
            </motion.p>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="space-y-3"
            >
              {specs.map((spec) => (
                <div key={spec} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-gold-royal flex-shrink-0" />
                  <span className="font-sans text-[14px] text-white/70 leading-relaxed">
                    {spec}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Rarity Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="inline-flex items-center gap-3 px-6 py-3 border border-gold-royal/30 rounded-full bg-gold-royal/5 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-gold-royal" />
              <span className="text-[14px] font-accent font-semibold tracking-[1.5px] text-gold-royal uppercase">
                Extreme Rarity Verified
              </span>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="pt-2"
            >
              <div className="text-[12px] font-tech tracking-[2px] uppercase text-white/50 mb-2">
                Investment Value
              </div>
              <div className="text-[36px] font-display font-semibold text-gold-royal">
                $24,500
              </div>
              <p className="text-[13px] font-sans text-white/50 mt-1">
                *Price reflects current market rarity. Value appreciation expected.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="/shop"
                className="hero-cta group inline-flex items-center justify-center px-8 py-4 border-2 border-gold-royal bg-transparent text-gold-royal font-tech text-[13px] font-bold tracking-[3px] uppercase transition-all duration-500 hover:bg-gold-royal hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)]"
              >
                CLAIM YOURS
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  &#8594;
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-transparent text-white/80 font-tech text-[13px] font-medium tracking-[2px] uppercase transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                SCHEDULE VIEWING
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="flex flex-wrap items-center gap-6 lg:gap-8 pt-4 border-t border-white/10"
            >
              <div className="flex items-center gap-2 text-white/50">
                <Shield className="w-4 h-4" />
                <span className="text-[11px] font-sans tracking-wide">Insured Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Clock className="w-4 h-4" />
                <span className="text-[11px] font-sans tracking-wide">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Star className="w-4 h-4" />
                <span className="text-[11px] font-sans tracking-wide">GIA Certified</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in-delay">
        <span className="text-[10px] tracking-[3px] text-white/40 font-tech uppercase">
          Scroll to Explore
        </span>
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce-slow" />
      </div>
    </section>
  )
}
