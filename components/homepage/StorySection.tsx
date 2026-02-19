import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function StorySection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px]
                    bg-gold-royal/[0.02] rounded-full blur-[200px] -translate-y-1/2" />

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left - Image / Visual */}
          <div className="relative">
            {/* Main Visual Block */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-steel via-obsidian to-black
                          border border-white/5 overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[200px] opacity-10 group-hover:opacity-20
                             transition-all duration-700 select-none">💎</span>
              </div>

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-[10px] tracking-[3px] uppercase text-gold-royal mb-2">Est. 2000</p>
                <p className="text-3xl font-playfair font-bold text-white">25+ Years</p>
                <p className="text-sm text-white/50 mt-1">Of master craftsmanship</p>
              </div>

              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-royal/5 to-transparent
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-gold-royal p-6 max-w-[220px]">
              <p className="text-3xl font-playfair font-bold text-black mb-1">$400K+</p>
              <p className="text-[11px] text-black/70 tracking-wider">
                Current vault inventory value
              </p>
            </div>
          </div>

          {/* Right - Text Content */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gold-royal" />
              <span className="text-[11px] tracking-[4px] uppercase text-gold-royal">Our Story</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-8 leading-tight">
              Your Love Story
              <br />
              <span className="text-white/30">Deserves A Rare Gem</span>
            </h2>

            <div className="space-y-6 mb-12">
              <p className="text-lg text-white/60 leading-relaxed font-cormorant italic">
                For over 25 years, we&apos;ve travelled the world seeking the rarest gemstones
                for men who refuse to settle for ordinary. Each alexandrite, tanzanite,
                and paraiba tourmaline represents months of careful sourcing.
              </p>
              <p className="text-lg text-white/60 leading-relaxed font-cormorant italic">
                We believe your ring should be as unique as your commitment.
                That&apos;s why we specialize in rare gems that change colour,
                catch light, and tell a story no diamond ever could.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/5 mb-10">
              <div>
                <p className="text-2xl font-playfair font-bold text-gold-royal">500+</p>
                <p className="text-[10px] tracking-[2px] uppercase text-white/40 mt-1">Rare Gems</p>
              </div>
              <div>
                <p className="text-2xl font-playfair font-bold text-gold-royal">100%</p>
                <p className="text-[10px] tracking-[2px] uppercase text-white/40 mt-1">Certified</p>
              </div>
              <div>
                <p className="text-2xl font-playfair font-bold text-gold-royal">Lifetime</p>
                <p className="text-[10px] tracking-[2px] uppercase text-white/40 mt-1">Warranty</p>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-[12px] font-bold
                       tracking-[3px] uppercase text-gold-royal hover:text-gold-light transition-colors"
            >
              Read Our Full Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
