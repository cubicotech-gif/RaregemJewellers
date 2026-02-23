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
    <section className="py-[100px] bg-kronos-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-kronos-gold/30"></div>
            <span className="text-xs font-sans font-semibold text-kronos-gold uppercase tracking-[0.3em]">
              Testimonials
            </span>
            <div className="w-16 h-px bg-kronos-gold/30"></div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-kronos-white mb-5 tracking-tight">
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
              className="bg-kronos-brown border border-kronos-gold/5 p-8 lg:p-10 hover:border-kronos-gold/15 transition-all duration-500 group"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-kronos-gold/20 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-kronos-gold text-kronos-gold" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-kronos-white/85 mb-8 leading-[1.8] font-sans text-[15px]">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Ring name */}
              <p className="text-xs text-kronos-gold uppercase tracking-[0.15em] mb-6 font-sans font-medium">
                Purchased: {testimonial.ring}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-kronos-gold/10">
                <div className="relative w-11 h-11 overflow-hidden">
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
