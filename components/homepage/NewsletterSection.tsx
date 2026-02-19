'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-20 bg-gold-royal relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)',
           }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <div>
            <span className="text-[11px] font-bold tracking-[4px] uppercase text-white/60 mb-4 block">
              The Inner Circle
            </span>
            <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-4">
              First Access To New Arrivals
            </h3>
            <p className="text-white/70 font-cormorant italic text-lg">
              Join our private list for early access to new rare gems,
              exclusive pricing, and collector insights.
            </p>
          </div>

          {/* Right - Form */}
          <div>
            {submitted ? (
              <div className="flex items-center gap-4 py-6">
                <div className="w-12 h-12 bg-white/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-wide">
                    Welcome to the Inner Circle
                  </p>
                  <p className="text-sm text-white/70">
                    You&apos;ll hear from us when something rare arrives.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20
                           placeholder:text-white/40 text-white text-sm tracking-wider
                           focus:outline-none focus:border-white/50 transition-colors"
                />
                <button
                  type="submit"
                  className="group px-8 py-4 bg-black hover:bg-black/90
                           transition-colors duration-300 flex items-center justify-center gap-3"
                >
                  <span className="text-[11px] font-bold tracking-[3px] uppercase text-gold-light">
                    Subscribe
                  </span>
                  <ArrowRight className="w-4 h-4 text-gold-light group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-white/40 mt-4 tracking-wider">
              No spam. Only rare finds. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
