import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function StorySection() {
  return (
    <section className="py-32 lg:py-40 bg-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px]
                    bg-gold-royal/[0.02] rounded-full blur-[200px] -translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] bg-steel overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[180px] opacity-10 group-hover:opacity-20
                             transition-all duration-1000 select-none">💎</span>
              </div>
              <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-obsidian/95 to-transparent">
                <p className="text-[10px] font-sans tracking-[3px] uppercase text-gold-royal/70 mb-2">Est. 2000</p>
                <p className="text-3xl font-cormorant font-semibold text-ivory/80">25+ Years</p>
                <p className="text-sm text-ivory/30 font-sans font-light mt-1">Of master craftsmanship</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-10 glass-rose p-6 max-w-[200px]">
              <p className="text-2xl font-cormorant font-semibold text-ivory mb-1">$400K+</p>
              <p className="text-[10px] text-ivory/50 font-sans tracking-wider">Current vault inventory</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div className="w-10 h-px bg-gold-royal/60" />
              <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">Our Story</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-cormorant font-light text-ivory/90 leading-[1.1] mb-10">
              A Life&apos;s Work In<br />
              <span className="font-semibold text-ivory/40">Rare Stones</span>
            </h2>

            <div className="space-y-6 mb-14">
              <p className="text-base text-ivory/35 leading-relaxed font-sans font-light">
                For over 25 years, we&apos;ve travelled the world seeking the rarest gemstones
                for those who refuse to settle for ordinary. Each alexandrite, tanzanite,
                and paraiba tourmaline represents months of careful sourcing.
              </p>
              <p className="text-base text-ivory/35 leading-relaxed font-sans font-light">
                Your ring should be as unique as your commitment. That&apos;s why we
                specialize in rare gems that change colour, catch light, and tell
                a story no diamond ever could.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/[0.04] mb-10">
              {[
                { val: '500+', label: 'Rare Gems' },
                { val: '100%', label: 'Certified' },
                { val: 'Lifetime', label: 'Warranty' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-cormorant font-semibold text-gold-royal/80">{s.val}</p>
                  <p className="text-[9px] font-sans tracking-[2px] uppercase text-ivory/25 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href="/about"
              className="group inline-flex items-center gap-3 text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/35 hover:text-gold-royal transition-colors duration-500">
              Read Our Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
