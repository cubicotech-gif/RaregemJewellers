import { Button } from '@/components/ui/button-luxury'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-b from-brand-black to-brand-charcoal relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-cream mb-6 uppercase">
          Ready To Find Your
          <span className="block gradient-gold-text">Forever Ring?</span>
        </h2>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-brand-gray mb-12 max-w-2xl mx-auto leading-relaxed">
          Every ring tells a story. What's yours? Let's create something
          as rare and meaningful as your commitment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/shop">
            <Button variant="gold" size="xl" className="group">
              Shop Engagement Rings
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="xl">
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk To An Expert
            </Button>
          </Link>
        </div>

        {/* Trust Line */}
        <p className="mt-12 text-sm text-brand-gray uppercase tracking-wider">
          Free Worldwide Shipping • Lifetime Warranty • 30-Day Returns
        </p>
      </div>
    </section>
  )
}
