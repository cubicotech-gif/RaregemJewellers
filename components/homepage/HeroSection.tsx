'use client'

import { Button } from '@/components/ui/button-luxury'
import { ArrowRight, Play, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [heroMedia, setHeroMedia] = useState<{ type: 'video' | 'image'; url: string } | null>(null)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setLoaded(true)
    fetchHeroMedia()
  }, [])

  async function fetchHeroMedia() {
    try {
      const { data } = await supabase
        .from('store_settings')
        .select('setting_value')
        .eq('setting_key', 'hero_media')
        .single()

      if (data?.setting_value) {
        setHeroMedia(data.setting_value)
      }
    } catch {
      // Fallback to default image
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  return (
    <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background Media — Video or Image */}
      <div className="absolute inset-0 z-0">
        {heroMedia?.type === 'video' ? (
          <video
            ref={videoRef}
            src={heroMedia.url}
            autoPlay
            loop
            muted={muted}
            playsInline
            className="video-bg scale-105"
          />
        ) : (
          <Image
            src={heroMedia?.url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=90"}
            alt="Luxury engagement rings on dark velvet"
            fill
            className="object-cover scale-105"
            priority
            quality={95}
          />
        )}

        {/* Cinematic Multi-Layer Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-kronos-black/70 via-kronos-black/30 to-kronos-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-kronos-black/60 via-transparent to-kronos-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.85)_100%)]" />
        {/* Gold ambient light from top */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(212,175,55,0.08),transparent_60%)]" />
        {/* Film grain */}
        <div className="grain-overlay absolute inset-0" />
      </div>

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-kronos-gold/30 rounded-full animate-particle-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-kronos-gold/20 rounded-full animate-particle-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-kronos-gold/25 rounded-full animate-particle-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-0.5 h-0.5 bg-kronos-gold/20 rounded-full animate-particle-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Video Mute Toggle */}
      {heroMedia?.type === 'video' && (
        <button
          onClick={toggleMute}
          className="absolute bottom-24 right-8 z-20 p-3 glass-effect hover:bg-kronos-gold/10 transition-all duration-300 group"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-kronos-muted group-hover:text-kronos-gold transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-kronos-gold" />
          )}
        </button>
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-[1.2s] ease-luxury ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Decorative Top Element */}
        <div className="flex items-center justify-center gap-5 mb-12">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-kronos-gold/50" />
          <div className="w-1.5 h-1.5 bg-kronos-gold rotate-45" />
          <span className="text-[11px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.4em]">
            Rare Gemstone Jewellers
          </span>
          <div className="w-1.5 h-1.5 bg-kronos-gold rotate-45" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-kronos-gold/50" />
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold text-kronos-white mb-3 leading-[0.92] tracking-tight text-shadow-dark">
          Forged For
        </h1>
        <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold mb-8 leading-[0.92] tracking-tight gradient-gold-text-animated">
          Eternity
        </h1>

        {/* Subheadline with elegant line */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-lg md:text-xl text-kronos-cream/70 font-sans font-light leading-relaxed tracking-wide">
            Rare gemstones. Master craftsmanship. Rings as exceptional
            as the bond they represent.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/shop">
            <Button variant="filled" size="xl" className="group min-w-[240px] shadow-gold">
              Explore Collection
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="xl" className="min-w-[240px] border-kronos-gold/30 hover:border-kronos-gold/60">
              Our Craft
            </Button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-28">
          {[
            { value: '500+', label: 'Rare Gems' },
            { value: '2,000+', label: 'Happy Couples' },
            { value: '25+', label: 'Countries' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${800 + i * 200}ms` }}
            >
              <div className="text-2xl md:text-3xl font-display font-bold text-kronos-gold mb-1 text-shadow-elegant">
                {stat.value}
              </div>
              <div className="text-[10px] text-kronos-muted uppercase tracking-[0.25em] font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-[1.5s] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] text-kronos-muted/40 uppercase tracking-[0.3em] font-sans">Discover</span>
          <div className="w-px h-10 bg-gradient-to-b from-kronos-gold/40 to-transparent animate-pulse-gold" />
        </div>
      </div>

      {/* Bottom gold line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kronos-gold/20 to-transparent z-10" />
    </section>
  )
}
