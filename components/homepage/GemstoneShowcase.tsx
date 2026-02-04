'use client'

import { H2, Lead } from '@/components/ui/typography'
import { Card } from '@/components/ui/card-luxury'
import Image from 'next/image'
import { useState } from 'react'

const gemstones = [
  {
    name: 'Alexandrite',
    color: 'from-green-500 to-purple-500',
    description: 'Changes color from green to red. Rarer than diamonds.',
    image: 'https://images.unsplash.com/photo-1611651191254-c1e6c5d0e92d?w=800&q=80'
  },
  {
    name: 'Tanzanite',
    color: 'from-blue-500 to-violet-500',
    description: 'Found only in Tanzania. 1000x rarer than diamonds.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80'
  },
  {
    name: 'Paraiba',
    color: 'from-cyan-400 to-blue-500',
    description: 'Electric blue-green. The rarest tourmaline.',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80'
  },
  {
    name: 'Black Opal',
    color: 'from-gray-800 via-purple-500 to-blue-500',
    description: 'Mesmerizing play of colors. Australian treasure.',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757a32?w=800&q=80'
  },
  {
    name: 'Padparadscha',
    color: 'from-orange-400 to-pink-400',
    description: 'Sunset-colored sapphire. Exceptionally rare.',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80'
  }
]

export function GemstoneShowcase() {
  const [activeGem, setActiveGem] = useState(0)

  return (
    <section className="py-24 bg-gradient-dark relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-brand-gold/5 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <H2 className="text-brand-gold mb-4">
            Rare Gems Worth The Commitment
          </H2>
          <Lead className="max-w-2xl mx-auto">
            Discover stones that defy convention. Each gem is ethically sourced
            and certified for authenticity.
          </Lead>
        </div>

        {/* Gemstone Carousel */}
        <div className="relative">
          {/* Main Display */}
          <div className="mb-8">
            <Card className="p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={gemstones[activeGem].image}
                    alt={gemstones[activeGem].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${gemstones[activeGem].color} mb-4`}>
                    <span className="text-sm text-white font-semibold">
                      {gemstones[activeGem].name}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-brand-cream mb-4">
                    {gemstones[activeGem].name}
                  </h3>
                  <p className="text-lg text-brand-gray leading-relaxed">
                    {gemstones[activeGem].description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Gem Selector */}
          <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
            {gemstones.map((gem, index) => (
              <button
                key={gem.name}
                onClick={() => setActiveGem(index)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider text-sm transition-all ${
                  activeGem === index
                    ? 'bg-brand-gold text-brand-black'
                    : 'bg-brand-charcoal text-brand-gray hover:text-brand-gold'
                }`}
              >
                {gem.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
