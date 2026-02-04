'use client'

import { H2 } from '@/components/ui/typography'
import { Card } from '@/components/ui/card-luxury'
import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Michael R.',
    location: 'New York, NY',
    rating: 5,
    text: 'The alexandrite ring I got represents everything about our relationship - unique, rare, and constantly surprising me. She said yes the moment she saw it.',
    image: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'David K.',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'I wanted something that stood out from the typical diamond rings. The tanzanite is incredible - everyone asks about it. Worth every penny.',
    image: 'https://i.pravatar.cc/150?img=13'
  },
  {
    name: 'James T.',
    location: 'Chicago, IL',
    rating: 5,
    text: 'The craftsmanship is unreal. My black opal ring is a conversation starter everywhere I go. This is what a modern engagement ring should be.',
    image: 'https://i.pravatar.cc/150?img=14'
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <H2 className="text-brand-cream mb-4">
            Stories From Modern Grooms
          </H2>
          <p className="text-xl text-brand-gray max-w-2xl mx-auto">
            Real men. Real commitments. Real rare gems.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-brand-cream/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-brand-gold/20">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-brand-cream">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-brand-gray">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
