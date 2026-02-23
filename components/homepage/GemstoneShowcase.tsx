'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const collections = [
  {
    name: 'Diamond',
    subtitle: 'Timeless Brilliance',
    color: '#E8E8E8',
    glowColor: 'rgba(232, 232, 232, 0.15)',
    href: '/shop?category=diamond',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    settingsKey: 'gemstone_diamond_image',
  },
  {
    name: 'Sapphire',
    subtitle: 'Royal Blue',
    color: '#2B6BC4',
    glowColor: 'rgba(43, 107, 196, 0.15)',
    href: '/shop?category=sapphire',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    settingsKey: 'gemstone_sapphire_image',
  },
  {
    name: 'Emerald',
    subtitle: 'Verdant Power',
    color: '#26A06F',
    glowColor: 'rgba(38, 160, 111, 0.15)',
    href: '/shop?category=emerald',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
    settingsKey: 'gemstone_emerald_image',
  },
  {
    name: 'Ruby',
    subtitle: 'Crimson Fire',
    color: '#C45656',
    glowColor: 'rgba(196, 86, 86, 0.15)',
    href: '/shop?category=ruby',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80',
    settingsKey: 'gemstone_ruby_image',
  },
]

export function GemstoneShowcase() {
  const [customImages, setCustomImages] = useState<Record<string, string>>({})

  useEffect(() => {
    async function fetchCustomImages() {
      try {
        const keys = collections.map(c => c.settingsKey)
        const { data } = await supabase
          .from('store_settings')
          .select('setting_key, setting_value')
          .in('setting_key', keys)

        if (data) {
          const images: Record<string, string> = {}
          data.forEach(item => {
            if (item.setting_value?.url) {
              images[item.setting_key] = item.setting_value.url
            }
          })
          setCustomImages(images)
        }
      } catch {
        // Use defaults
      }
    }
    fetchCustomImages()
  }, [])

  return (
    <section className="py-[120px] bg-gradient-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.05),transparent_50%)]" />
      <div className="absolute inset-0 particle-bg opacity-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="diamond-ornament max-w-xs mx-auto mb-8">
            <span className="text-[11px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.35em] whitespace-nowrap">
              By Gemstone
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-display font-semibold text-kronos-white mb-5 tracking-tight">
            Choose Your Stone
          </h2>
          <p className="text-lg text-kronos-muted max-w-xl mx-auto font-sans font-light leading-relaxed">
            Each gemstone carries its own story, energy, and unmistakable character.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group block relative"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-kronos-brown hover-gold-glow">
                <Image
                  src={customImages[collection.settingsKey] || collection.image}
                  alt={`${collection.name} collection`}
                  fill
                  className="object-cover transition-all duration-[1s] group-hover:scale-110"
                />
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-kronos-black via-kronos-black/20 to-transparent" />

                {/* Gemstone color accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(ellipse at 50% 80%, ${collection.glowColor}, transparent 60%)` }}
                />

                {/* Color accent line at top */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: collection.color }}
                />

                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-kronos-white mb-1 tracking-wide group-hover:text-kronos-gold transition-colors duration-400">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-kronos-muted font-sans tracking-wider uppercase">
                    {collection.subtitle}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-[10px] text-kronos-gold uppercase tracking-[0.25em] font-sans font-medium">
                      Explore
                    </span>
                    <div className="w-8 h-px bg-gradient-to-r from-kronos-gold to-transparent" />
                  </div>
                </div>

                {/* Border on hover */}
                <div className="absolute inset-0 border border-kronos-gold/0 group-hover:border-kronos-gold/20 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
