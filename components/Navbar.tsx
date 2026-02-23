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
      setScrolled(window.scrollY > 30)
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
      scrolled
        ? 'glass-dark shadow-elegant py-0'
        : 'bg-transparent py-2'
    }`}>
      {/* Top gold accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-kronos-gold/30 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Diamond className="h-6 w-6 text-kronos-gold transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" />
              <div className="absolute inset-0 bg-kronos-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-kronos-white tracking-[0.2em] uppercase leading-none">
                Kronos
              </span>
              <span className="text-[8px] text-kronos-gold/60 tracking-[0.35em] uppercase font-sans mt-0.5">
                Rare Gems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-sans font-medium text-kronos-muted hover:text-kronos-gold transition-colors duration-400 uppercase tracking-[0.2em] group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-kronos-gold group-hover:w-full transition-all duration-400" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link href="/cart" className="relative group p-2">
              <ShoppingCart className="h-5 w-5 text-kronos-muted group-hover:text-kronos-gold transition-colors duration-300" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-kronos-gold text-kronos-black text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-kronos-muted hover:text-kronos-gold transition-colors p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-500 ease-luxury overflow-hidden ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass-dark border-t border-kronos-gold/10 px-6 py-8 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3.5 text-sm font-sans font-medium text-kronos-muted hover:text-kronos-gold transition-all duration-300 uppercase tracking-[0.2em] border-b border-kronos-gold/5 hover:pl-2 hover:border-kronos-gold/20"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-kronos-gold/10 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
    </nav>
  )
}
