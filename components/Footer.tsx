import Link from 'next/link'
import { Gem, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-obsidian">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Gem className="w-5 h-5 text-gold-royal/70" />
              <span className="text-[13px] font-sans font-medium tracking-[4px] uppercase text-ivory/70">
                Rare Gems
              </span>
            </Link>
            <p className="text-sm text-ivory/25 leading-relaxed font-sans font-light max-w-sm">
              Investment-grade gemstone rings handcrafted for the modern collector.
              25+ years of sourcing the world&apos;s rarest stones.
            </p>
          </div>

          {/* Collections */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-sans tracking-[3px] uppercase text-ivory/30 mb-6">Collections</h4>
            <ul className="space-y-3">
              {['Kashmir Sapphires', 'Colombian Emeralds', 'Burmese Rubies', 'AAA Tanzanite', 'View All'].map((l) => (
                <li key={l}>
                  <Link href="/vault" className="text-sm text-ivory/25 hover:text-ivory/60 transition-colors duration-300 font-sans font-light">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-sans tracking-[3px] uppercase text-ivory/30 mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Collection', href: '/vault' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-ivory/25 hover:text-ivory/60 transition-colors duration-300 font-sans font-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-sans tracking-[3px] uppercase text-ivory/30 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-ivory/15" />
                <span className="text-sm text-ivory/25 font-sans font-light">info@raregems.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-ivory/15" />
                <span className="text-sm text-ivory/25 font-sans font-light">+92 XXX XXXXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-ivory/15 mt-0.5" />
                <span className="text-sm text-ivory/25 font-sans font-light">Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6
                      flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-ivory/15 font-sans tracking-wider">
            &copy; {new Date().getFullYear()} Rare Gems Jewellers
          </p>
          <div className="flex items-center gap-6 text-[10px] text-ivory/15 font-sans tracking-[2px] uppercase">
            <span>GIA Certified</span>
            <span className="text-ivory/10">&middot;</span>
            <span>Insured Shipping</span>
            <span className="text-ivory/10">&middot;</span>
            <span>Lifetime Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
