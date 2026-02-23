import { Button } from '@/components/ui/button-luxury'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-[140px] bg-kronos-brown relative overflow-hidden">
      {/* Multi-layer background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_60%)]" />
        <div className="absolute inset-0 particle-bg opacity-20" />
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-kronos-gold/8" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-kronos-gold/8" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-kronos-gold/5" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-kronos-gold/5" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative label */}
        <div className="diamond-ornament max-w-xs mx-auto mb-12">
          <span className="text-[11px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.35em] whitespace-nowrap">
            Begin Your Journey
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl md:text-[3.5rem] font-bold text-kronos-white mb-4 tracking-tight leading-[1.05]">
          Ready To Find Your
        </h2>
        <h2 className="font-display text-4xl md:text-[3.5rem] font-bold gradient-gold-text-animated mb-8 tracking-tight leading-[1.05]">
          Forever Ring?
        </h2>

        {/* Subtext */}
        <p className="text-lg text-kronos-muted mb-16 max-w-xl mx-auto leading-relaxed font-sans font-light">
          Every ring tells a story. Let us help you create something
          as rare and meaningful as your commitment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/shop">
            <Button variant="filled" size="xl" className="group min-w-[260px] shadow-gold">
              Shop Engagement Rings
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="xl" className="min-w-[260px]">
              <MessageCircle className="mr-3 h-4 w-4" />
              Talk To An Expert
            </Button>
          </Link>
        </div>

        {/* Trust Line */}
        <div className="mt-20 flex items-center justify-center gap-6 text-[10px] text-kronos-muted/50 uppercase tracking-[0.2em] font-sans">
          <span>Free Worldwide Shipping</span>
          <div className="w-1.5 h-1.5 bg-kronos-gold/20 rotate-45" />
          <span>Lifetime Warranty</span>
          <div className="w-1.5 h-1.5 bg-kronos-gold/20 rotate-45" />
          <span>30-Day Returns</span>
        </div>
      </div>
    </section>
  )
}
