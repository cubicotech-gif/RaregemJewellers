'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubmitted(true); setEmail('') }
  }

  return (
    <section className="py-20 bg-obsidian border-y border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="glass-rose p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-10 h-px bg-gold-royal/60" />
                <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">
                  Inner Circle
                </span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-cormorant font-light text-ivory/90 mb-4">
                First Access To <span className="font-semibold">New Arrivals</span>
              </h3>
              <p className="text-sm text-ivory/35 font-sans font-light leading-relaxed">
                Join our private list for early access to rare gems, exclusive pricing,
                and collector insights.
              </p>
            </div>

            {/* Right */}
            <div>
              {submitted ? (
                <div className="flex items-center gap-4 py-6">
                  <div className="w-10 h-10 glass flex items-center justify-center">
                    <Check className="w-4 h-4 text-gold-royal" />
                  </div>
                  <div>
                    <p className="text-sm font-sans font-medium text-ivory/80">Welcome to the Inner Circle</p>
                    <p className="text-xs text-ivory/35 font-sans mt-0.5">We&apos;ll be in touch when something rare arrives.</p>
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
                    className="flex-1 px-6 py-4 bg-white/[0.03] border border-white/[0.06]
                             placeholder:text-ivory/20 text-ivory text-sm font-sans tracking-wider
                             focus:outline-none focus:border-gold-royal/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="group glass-rose px-8 py-4 flex items-center justify-center gap-3
                             hover:bg-gold-royal/10 transition-all duration-300"
                  >
                    <span className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/80">Subscribe</span>
                    <ArrowRight className="w-4 h-4 text-gold-royal group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-ivory/20 mt-4 font-sans tracking-wider">
                No spam. Only rare finds. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
