'use client'

import Link from 'next/link'
import { Diamond, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-kronos-charcoal border-t border-kronos-gold/8 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 particle-bg opacity-10" />

      {/* Main Footer */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <Diamond className="h-6 w-6 text-kronos-gold transition-all duration-500 group-hover:rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-kronos-white tracking-[0.2em] uppercase leading-none">
                  Kronos
                </span>
                <span className="text-[8px] text-kronos-gold/50 tracking-[0.35em] uppercase font-sans mt-0.5">
                  Rare Gems
                </span>
              </div>
            </Link>
            <p className="text-sm text-kronos-muted leading-relaxed mb-8">
              Crafting exceptional engagement rings with the world&apos;s rarest gemstones.
              Each piece is a testament to timeless elegance.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-kronos-muted hover:text-kronos-gold transition-colors duration-300 text-[11px] uppercase tracking-[0.15em] font-medium">
                Instagram
              </a>
              <a href="#" className="text-kronos-muted hover:text-kronos-gold transition-colors duration-300 text-[11px] uppercase tracking-[0.15em] font-medium">
                Facebook
              </a>
              <a href="#" className="text-kronos-muted hover:text-kronos-gold transition-colors duration-300 text-[11px] uppercase tracking-[0.15em] font-medium">
                Pinterest
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-sans text-[11px] font-semibold text-kronos-gold uppercase tracking-[0.25em] mb-6">
              Collections
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'Sapphire Rings', href: '/shop?category=sapphire' },
                { label: 'Emerald Rings', href: '/shop?category=emerald' },
                { label: 'Ruby Rings', href: '/shop?category=ruby' },
                { label: 'Diamond Rings', href: '/shop?category=diamond' },
                { label: 'All Collections', href: '/shop' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-kronos-muted hover:text-kronos-white transition-colors duration-300 hover:pl-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-sans text-[11px] font-semibold text-kronos-gold uppercase tracking-[0.25em] mb-6">
              Customer Care
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'Ring Size Guide', href: '#' },
                { label: 'Shipping & Returns', href: '#' },
                { label: 'Care Instructions', href: '#' },
                { label: 'Certification', href: '#' },
                { label: 'FAQ', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-kronos-muted hover:text-kronos-white transition-colors duration-300 hover:pl-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-[11px] font-semibold text-kronos-gold uppercase tracking-[0.25em] mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-kronos-gold/60 flex-shrink-0" />
                <span className="text-sm text-kronos-muted">concierge@kronos.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-kronos-gold/60 flex-shrink-0" />
                <span className="text-sm text-kronos-muted">+92 XXX XXXXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-kronos-gold/60 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-kronos-muted">Karachi, Pakistan</span>
              </li>
            </ul>

            {/* Newsletter CTA */}
            <div className="mt-8">
              <p className="text-[10px] text-kronos-muted uppercase tracking-[0.2em] mb-3">
                Join the inner circle
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-kronos-black border border-kronos-gold/15 px-4 py-2.5 text-sm text-kronos-white placeholder:text-kronos-muted/40 focus:outline-none focus:border-kronos-gold/40 transition-colors"
                />
                <button className="bg-kronos-gold text-kronos-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider hover:bg-kronos-gold-light transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-kronos-gold/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-kronos-muted/50">
            &copy; {new Date().getFullYear()} KRONOS. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[11px] text-kronos-muted/50 hover:text-kronos-muted transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[11px] text-kronos-muted/50 hover:text-kronos-muted transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
