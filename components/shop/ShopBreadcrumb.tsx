import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export function ShopBreadcrumb() {
  return (
    <div className="border-b border-brand-gold/10 bg-brand-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 text-brand-gray hover:text-brand-gold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-brand-gray" />
          <span className="text-brand-cream font-semibold">Shop All Rings</span>
        </nav>
      </div>
    </div>
  )
}
