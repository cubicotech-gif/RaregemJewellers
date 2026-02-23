'use client'

import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Michael R.',
    location: 'New York, NY',
    rating: 5,
    text: 'The alexandrite ring I got represents everything about our relationship - unique, rare, and constantly surprising. She said yes the moment she saw it.',
    image: 'https://i.pravatar.cc/150?img=12',
    ring: 'Chameleon Crown'
  },
  {
    name: 'David K.',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'I wanted something that stood out from the typical diamond rings. The tanzanite is incredible - everyone asks about it. Worth every penny.',
    image: 'https://i.pravatar.cc/150?img=13',
    ring: 'Tanzanite Majesty'
  },
  {
    name: 'James T.',
    location: 'Chicago, IL',
    rating: 5,
    text: 'The craftsmanship is unreal. My black opal ring is a conversation starter everywhere I go. This is what a modern engagement ring should be.',
    image: 'https://i.pravatar.cc/150?img=14',
    ring: 'Obsidian King'
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-[120px] bg-kronos-black relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.03),transparent_60%)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="diamond-ornament max-w-xs mx-auto mb-8">
            <span className="text-[11px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.35em] whitespace-nowrap">
              Testimonials
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-display font-semibold text-kronos-white mb-5 tracking-tight">
            Stories of Forever
          </h2>
          <p className="text-lg text-kronos-muted max-w-xl mx-auto font-sans font-light leading-relaxed">
            Real men. Real commitments. Real rare gems.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="surface-luxury p-8 lg:p-10 hover:border-kronos-gold/20 transition-all duration-700 group hover-lift relative overflow-hidden"
            >
              {/* Subtle gold accent corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-kronos-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-kronos-gold/15 mb-6 group-hover:text-kronos-gold/30 transition-colors duration-500" />

              {/* Stars */}
              <div className="flex gap-1.5 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-kronos-gold text-kronos-gold" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-kronos-white/80 mb-8 leading-[1.85] font-sans text-[15px]">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Ring name */}
              <p className="text-[10px] text-kronos-gold uppercase tracking-[0.2em] mb-6 font-sans font-medium">
                Purchased: {testimonial.ring}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-kronos-gold/8">
                <div className="relative w-11 h-11 overflow-hidden border border-kronos-gold/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-sans font-medium text-sm text-kronos-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-kronos-muted font-sans">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
