'use client'

export function MarqueeBanner() {
  const items = [
    'Kashmir Sapphires',
    'Burmese Rubies',
    'Colombian Emeralds',
    'Paraiba Tourmaline',
    'Russian Alexandrite',
    'AAA Tanzanite',
    'Black Diamonds',
    'GIA Certified',
    'Investment Grade',
    'Handcrafted',
  ]

  return (
    <section className="py-5 bg-gold-royal overflow-hidden">
      <div className="relative flex">
        <div className="flex shrink-0 animate-[scroll_30s_linear_infinite] gap-0">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="text-[11px] font-bold tracking-[3px] uppercase text-black whitespace-nowrap">
                {item}
              </span>
              <span className="text-black/30 text-lg select-none">&mdash;</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-[scroll_30s_linear_infinite] gap-0" aria-hidden="true">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="text-[11px] font-bold tracking-[3px] uppercase text-black whitespace-nowrap">
                {item}
              </span>
              <span className="text-black/30 text-lg select-none">&mdash;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
