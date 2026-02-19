import Link from 'next/link'
import { Gem, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

const footerLinks = {
  collections: [
    { label: 'Kashmir Sapphires', href: '/vault?category=sapphire' },
    { label: 'Colombian Emeralds', href: '/vault?category=emerald' },
    { label: 'Burmese Rubies', href: '/vault?category=ruby' },
    { label: 'AAA Tanzanite', href: '/vault?category=tanzanite' },
    { label: 'Russian Alexandrite', href: '/vault?category=alexandrite' },
    { label: 'View All', href: '/vault' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'The Vault', href: '/vault' },
    { label: 'Contact', href: '/contact' },
    { label: 'Appointments', href: '/contact' },
  ],
  support: [
    { label: 'Shipping & Returns', href: '#' },
    { label: 'Ring Size Guide', href: '#' },
    { label: 'Care Instructions', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Gem className="w-6 h-6 text-gold-royal" />
              <span className="text-xl font-playfair font-bold text-white tracking-wider">
                RARE GEMS
              </span>
            </Link>

            <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-sm font-cormorant text-lg italic">
              Investment-grade gemstone rings handcrafted for the modern man.
              25+ years of sourcing the world&apos;s rarest stones.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center
                           hover:border-gold-royal/50 hover:bg-gold-royal/5
                           transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-white/40 group-hover:text-gold-royal transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-gold-royal transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-gold-royal transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-royal/50" />
                <span className="text-sm text-white/40">info@raregems.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-royal/50" />
                <span className="text-sm text-white/40">+92 XXX XXXXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-royal/50 mt-0.5" />
                <span className="text-sm text-white/40">Karachi, Pakistan</span>
              </li>
            </ul>

            {/* Support */}
            <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-4 mt-8">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-gold-royal transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30 tracking-wider">
            &copy; {new Date().getFullYear()} Rare Gems Jewellers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[2px] uppercase text-white/20">
              GIA Certified
            </span>
            <span className="text-white/10">&middot;</span>
            <span className="text-[10px] tracking-[2px] uppercase text-white/20">
              Insured Shipping
            </span>
            <span className="text-white/10">&middot;</span>
            <span className="text-[10px] tracking-[2px] uppercase text-white/20">
              Lifetime Warranty
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
