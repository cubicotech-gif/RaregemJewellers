import { Shield, Truck, RotateCcw, Award } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    { icon: Shield, title: 'Lifetime Warranty', description: 'Every piece guaranteed' },
    { icon: Truck, title: 'Insured Shipping', description: 'Worldwide delivery' },
    { icon: RotateCcw, title: '30-Day Returns', description: 'No questions asked' },
    { icon: Award, title: 'GIA Certified', description: 'Authenticated gems' },
  ]

  return (
    <section className="py-8 border-y border-white/5 bg-black">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 border border-gold-royal/20
                           flex items-center justify-center
                           group-hover:border-gold-royal/50 transition-all duration-300">
                <badge.icon className="w-5 h-5 text-gold-royal" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-white tracking-[1px] uppercase">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-white/40 mt-0.5">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
