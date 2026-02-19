'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Michael R.',
    location: 'New York',
    text: 'The Kashmir sapphire ring I acquired is not just jewellery — it is an heirloom. The craftsmanship and rarity are unmatched anywhere.',
    rating: 5,
  },
  {
    name: 'David K.',
    location: 'Los Angeles',
    text: 'I wanted something that stood apart from typical diamond rings. The tanzanite is incredible — everyone asks about it. Worth every penny.',
    rating: 5,
  },
  {
    name: 'James T.',
    location: 'London',
    text: 'The alexandrite changes colour in every light. My partner was speechless. This is what a modern engagement ring should be.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-obsidian to-black">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gold-royal" />
            <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
              Testimonials
            </span>
            <div className="w-16 h-px bg-gold-royal" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
            Stories From Collectors
          </h2>
          <p className="text-lg text-white/50 font-cormorant italic">
            Real men. Real commitments. Real rare gems.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative p-10 bg-steel/30 border border-white/5
                       hover:border-gold-royal/20 transition-all duration-500"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-gold-royal/20 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold-royal text-gold-royal" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-white/80 leading-relaxed mb-8 font-cormorant italic text-lg">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-sm font-bold text-white tracking-wide">{t.name}</p>
                <p className="text-xs text-white/40 tracking-[2px] uppercase mt-1">{t.location}</p>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gold-royal
                           group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
