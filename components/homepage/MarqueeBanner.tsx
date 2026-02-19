'use client'

export function MarqueeBanner() {
  const items = [
    'Kashmir Sapphires', 'Burmese Rubies', 'Colombian Emeralds',
    'Paraiba Tourmaline', 'Russian Alexandrite', 'AAA Tanzanite',
    'GIA Certified', 'Investment Grade', 'Handcrafted',
  ]

  return (
    <section className="py-4 border-y border-white/[0.04] bg-obsidian overflow-hidden">
      <div className="relative flex">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 animate-[scroll_40s_linear_infinite] gap-0" aria-hidden={n === 1}>
            {[...items, ...items].map((item, i) => (
              <span key={i} className="flex items-center gap-8 px-8">
                <span className="text-[10px] font-sans tracking-[4px] uppercase text-ivory/15 whitespace-nowrap">
                  {item}
                </span>
                <span className="w-1 h-1 rounded-full bg-gold-royal/20" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
