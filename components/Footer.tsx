import Link from 'next/link'
import { Gem, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Gem className="h-8 w-8 text-purple-400" />
              <span className="font-serif text-2xl font-bold text-white">
                Rare Gems
              </span>
            </Link>
            <p className="text-sm text-neutral-400 mb-4">
              Exquisite collection of rare gemstone jewelry for the discerning collector.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="hover:text-purple-400 transition-colors">Shop All</Link></li>
              <li><Link href="/shop?category=womens" className="hover:text-purple-400 transition-colors">Women's Collection</Link></li>
              <li><Link href="/shop?category=mens" className="hover:text-purple-400 transition-colors">Men's Collection</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@raregems.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+92 XXX XXXXXXX</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-sm">Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Rare Gems Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
