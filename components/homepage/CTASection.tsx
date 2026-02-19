import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-32 lg:py-40 bg-obsidian overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[500px] bg-gold-royal/[0.03] rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-10 h-px bg-gold-royal/60" />
              <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">
                Begin Your Journey
              </span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-cormorant font-light text-ivory/90 leading-[1.05] mb-8">
              Your Story Deserves
              <br />
              <span className="font-semibold gradient-gold-text">A Rare Gem</span>
            </h2>

            <p className="text-base text-ivory/35 leading-relaxed font-sans font-light max-w-lg mb-12">
              Every ring tells a story. Let us help you find something as rare
              and meaningful as your commitment.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/vault"
                className="group glass-rose px-10 py-4 inline-flex items-center gap-4 hover:bg-gold-royal/10 transition-all duration-500">
                <span className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/90">Explore The Vault</span>
                <ArrowRight className="w-4 h-4 text-gold-royal group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
              <Link href="/contact"
                className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/35 hover:text-gold-royal transition-colors duration-500">
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Right — Trust */}
          <div className="lg:col-span-5">
            <div className="space-y-0">
              {[
                { val: 'Free', label: 'Worldwide Shipping', desc: 'Fully insured delivery' },
                { val: '30', label: 'Day Returns', desc: 'No questions asked' },
                { val: 'GIA', label: 'Certified Gems', desc: 'Every stone verified' },
                { val: '∞', label: 'Lifetime Warranty', desc: 'Guaranteed forever' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 py-7 border-b border-white/[0.04]
                                      hover:border-gold-royal/10 transition-colors duration-500">
                  <span className="text-2xl font-cormorant font-semibold text-gold-royal/60 min-w-[70px]">
                    {item.val}
                  </span>
                  <div>
                    <p className="text-xs font-sans font-medium text-ivory/60 tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-[11px] text-ivory/25 font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
