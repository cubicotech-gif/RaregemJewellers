'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-void-black"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 40%, #0A0A0A 0%, #000000 100%)',
        }}
      />

      <motion.div
        style={{ opacity: mounted ? opacity : 1 }}
        className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10"
      >
        <div className="flex flex-col lg:flex-row items-center h-full pt-32 lg:pt-0">
          {/* LEFT: Product Image (55%) */}
          <motion.div
            style={{ y: mounted ? imageY : 0 }}
            className="relative w-full lg:w-[55%] h-[45vh] lg:h-full flex items-center justify-center"
          >
            {/* Gemstone Glow */}
            <div
              className="gemstone-glow w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
              style={{
                background: 'radial-gradient(circle, rgba(103,58,183,0.4), transparent)',
                top: '30%',
                left: '20%',
              }}
            />

            {/* Product Image */}
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90"
                alt="5.2 CT AAA Tanzanite Solitaire Ring on black velvet"
                fill
                className="object-contain animate-subtle-float"
                style={{
                  filter: 'contrast(1.15) brightness(1.1)',
                }}
                priority
                quality={90}
              />
              {/* Gold rim glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 100px rgba(212,175,55,0.08)',
                  borderRadius: '50%',
                }}
              />
            </div>
          </motion.div>

          {/* RIGHT: Content (45%) */}
          <motion.div
            style={{ y: mounted ? textY : 0 }}
            className="relative w-full lg:w-[45%] flex flex-col justify-center lg:pl-12 pb-20 lg:pb-0"
          >
            {/* Gold Accent Line */}
            <div className="hidden lg:block w-16 h-px bg-gold-royal mb-8" />

            {/* Sub-label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-tech text-sm text-gold-royal tracking-[5px] mb-8 lg:mb-10"
            >
              ALPHA STONES
            </motion.span>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-5xl sm:text-6xl lg:text-[82px] font-bold leading-[1.1] mb-6 gradient-white-text text-shadow-dark"
            >
              5.2 CT AAA
              <br />
              TANZANITE
              <br />
              SOLITAIRE
            </motion.h2>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-headline text-lg italic text-gold-whisper mb-8"
            >
              &ldquo;When &lsquo;rare&rsquo; actually means rare.&rdquo;
            </motion.p>

            {/* Specs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-1 mb-6"
            >
              {['18K White Gold', 'Hand-Forged', 'GIA Certified'].map((spec) => (
                <p
                  key={spec}
                  className="font-sans text-[15px] text-[#CCCCCC] tracking-[0.5px] leading-8"
                >
                  {spec}
                </p>
              ))}
            </motion.div>

            {/* Rarity Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="font-accent text-base text-gold-royal tracking-[2px] shimmer-text mb-8"
            >
              1 of 7 Worldwide
            </motion.p>

            {/* Price */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="font-display text-4xl font-semibold text-gold-empire mb-10"
            >
              FROM $24,500
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <Link
                href="/shop"
                className="hero-cta inline-flex items-center justify-center w-[240px] h-[60px] border-2 border-gold-royal bg-transparent text-white font-tech text-[13px] tracking-[3px] transition-all duration-500 hover:bg-gold-royal hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] group"
              >
                CLAIM YOURS
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                  &#8594;
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[12px] tracking-[3px] text-white/50 font-tech uppercase">
          SCROLL TO WITNESS
        </span>
        <span className="text-2xl text-white/50 animate-bounce-slow scroll-indicator-chevron">
          &#8964;
        </span>
      </div>
    </section>
  )
}
