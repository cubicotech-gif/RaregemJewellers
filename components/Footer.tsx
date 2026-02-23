'use client'

import Link from 'next/link'
import { Diamond, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-kronos-black border-t border-kronos-gold/10">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Diamond className="h-6 w-6 text-kronos-gold" />
              <span className="font-display text-2xl font-bold text-kronos-white tracking-[0.15em] uppercase">
                Kronos
              </span>
            </Link>
            <p className="text-sm text-kronos-muted leading-relaxed mb-8">
              Crafting exceptional men&apos;s engagement rings with the world&apos;s rarest gemstones.
              Each piece is a testament to timeless masculine elegance.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-kronos-muted hover:text-kronos-gold transition-colors duration-300 text-xs uppercase tracking-[0.15em] font-medium">
                Instagram
              </a>
              <a href="#" className="text-kronos-muted hover:text-kronos-gold transition-colors duration-300 text-xs uppercase tracking-[0.15em] font-medium">
                Facebook
              </a>
              <a href="#" className="text-kronos-muted hover:text-kronos-gold transition-colors duration-300 text-xs uppercase tracking-[0.15em] font-medium">
                Pinterest
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-sans text-xs font-semibold text-kronos-gold uppercase tracking-[0.2em] mb-6">
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
                  <Link href={link.href} className="text-sm text-kronos-muted hover:text-kronos-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-sans text-xs font-semibold text-kronos-gold uppercase tracking-[0.2em] mb-6">
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
                  <Link href={link.href} className="text-sm text-kronos-muted hover:text-kronos-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs font-semibold text-kronos-gold uppercase tracking-[0.2em] mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-kronos-gold flex-shrink-0" />
                <span className="text-sm text-kronos-muted">concierge@kronos.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-kronos-gold flex-shrink-0" />
                <span className="text-sm text-kronos-muted">+92 XXX XXXXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-kronos-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm text-kronos-muted">Karachi, Pakistan</span>
              </li>
            </ul>

            {/* Newsletter CTA */}
            <div className="mt-8">
              <p className="text-xs text-kronos-muted uppercase tracking-[0.15em] mb-3">
                Join the inner circle
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-kronos-brown border border-kronos-gold/20 px-4 py-2.5 text-sm text-kronos-white placeholder:text-kronos-muted/50 focus:outline-none focus:border-kronos-gold/50 transition-colors"
                />
                <button className="bg-kronos-gold text-kronos-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-kronos-gold/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-kronos-gold/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-kronos-muted/60">
            &copy; {new Date().getFullYear()} KRONOS. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-xs text-kronos-muted/60 hover:text-kronos-muted transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-kronos-muted/60 hover:text-kronos-muted transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
