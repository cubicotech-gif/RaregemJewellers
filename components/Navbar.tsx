'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Gem } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/vault', label: 'Collection' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'glass-strong shadow-glass' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Gem className="w-5 h-5 text-gold-royal/70 group-hover:text-gold-royal transition-colors duration-500" />
            <span className="text-[13px] font-sans font-medium tracking-[4px] uppercase text-ivory/80
                           group-hover:text-ivory transition-colors duration-500">
              Rare Gems
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-12">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[10px] font-sans font-medium tracking-[3px] uppercase text-ivory/35
                         hover:text-ivory transition-colors duration-500 py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group">
              <ShoppingCart className="w-[18px] h-[18px] text-ivory/35 group-hover:text-ivory transition-colors duration-500" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold-royal text-obsidian
                             text-[8px] font-bold flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-ivory/35 hover:text-ivory transition-colors duration-500"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={`lg:hidden glass-strong overflow-hidden transition-all duration-500 ${
        isOpen ? 'max-h-80 border-t border-white/[0.04]' : 'max-h-0'
      }`}>
        <div className="max-w-[1400px] mx-auto px-8 py-6 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-[11px] font-sans font-medium tracking-[3px] uppercase
                       text-ivory/35 hover:text-gold-royal transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
