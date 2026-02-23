import { Button } from '@/components/ui/button-luxury'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-[120px] bg-kronos-brown relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.06),transparent_70%)]"></div>
        {/* Decorative corner lines */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-kronos-gold/10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-kronos-gold/10"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative label */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-kronos-gold/30"></div>
          <span className="text-xs font-sans font-semibold text-kronos-gold uppercase tracking-[0.3em]">
            Begin Your Journey
          </span>
          <div className="w-12 h-px bg-kronos-gold/30"></div>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl md:text-[3.5rem] font-bold text-kronos-white mb-4 tracking-tight leading-[1.05]">
          Ready To Find Your
        </h2>
        <h2 className="font-display text-4xl md:text-[3.5rem] font-bold gradient-gold-text mb-8 tracking-tight leading-[1.05]">
          Forever Ring?
        </h2>

        {/* Subtext */}
        <p className="text-lg text-kronos-muted mb-14 max-w-xl mx-auto leading-relaxed font-sans font-light">
          Every ring tells a story. Let us help you create something
          as rare and meaningful as your commitment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/shop">
            <Button variant="filled" size="xl" className="group min-w-[240px]">
              Shop Engagement Rings
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="xl" className="min-w-[240px]">
              <MessageCircle className="mr-3 h-4 w-4" />
              Talk To An Expert
            </Button>
          </Link>
        </div>

        {/* Trust Line */}
        <div className="mt-16 flex items-center justify-center gap-6 text-[11px] text-kronos-muted/60 uppercase tracking-[0.15em] font-sans">
          <span>Free Worldwide Shipping</span>
          <div className="w-1 h-1 bg-kronos-gold/30 rounded-full"></div>
          <span>Lifetime Warranty</span>
          <div className="w-1 h-1 bg-kronos-gold/30 rounded-full"></div>
          <span>30-Day Returns</span>
        </div>
      </div>
    </section>
  )
}
