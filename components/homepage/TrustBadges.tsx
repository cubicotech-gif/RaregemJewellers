import { Shield, Truck, RotateCcw, Award } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description: 'Every piece guaranteed forever'
    },
    {
      icon: Truck,
      title: 'Complimentary Shipping',
      description: 'Insured worldwide delivery'
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'No questions asked'
    },
    {
      icon: Award,
      title: 'GIA Certified',
      description: 'Authenticated & appraised'
    }
  ]

  return (
    <section className="py-10 bg-kronos-brown/40 border-y border-kronos-gold/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <badge.icon className="w-6 h-6 text-kronos-gold mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="text-xs font-sans font-semibold text-kronos-white uppercase tracking-[0.15em] mb-1">
                {badge.title}
              </h4>
              <p className="text-[11px] text-kronos-muted font-sans">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
