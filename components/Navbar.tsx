'use client'

import Link from 'next/link'
import { Menu, X, Phone, Lock, Clock, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const pktTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Karachi',
        hour12: false,
      }).format(now)
      setCurrentTime(pktTime)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/shop', label: 'COLLECTIONS' },
    { href: '/shop?category=vault', label: 'THE VAULT' },
    { href: '/shop?category=bespoke', label: 'BESPOKE' },
    { href: '/about#gemstones', label: 'GEMSTONE GUIDE' },
    { href: '/about', label: 'OUR STORY' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <>
      {/* TOP BAR - 32px */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-void-black border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] font-tech tracking-[2px] uppercase text-gold-royal/70">
              <Clock className="w-3 h-3" />
              Karachi Time: {currentTime || '--:--'}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+92XXXXXXXXXX"
              className="hidden sm:flex items-center gap-2 text-[10px] font-tech tracking-[2px] uppercase text-gold-royal/70 hover:text-gold-royal transition-colors"
            >
              <Phone className="w-3 h-3" />
              +92-XXX-XXXXXX
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-2 text-[10px] font-tech tracking-[2px] uppercase text-gold-royal/70 hover:text-gold-royal transition-colors"
            >
              <Lock className="w-3 h-3" />
              CLIENT LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER - 96px, starts at 32px */}
      <header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-void-black/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 h-24 flex items-center justify-between">
          {/* LOGO - LEFT */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <div className="text-center lg:text-left">
                <h1 className="text-[28px] lg:text-[32px] font-display font-bold tracking-[4px] text-white leading-none mb-1.5 relative inline-block">
                  <span className="shimmer-text">&#9670; RARE LEGACY &#9670;</span>
                </h1>
                <p className="text-[11px] tracking-[2px] text-gold-royal/70 italic font-headline">
                  Where Gemstones Become Heirlooms
                </p>
              </div>
            </Link>
          </div>

          {/* NAVIGATION - CENTER */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-[11px] font-sans font-medium tracking-[2.5px] text-white/90 hover:text-gold-royal transition-colors duration-300 py-2 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CART + MOBILE TOGGLE - RIGHT */}
          <div className="flex items-center gap-4">
            {/* Reserve / Cart Button */}
            <Link
              href="/cart"
              className="relative group"
            >
              <div className="w-12 h-12 rounded-full border border-gold-royal/30 flex items-center justify-center hover:border-gold-royal hover:bg-gold-royal/5 transition-all duration-300">
                <ShoppingBag className="w-5 h-5 text-gold-royal" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blood-red rounded-full flex items-center justify-center text-[10px] font-bold text-ice-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden text-gold-royal p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-void-black/98 backdrop-blur-xl border-t border-gold-royal/10 px-6 py-8">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[12px] font-sans font-medium tracking-[2.5px] text-white/80 hover:text-gold-royal transition-colors uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
