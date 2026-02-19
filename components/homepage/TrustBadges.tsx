import { Shield, Truck, RotateCcw, Award } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    { icon: Shield, label: 'Lifetime Warranty' },
    { icon: Truck, label: 'Insured Shipping' },
    { icon: RotateCcw, label: '30-Day Returns' },
    { icon: Award, label: 'GIA Certified' },
  ]

  return (
    <section className="py-6 border-y border-white/[0.04] bg-obsidian">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <b.icon className="w-4 h-4 text-ivory/15" />
              <span className="text-[10px] font-sans tracking-[2px] uppercase text-ivory/25">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
