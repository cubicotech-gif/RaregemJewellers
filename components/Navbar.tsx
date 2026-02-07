'use client'

import Link from 'next/link'
import { Menu, X, Phone, Lock } from 'lucide-react'
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
    { href: '/about', label: 'OUR STORY' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <>
      {/* PRE-HEADER */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-void-black h-6 flex items-center justify-between px-6 border-b border-white/5">
        <span className="text-[10px] font-tech tracking-wider text-gold-whisper/70">
          KARACHI TIME: {currentTime || '--:--'} PKT
        </span>
        <div className="flex items-center gap-4">
          <a
            href="tel:+92XXXXXXXXXX"
            className="flex items-center gap-1.5 text-[10px] font-tech tracking-wider text-gold-whisper/70 hover:text-gold-royal transition-colors"
          >
            <Phone className="w-2.5 h-2.5" />
            VIP HOTLINE
          </a>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-[10px] font-tech tracking-wider text-gold-whisper/70 hover:text-gold-royal transition-colors"
          >
            <Lock className="w-2.5 h-2.5" />
            CLIENT LOGIN
          </Link>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian/95 backdrop-blur-[10px] shadow-header'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col items-center justify-center py-4 lg:py-5">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center group mb-3 lg:mb-4">
              {/* Diamond Icon SVG */}
              <div className="relative mb-2">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gold-royal"
                >
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CFB53B" />
                      <stop offset="50%" stopColor="#F4E4B0" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M6 3L1 9L12 21L23 9L18 3H6Z"
                    stroke="url(#goldGrad)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M1 9H23M12 21L8 9M12 21L16 9M8 9L6 3M8 9L12 3M16 9L18 3M16 9L12 3"
                    stroke="url(#goldGrad)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    opacity="0.6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gold-royal/20 blur-lg rounded-full animate-pulse-slow" />
              </div>

              <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-[4px] text-ice-white shimmer-text">
                RARE LEGACY
              </h1>
              <span className="font-headline text-xs lg:text-sm italic text-gold-royal/70 tracking-wider mt-0.5">
                &ldquo;Where Gemstones Become Heirlooms&rdquo;
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-[11px] font-sans tracking-[3px] text-white/80 hover:text-gold-royal transition-colors uppercase"
                >
                  {link.label}
                </Link>
              ))}

              {/* Separator */}
              <div className="w-px h-4 bg-white/10" />

              {/* Reserve Button */}
              <Link
                href="/cart"
                className="relative group flex items-center gap-2 px-5 py-2 border border-gold-royal/50 text-[11px] font-tech tracking-[2px] text-gold-royal hover:bg-gold-royal hover:text-void-black transition-all duration-400"
              >
                RESERVE
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-blood-red text-ice-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile Header Row */}
            <div className="lg:hidden flex items-center justify-between w-full -mt-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gold-royal p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-4 py-1.5 border border-gold-royal/50 text-[10px] font-tech tracking-[2px] text-gold-royal"
              >
                RESERVE
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blood-red text-ice-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-obsidian/98 backdrop-blur-md border-t border-gold-royal/10 px-6 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] font-sans tracking-[3px] text-white/80 hover:text-gold-royal transition-colors uppercase"
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
