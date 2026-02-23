'use client'

import { Button } from '@/components/ui/button-luxury'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function StorySection() {
  const [storyImage, setStoryImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMedia() {
      try {
        const { data } = await supabase
          .from('store_settings')
          .select('setting_value')
          .eq('setting_key', 'story_section_image')
          .single()
        if (data?.setting_value?.url) {
          setStoryImage(data.setting_value.url)
        }
      } catch {
        // Use default
      }
    }
    fetchMedia()
  }, [])

  return (
    <section className="py-[120px] bg-kronos-black relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.04),transparent_50%)]" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxury group">
              <Image
                src={storyImage || "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&q=80"}
                alt="Master craftsman creating a ring at jeweler's bench"
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              {/* Subtle gold border overlay */}
              <div className="absolute inset-0 border border-kronos-gold/10 group-hover:border-kronos-gold/20 transition-all duration-700" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-kronos-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 surface-luxury border-kronos-gold/15 p-8 max-w-[240px] shadow-elegant">
              <div className="text-3xl font-display font-bold gradient-gold-text mb-2">
                25+ Years
              </div>
              <p className="text-sm text-kronos-muted font-sans leading-relaxed">
                Of master craftsmanship and rare gem sourcing worldwide
              </p>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-kronos-gold/15" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-kronos-gold/10" />
          </div>

          {/* Text Side */}
          <div className="lg:pl-8">
            {/* Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-gradient-to-r from-kronos-gold to-kronos-gold/30" />
              <span className="text-[11px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.35em]">
                Our Story
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-display font-semibold text-kronos-white mb-8 tracking-tight leading-[1.1]">
              Where Heritage
              <span className="block gradient-gold-text">Meets Mastery</span>
            </h2>

            <p className="text-base text-kronos-white/75 mb-6 font-sans leading-[1.85]">
              For over 25 years, we have traveled the world seeking the rarest gemstones
              for men who refuse to settle for ordinary. Each alexandrite, tanzanite,
              and paraiba tourmaline in our collection represents months of careful
              sourcing and selection.
            </p>

            <p className="text-base text-kronos-white/75 mb-10 font-sans leading-[1.85]">
              We believe your engagement ring should be as unique as your commitment.
              That is why we specialize in rare gems that change color, catch light,
              and tell a story no diamond ever could.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-8 py-8 border-y border-kronos-gold/10 mb-10">
              {[
                { value: '500+', label: 'Rare Gems' },
                { value: '100%', label: 'Certified' },
                { value: 'Lifetime', label: 'Warranty' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-display font-bold text-kronos-gold mb-1 text-shadow-elegant">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-kronos-muted uppercase tracking-[0.2em] font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="gold" size="lg" className="group">
                Read Our Full Story
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
