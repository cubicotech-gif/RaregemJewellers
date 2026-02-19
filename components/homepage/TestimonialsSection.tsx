'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Michael R.',
    location: 'New York',
    text: 'The Kashmir sapphire ring I acquired is not just jewellery — it is an heirloom. The craftsmanship and rarity are unmatched.',
    rating: 5,
  },
  {
    name: 'David K.',
    location: 'Los Angeles',
    text: 'I wanted something that stood apart from typical diamond rings. The tanzanite is incredible — everyone asks about it.',
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
    <section className="py-32 lg:py-40 bg-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[500px] h-[500px] bg-gold-royal/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-xl mb-20">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-10 h-px bg-gold-royal/60" />
            <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-cormorant font-light text-ivory/90 leading-[1.1]">
            Stories From <span className="font-semibold text-ivory/40">Collectors</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="group glass p-10 hover:glass-rose transition-all duration-700">
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-gold-royal/40 text-gold-royal/40" />
                ))}
              </div>
              <p className="text-ivory/45 leading-relaxed mb-10 font-cormorant italic text-lg">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="pt-6 border-t border-white/[0.04]">
                <p className="text-xs font-sans font-medium text-ivory/60 tracking-wide">{t.name}</p>
                <p className="text-[10px] font-sans text-ivory/25 tracking-[2px] uppercase mt-1">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
