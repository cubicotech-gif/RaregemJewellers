'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Diamond } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Collections' },
    { href: '/shop?category=mens', label: 'Men' },
    { href: '/shop?category=womens', label: 'Women' },
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-kronos-black/95 backdrop-blur-md border-b border-kronos-gold/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Diamond className="h-6 w-6 text-kronos-gold transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-display text-2xl font-bold text-kronos-white tracking-[0.15em] uppercase">
              Kronos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans font-medium text-kronos-muted hover:text-kronos-gold transition-colors duration-300 uppercase tracking-[0.2em]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group">
              <ShoppingCart className="h-5 w-5 text-kronos-muted group-hover:text-kronos-gold transition-colors duration-300" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-kronos-gold text-kronos-black text-[10px] font-bold h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-kronos-muted hover:text-kronos-gold transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-kronos-black/98 backdrop-blur-lg border-t border-kronos-gold/10 px-6 py-8 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-sm font-sans font-medium text-kronos-muted hover:text-kronos-gold transition-colors uppercase tracking-[0.2em] border-b border-kronos-gold/5"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
