import { Button } from '@/components/ui/button-luxury'
import { H2, P } from '@/components/ui/typography'
import Image from 'next/image'
import Link from 'next/link'

export function StorySection() {
  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-luxury">
              <Image
                src="https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&q=80"
                alt="Master craftsman creating jewelry"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 glass-effect p-6 rounded-lg max-w-xs">
              <div className="text-4xl font-display font-bold text-brand-gold mb-2">
                25+ Years
              </div>
              <p className="text-sm text-brand-cream">
                Of master craftsmanship and rare gem sourcing worldwide
              </p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 mb-6">
              <span className="text-sm text-brand-gold uppercase tracking-wider font-semibold">
                Our Story
              </span>
            </div>

            <H2 className="text-brand-cream mb-6">
              Your Love Story Deserves A Rare Gem
            </H2>

            <P className="mb-6">
              For over 25 years, we've traveled the world seeking the rarest gemstones
              for men who refuse to settle for ordinary. Each alexandrite, tanzanite,
              and paraiba tourmaline in our collection represents months of careful
              sourcing and selection.
            </P>

            <P className="mb-6">
              We believe your engagement ring should be as unique as your commitment.
              That's why we specialize in rare gems that change color, catch light,
              and tell a story no diamond ever could.
            </P>

            <div className="grid grid-cols-3 gap-6 py-8 border-y border-brand-gold/20 mb-8">
              <div>
                <div className="text-2xl font-display font-bold text-brand-gold mb-1">
                  500+
                </div>
                <div className="text-xs text-brand-gray uppercase">
                  Rare Gems
                </div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-brand-gold mb-1">
                  100%
                </div>
                <div className="text-xs text-brand-gray uppercase">
                  Certified
                </div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-brand-gold mb-1">
                  Lifetime
                </div>
                <div className="text-xs text-brand-gray uppercase">
                  Warranty
                </div>
              </div>
            </div>

            <Link href="/about">
              <Button variant="outline" size="lg">
                Read Our Full Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
