import { Shield, Truck, RotateCcw, Award } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description: 'Forever guaranteed'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Worldwide delivery'
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'No questions asked'
    },
    {
      icon: Award,
      title: 'GIA Certified',
      description: 'Authenticated gems'
    }
  ]

  return (
    <section className="py-12 border-y border-brand-gold/10 bg-brand-charcoal/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <badge.icon className="w-8 h-8 text-brand-gold mb-3" />
              <h4 className="text-sm font-semibold text-brand-cream uppercase tracking-wider mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-brand-gray">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
