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
    <section className="py-12 bg-kronos-brown/30 border-y border-kronos-gold/8 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.03),transparent_60%)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center group py-2">
              <div className="relative mb-3">
                <badge.icon className="w-6 h-6 text-kronos-gold transition-all duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-kronos-gold/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="text-[11px] font-sans font-semibold text-kronos-white uppercase tracking-[0.15em] mb-1">
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
