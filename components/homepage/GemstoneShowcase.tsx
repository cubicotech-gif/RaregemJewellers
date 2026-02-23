'use client'

import Image from 'next/image'
import Link from 'next/link'

const collections = [
  {
    name: 'Diamond',
    subtitle: 'Timeless Brilliance',
    color: '#FFFFFF',
    href: '/shop?category=diamond',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  },
  {
    name: 'Sapphire',
    subtitle: 'Royal Blue',
    color: '#1B3A5C',
    href: '/shop?category=sapphire',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
  },
  {
    name: 'Emerald',
    subtitle: 'Verdant Power',
    color: '#1B4D3E',
    href: '/shop?category=emerald',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
  },
  {
    name: 'Ruby',
    subtitle: 'Crimson Fire',
    color: '#8B3A3A',
    href: '/shop?category=ruby',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80',
  },
]

export function GemstoneShowcase() {
  return (
    <section className="py-[100px] bg-gradient-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,110,0.04),transparent_50%)]"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-kronos-gold/30"></div>
            <span className="text-xs font-sans font-semibold text-kronos-gold uppercase tracking-[0.3em]">
              By Gemstone
            </span>
            <div className="w-16 h-px bg-kronos-gold/30"></div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-kronos-white mb-5 tracking-tight">
            Choose Your Stone
          </h2>
          <p className="text-lg text-kronos-muted max-w-xl mx-auto font-sans font-light leading-relaxed">
            Each gemstone carries its own story, energy, and unmistakable character.
          </p>
        </div>

        {/* Collection Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group block relative"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-kronos-brown">
                <Image
                  src={collection.image}
                  alt={`${collection.name} collection`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-kronos-black via-kronos-black/30 to-transparent"></div>

                {/* Color accent line at top */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: collection.color }}
                ></div>

                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-kronos-white mb-1 tracking-wide group-hover:text-kronos-gold transition-colors duration-300">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-kronos-muted font-sans tracking-wider uppercase">
                    {collection.subtitle}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs text-kronos-gold uppercase tracking-[0.2em] font-sans font-medium">
                      Explore
                    </span>
                    <div className="w-6 h-px bg-kronos-gold"></div>
                  </div>
                </div>

                {/* Border on hover */}
                <div className="absolute inset-0 border border-kronos-gold/0 group-hover:border-kronos-gold/20 transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
