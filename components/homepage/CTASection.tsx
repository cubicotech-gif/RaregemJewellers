import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-32 lg:py-40 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-royal/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-royal/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] bg-gold-royal/[0.03] rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left - Editorial Typography */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gold-royal" />
              <span className="text-[11px] tracking-[4px] uppercase text-gold-royal">
                Begin Your Journey
              </span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-playfair font-bold text-white leading-[1.05] mb-8">
              Your Love Story
              <br />
              <span className="text-white/20">Deserves</span>
              <br />
              <span className="gradient-gold-text">A Rare Gem</span>
            </h2>

            <p className="text-xl text-white/50 leading-relaxed font-cormorant italic max-w-lg mb-12">
              Every ring tells a story. What&apos;s yours? Let us help you find
              something as rare and meaningful as your commitment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vault"
                className="group inline-flex items-center gap-3 px-10 py-5
                         bg-gold-royal hover:bg-gold-light transition-all duration-500"
              >
                <span className="text-[12px] font-bold tracking-[3px] uppercase text-black">
                  Explore The Vault
                </span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5
                         border border-white/20 hover:border-gold-royal/50 transition-all duration-500"
              >
                <span className="text-[12px] font-bold tracking-[3px] uppercase text-white/80
                             group-hover:text-gold-royal transition-colors">
                  Book Consultation
                </span>
              </Link>
            </div>
          </div>

          {/* Right - Trust Highlights */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              {[
                { number: 'Free', label: 'Worldwide Shipping', desc: 'Fully insured delivery to your door' },
                { number: '30', label: 'Day Returns', desc: 'No questions asked return policy' },
                { number: 'GIA', label: 'Certified Gems', desc: 'Every stone verified authentic' },
                { number: '∞', label: 'Lifetime Warranty', desc: 'Craftsmanship guaranteed forever' },
              ].map((item, i) => (
                <div key={i} className="group flex items-start gap-6 py-6 border-b border-white/5
                                      hover:border-gold-royal/20 transition-colors duration-500">
                  <span className="text-3xl font-playfair font-bold text-gold-royal min-w-[80px]">
                    {item.number}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-white/40 font-cormorant">
                      {item.desc}
                    </p>
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
