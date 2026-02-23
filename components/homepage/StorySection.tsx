import { Button } from '@/components/ui/button-luxury'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function StorySection() {
  return (
    <section className="py-[100px] bg-kronos-black relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,110,0.03),transparent_60%)]"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxury">
              <Image
                src="https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&q=80"
                alt="Master craftsman creating a ring at jeweler's bench"
                fill
                className="object-cover"
              />
              {/* Subtle gold border overlay */}
              <div className="absolute inset-0 border border-kronos-gold/10"></div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-kronos-brown border border-kronos-gold/20 p-8 max-w-[240px] shadow-luxury">
              <div className="text-3xl font-display font-bold text-kronos-gold mb-2">
                25+ Years
              </div>
              <p className="text-sm text-kronos-muted font-sans leading-relaxed">
                Of master craftsmanship and rare gem sourcing worldwide
              </p>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t border-l border-kronos-gold/20"></div>
          </div>

          {/* Text Side */}
          <div className="lg:pl-8">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-kronos-gold"></div>
              <span className="text-xs font-sans font-semibold text-kronos-gold uppercase tracking-[0.3em]">
                Our Story
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-semibold text-kronos-white mb-8 tracking-tight leading-[1.1]">
              Where Heritage
              <span className="block text-kronos-gold">Meets Mastery</span>
            </h2>

            <p className="text-base text-kronos-white/80 mb-6 font-sans leading-[1.8]">
              For over 25 years, we have traveled the world seeking the rarest gemstones
              for men who refuse to settle for ordinary. Each alexandrite, tanzanite,
              and paraiba tourmaline in our collection represents months of careful
              sourcing and selection.
            </p>

            <p className="text-base text-kronos-white/80 mb-10 font-sans leading-[1.8]">
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
                  <div className="text-xl font-display font-bold text-kronos-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-kronos-muted uppercase tracking-[0.15em] font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="gold" size="lg" className="group">
                Read Our Full Story
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
