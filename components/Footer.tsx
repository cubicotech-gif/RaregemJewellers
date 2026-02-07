import Link from 'next/link'
import { Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'

const navLinks = [
  { href: '/shop', label: 'Collections' },
  { href: '/shop?category=vault', label: 'The Vault' },
  { href: '/shop?category=bespoke', label: 'Bespoke' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-void-black border-t border-gold-royal/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <h3 className="font-display text-2xl font-bold tracking-[3px] shimmer-text">
                RARE LEGACY
              </h3>
            </Link>
            <p className="font-headline text-sm italic text-gold-whisper/60 mb-6">
              Where gemstones transcend time
            </p>
            {/* Small Logo SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-royal/40"
            >
              <path
                d="M6 3L1 9L12 21L23 9L18 3H6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Navigate Column */}
          <div>
            <h4 className="font-tech text-[11px] tracking-[3px] text-white/60 uppercase mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/50 hover:text-gold-royal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-tech text-[11px] tracking-[3px] text-white/60 uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gold-royal/50" strokeWidth={1.5} />
                <span className="font-sans text-sm text-white/50">Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-royal/50" strokeWidth={1.5} />
                <span className="font-sans text-sm text-white/50">+92-XXX-XXXXXXX</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-royal/50" strokeWidth={1.5} />
                <span className="font-sans text-sm text-white/50">vip@rarelegacy.pk</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-gold-royal/50" strokeWidth={1.5} />
                <span className="font-sans text-sm text-white/50">WhatsApp</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-white/30 hover:text-gold-royal transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="text-white/30 hover:text-gold-royal transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            &copy; {new Date().getFullYear()} RARE LEGACY. Crafted with precision in Karachi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="font-sans text-xs text-white/30 hover:text-white/50 transition-colors">
              Terms
            </Link>
            <Link href="#" className="font-sans text-xs text-white/30 hover:text-white/50 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="font-sans text-xs text-white/30 hover:text-white/50 transition-colors">
              Certification Verification
            </Link>
          </div>
        </div>

        {/* Signature Quote */}
        <p className="font-headline text-sm italic text-gold-royal/30 text-center mt-8">
          &ldquo;Legends don&rsquo;t settle.&rdquo;
        </p>
      </div>
    </footer>
  )
}
