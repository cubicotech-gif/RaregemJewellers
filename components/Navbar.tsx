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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/vault', label: 'The Vault' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-black/95 backdrop-blur-md border-b border-white/5 shadow-luxury'
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Gem className="h-7 w-7 text-gold-royal group-hover:text-gold-light transition-colors" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl font-bold text-white tracking-wider group-hover:text-gold-royal transition-colors">
                Rare Gems
              </span>
              <span className="text-[8px] tracking-[4px] uppercase text-gold-royal/60 -mt-0.5">
                Legacy Collection
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium tracking-[2px] uppercase text-white/70
                         hover:text-gold-royal transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-royal
                             group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link href="/cart" className="relative group">
              <ShoppingCart className="h-5 w-5 text-white/70 group-hover:text-gold-royal transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-royal text-black text-[10px]
                             font-bold min-w-[18px] h-[18px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white/70 hover:text-gold-royal transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-md border-t border-white/5">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-[12px] font-medium tracking-[2px] uppercase
                         text-white/70 hover:text-gold-royal hover:bg-white/5
                         transition-all duration-300 border-l-2 border-transparent
                         hover:border-gold-royal"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
