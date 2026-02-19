// data/products.ts - RARE LEGACY PRODUCT DATABASE

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  gemstone: {
    type: string;
    carat: number;
    origin: string;
    clarity: string;
    treatment: string;
  };
  metal: {
    type: string;
    purity: string;
    weight: string;
  };
  specifications: {
    setting: string;
    craftTime: string;
    certification: string;
    rarity: string;
  };
  images: string[];
  category: 'sapphire' | 'emerald' | 'ruby' | 'tanzanite' | 'tourmaline' | 'diamond' | 'alexandrite';
  collection: 'alpha-stones' | 'empire-collection' | 'heritage' | 'modern-legends';
  featured: boolean;
  inStock: boolean;
  quantity: number;
  tags: string[];
  createdAt: string;
}

export const products: Product[] = [
  // ═══════════════════════════════════════════════════════════
  // KASHMIR SAPPHIRE COLLECTION
  // ═══════════════════════════════════════════════════════════
  {
    id: 'ks-001',
    name: 'Kashmir Blue Emperor',
    slug: 'kashmir-blue-emperor',
    tagline: 'The Crown Jewel of Sapphires',
    description: 'A 6.8 carat Kashmir sapphire exhibiting the legendary "cornflower blue" hue with exceptional velvety texture. Sourced from the original Himalayan mines before depletion. This is not just a ring—it\'s a piece of geological history.',
    price: 48500,
    gemstone: {
      type: 'Kashmir Sapphire',
      carat: 6.8,
      origin: 'Kashmir, Himalayas',
      clarity: 'VVS1',
      treatment: 'None (Natural)',
    },
    metal: {
      type: 'Platinum 950',
      purity: '95%',
      weight: '12.5g',
    },
    specifications: {
      setting: 'Hand-Forged Bezel Setting',
      craftTime: '96 Hours',
      certification: 'GIA & Gübelin Certified',
      rarity: '< 0.001% of all sapphires',
    },
    images: [
      '/products/kashmir-sapphire-1.jpg',
      '/products/kashmir-sapphire-2.jpg',
      '/products/kashmir-sapphire-3.jpg',
    ],
    category: 'sapphire',
    collection: 'alpha-stones',
    featured: true,
    inStock: true,
    quantity: 1,
    tags: ['Kashmir', 'Ultra Rare', 'Investment Grade', 'Heirloom'],
    createdAt: '2025-01-15',
  },

  {
    id: 'ks-002',
    name: 'Royal Ceylon Signet',
    slug: 'royal-ceylon-signet',
    tagline: 'Power in Every Facet',
    description: 'A commanding 5.2ct Ceylon sapphire in a bold signet setting. The stone displays exceptional brilliance with a deep royal blue that commands attention without shouting. Designed for the man who leads.',
    price: 28500,
    gemstone: {
      type: 'Ceylon Sapphire',
      carat: 5.2,
      origin: 'Ratnapura, Sri Lanka',
      clarity: 'VS1',
      treatment: 'Heat Only',
    },
    metal: {
      type: '18K Yellow Gold',
      purity: '75%',
      weight: '18.2g',
    },
    specifications: {
      setting: 'Classic Signet with Pavé Accents',
      craftTime: '72 Hours',
      certification: 'GIA Certified',
      rarity: 'Top 1% of Ceylon Sapphires',
    },
    images: [
      '/products/ceylon-sapphire-signet-1.jpg',
      '/products/ceylon-sapphire-signet-2.jpg',
    ],
    category: 'sapphire',
    collection: 'empire-collection',
    featured: true,
    inStock: true,
    quantity: 2,
    tags: ['Ceylon', 'Signet', 'Executive', 'Classic'],
    createdAt: '2025-01-18',
  },

  {
    id: 'ks-003',
    name: 'Midnight Sapphire Band',
    slug: 'midnight-sapphire-band',
    tagline: 'Understated Authority',
    description: 'Five channel-set Australian sapphires (total 3.8ct) in a sleek band design. The near-black blue creates a subtle yet unmistakable statement. For the man who doesn\'t need to prove anything.',
    price: 18500,
    gemstone: {
      type: 'Australian Sapphire',
      carat: 3.8,
      origin: 'New South Wales, Australia',
      clarity: 'VS2',
      treatment: 'None',
    },
    metal: {
      type: '18K White Gold',
      purity: '75%',
      weight: '14.8g',
    },
    specifications: {
      setting: 'Channel Set Band',
      craftTime: '48 Hours',
      certification: 'AGS Certified',
      rarity: 'Limited Edition - 12 pieces',
    },
    images: [
      '/products/midnight-sapphire-band-1.jpg',
      '/products/midnight-sapphire-band-2.jpg',
    ],
    category: 'sapphire',
    collection: 'modern-legends',
    featured: false,
    inStock: true,
    quantity: 3,
    tags: ['Australian', 'Band', 'Subtle', 'Modern'],
    createdAt: '2025-01-20',
  },

  // ═══════════════════════════════════════════════════════════
  // TANZANITE COLLECTION
  // ═══════════════════════════════════════════════════════════
  {
    id: 'tz-001',
    name: 'Tanzanite Majesty',
    slug: 'tanzanite-majesty',
    tagline: 'Violet Royalty',
    description: 'The crown jewel of our collection. A 5.2ct AAA-grade Tanzanite displaying the coveted violet-blue pleochroism. Found only in a 14km² area in Tanzania, this stone is 1000x rarer than diamonds.',
    price: 24500,
    gemstone: {
      type: 'Tanzanite',
      carat: 5.2,
      origin: 'Merelani Hills, Tanzania',
      clarity: 'IF (Internally Flawless)',
      treatment: 'Heat Treated (Standard)',
    },
    metal: {
      type: '18K White Gold',
      purity: '75%',
      weight: '11.2g',
    },
    specifications: {
      setting: 'Four-Prong Solitaire',
      craftTime: '72 Hours',
      certification: 'GIA Certified',
      rarity: '1 of 7 in existence',
    },
    images: [
      '/products/tanzanite-majesty-1.jpg',
      '/products/tanzanite-majesty-2.jpg',
      '/products/tanzanite-majesty-3.jpg',
    ],
    category: 'tanzanite',
    collection: 'alpha-stones',
    featured: true,
    inStock: true,
    quantity: 1,
    tags: ['Tanzanite', 'AAA Grade', 'Ultra Rare', 'Hero Product'],
    createdAt: '2025-01-10',
  },

  {
    id: 'tz-002',
    name: 'Violet Eclipse',
    slug: 'violet-eclipse',
    tagline: 'Darkness Meets Fire',
    description: 'A 4.1ct Tanzanite with exceptional depth of color, set in blackened platinum for maximum contrast. The stone appears to glow from within. Mysterious. Powerful. Unmistakably yours.',
    price: 19500,
    gemstone: {
      type: 'Tanzanite',
      carat: 4.1,
      origin: 'Merelani, Tanzania',
      clarity: 'VVS1',
      treatment: 'Heat Treated',
    },
    metal: {
      type: 'Blackened Platinum',
      purity: '95%',
      weight: '13.5g',
    },
    specifications: {
      setting: 'Bezel Setting with Hammered Finish',
      craftTime: '60 Hours',
      certification: 'GIA Certified',
      rarity: 'Limited to 15 pieces',
    },
    images: [
      '/products/violet-eclipse-1.jpg',
      '/products/violet-eclipse-2.jpg',
    ],
    category: 'tanzanite',
    collection: 'modern-legends',
    featured: true,
    inStock: true,
    quantity: 2,
    tags: ['Tanzanite', 'Dark', 'Modern', 'Limited Edition'],
    createdAt: '2025-01-12',
  },

  // ═══════════════════════════════════════════════════════════
  // COLOMBIAN EMERALD COLLECTION
  // ═══════════════════════════════════════════════════════════
  {
    id: 'em-001',
    name: 'Colombian Empire',
    slug: 'colombian-empire',
    tagline: 'Green with Envy',
    description: 'A museum-quality 4.8ct Colombian emerald from the legendary Muzo mines. The vivid green rivals the finest examples in history. This isn\'t a purchase—it\'s an acquisition.',
    price: 35500,
    originalPrice: 42000,
    gemstone: {
      type: 'Colombian Emerald',
      carat: 4.8,
      origin: 'Muzo Mine, Colombia',
      clarity: 'Minor Inclusions (Natural)',
      treatment: 'Minor Oil (Standard)',
    },
    metal: {
      type: '18K Yellow Gold',
      purity: '75%',
      weight: '15.8g',
    },
    specifications: {
      setting: 'Double Claw Prong',
      craftTime: '84 Hours',
      certification: 'GIA & C. Dunaigre Certified',
      rarity: 'Top 0.5% by color saturation',
    },
    images: [
      '/products/colombian-empire-1.jpg',
      '/products/colombian-empire-2.jpg',
      '/products/colombian-empire-3.jpg',
    ],
    category: 'emerald',
    collection: 'empire-collection',
    featured: true,
    inStock: true,
    quantity: 1,
    tags: ['Colombian', 'Muzo', 'Investment Grade', 'Museum Quality'],
    createdAt: '2025-01-14',
  },

  {
    id: 'em-002',
    name: 'Zambian Hunter',
    slug: 'zambian-hunter',
    tagline: 'Deep Forest Authority',
    description: 'A 3.6ct Zambian emerald with darker, more masculine tone. Set in platinum with geometric side accents. For the man who forges his own path.',
    price: 22500,
    gemstone: {
      type: 'Zambian Emerald',
      carat: 3.6,
      origin: 'Kafubu, Zambia',
      clarity: 'Eye Clean',
      treatment: 'Minor Oil',
    },
    metal: {
      type: 'Platinum 950',
      purity: '95%',
      weight: '12.2g',
    },
    specifications: {
      setting: 'Contemporary Bezel with Geometric Accents',
      craftTime: '56 Hours',
      certification: 'GIA Certified',
      rarity: 'Limited to 10 pieces',
    },
    images: [
      '/products/zambian-hunter-1.jpg',
      '/products/zambian-hunter-2.jpg',
    ],
    category: 'emerald',
    collection: 'modern-legends',
    featured: false,
    inStock: true,
    quantity: 2,
    tags: ['Zambian', 'Masculine', 'Modern', 'Dark Green'],
    createdAt: '2025-01-16',
  },

  // ═══════════════════════════════════════════════════════════
  // RUBY COLLECTION
  // ═══════════════════════════════════════════════════════════
  {
    id: 'rb-001',
    name: 'Burmese Blood',
    slug: 'burmese-blood',
    tagline: 'Pigeon Blood Perfection',
    description: 'A legendary 3.9ct Burmese ruby displaying the coveted "pigeon blood" red. Mogok Valley origin with exceptional fluorescence. Rubies of this caliber appreciate 10-15% annually.',
    price: 52500,
    gemstone: {
      type: 'Burmese Ruby',
      carat: 3.9,
      origin: 'Mogok Valley, Myanmar',
      clarity: 'VS1',
      treatment: 'None (Unheated)',
    },
    metal: {
      type: 'Platinum 950',
      purity: '95%',
      weight: '11.8g',
    },
    specifications: {
      setting: 'Six-Prong Solitaire',
      craftTime: '108 Hours',
      certification: 'GIA & Gübelin Certified',
      rarity: '< 0.01% of all rubies',
    },
    images: [
      '/products/burmese-blood-1.jpg',
      '/products/burmese-blood-2.jpg',
      '/products/burmese-blood-3.jpg',
    ],
    category: 'ruby',
    collection: 'alpha-stones',
    featured: true,
    inStock: true,
    quantity: 1,
    tags: ['Burmese', 'Pigeon Blood', 'Unheated', 'Investment'],
    createdAt: '2025-01-08',
  },

  {
    id: 'rb-002',
    name: 'Crimson Sovereign',
    slug: 'crimson-sovereign',
    tagline: 'Power in Red',
    description: 'A 5.4ct Mozambique ruby with exceptional size and deep crimson hue. Heat-treated for stability. Bold setting designed for maximum visual impact.',
    price: 28500,
    gemstone: {
      type: 'Mozambique Ruby',
      carat: 5.4,
      origin: 'Montepuez, Mozambique',
      clarity: 'VS2',
      treatment: 'Heat Treated',
    },
    metal: {
      type: '18K Rose Gold',
      purity: '75%',
      weight: '16.5g',
    },
    specifications: {
      setting: 'Heavy Bezel with Side Stones',
      craftTime: '64 Hours',
      certification: 'GIA Certified',
      rarity: 'Top 5% by size',
    },
    images: [
      '/products/crimson-sovereign-1.jpg',
      '/products/crimson-sovereign-2.jpg',
    ],
    category: 'ruby',
    collection: 'empire-collection',
    featured: false,
    inStock: true,
    quantity: 2,
    tags: ['Mozambique', 'Large Stone', 'Bold', 'Rose Gold'],
    createdAt: '2025-01-17',
  },

  // ═══════════════════════════════════════════════════════════
  // PARAÍBA TOURMALINE COLLECTION
  // ═══════════════════════════════════════════════════════════
  {
    id: 'pt-001',
    name: 'Electric Dreams',
    slug: 'electric-dreams',
    tagline: 'The Neon Phenomenon',
    description: 'A breathtaking 4.2ct Paraíba tourmaline with otherworldly neon blue. The copper-bearing variety is rarer than diamonds, emeralds, and sapphires combined. This is the future of gemstone collecting.',
    price: 38500,
    gemstone: {
      type: 'Paraíba Tourmaline',
      carat: 4.2,
      origin: 'Paraíba State, Brazil',
      clarity: 'VVS2',
      treatment: 'None',
    },
    metal: {
      type: '18K White Gold',
      purity: '75%',
      weight: '10.5g',
    },
    specifications: {
      setting: 'Floating Halo',
      craftTime: '68 Hours',
      certification: 'GIA with Copper Content Analysis',
      rarity: '1 in 10,000 tourmalines',
    },
    images: [
      '/products/electric-dreams-1.jpg',
      '/products/electric-dreams-2.jpg',
      '/products/electric-dreams-3.jpg',
    ],
    category: 'tourmaline',
    collection: 'alpha-stones',
    featured: true,
    inStock: true,
    quantity: 1,
    tags: ['Paraíba', 'Neon Blue', 'Ultra Rare', 'Modern'],
    createdAt: '2025-01-19',
  },

  {
    id: 'pt-002',
    name: 'Mozambique Lightning',
    slug: 'mozambique-lightning',
    tagline: 'Copper Fire',
    description: 'A 3.1ct Mozambique Paraíba with vibrant green-blue. While not from the original Brazilian deposit, the copper content creates the same electric effect at a more accessible price point.',
    price: 16500,
    gemstone: {
      type: 'Paraíba Tourmaline',
      carat: 3.1,
      origin: 'Mozambique',
      clarity: 'VS1',
      treatment: 'Heat Treated',
    },
    metal: {
      type: 'Platinum 950',
      purity: '95%',
      weight: '9.8g',
    },
    specifications: {
      setting: 'Modern Tension Setting',
      craftTime: '52 Hours',
      certification: 'GIA Certified',
      rarity: 'Limited Production',
    },
    images: [
      '/products/mozambique-lightning-1.jpg',
      '/products/mozambique-lightning-2.jpg',
    ],
    category: 'tourmaline',
    collection: 'modern-legends',
    featured: false,
    inStock: true,
    quantity: 3,
    tags: ['Paraíba', 'Mozambique', 'Electric', 'Modern'],
    createdAt: '2025-01-21',
  },

  // ═══════════════════════════════════════════════════════════
  // BLACK DIAMOND COLLECTION
  // ═══════════════════════════════════════════════════════════
  {
    id: 'bd-001',
    name: 'Obsidian King',
    slug: 'obsidian-king',
    tagline: 'Darkness Redefined',
    description: 'A massive 8.8ct natural black diamond with metallic luster. Set in matte black tungsten carbide for ultimate durability. This isn\'t jewelry—it\'s armor.',
    price: 12500,
    gemstone: {
      type: 'Black Diamond',
      carat: 8.8,
      origin: 'Central African Republic',
      clarity: 'Opaque (Natural)',
      treatment: 'None',
    },
    metal: {
      type: 'Black Tungsten Carbide',
      purity: 'N/A (Carbide)',
      weight: '22.5g',
    },
    specifications: {
      setting: 'Flush Set in Carbide Band',
      craftTime: '36 Hours',
      certification: 'IGI Certified',
      rarity: 'Large Size - Top 2%',
    },
    images: [
      '/products/obsidian-king-1.jpg',
      '/products/obsidian-king-2.jpg',
    ],
    category: 'diamond',
    collection: 'modern-legends',
    featured: true,
    inStock: true,
    quantity: 4,
    tags: ['Black Diamond', 'Tungsten', 'Tactical', 'Durable'],
    createdAt: '2025-01-22',
  },

  {
    id: 'bd-002',
    name: 'Midnight Phalanx',
    slug: 'midnight-phalanx',
    tagline: 'Five Fingers of Power',
    description: 'Five black diamonds (total 6.2ct) in a statement band. Each stone hand-selected for matching luster. For the man who understands that more is sometimes more.',
    price: 15800,
    gemstone: {
      type: 'Black Diamond',
      carat: 6.2,
      origin: 'Brazil',
      clarity: 'Opaque',
      treatment: 'None',
    },
    metal: {
      type: 'Blackened 18K Gold',
      purity: '75%',
      weight: '19.2g',
    },
    specifications: {
      setting: 'Channel Set Multi-Stone',
      craftTime: '48 Hours',
      certification: 'IGI Certified',
      rarity: 'Limited to 8 pieces',
    },
    images: [
      '/products/midnight-phalanx-1.jpg',
      '/products/midnight-phalanx-2.jpg',
    ],
    category: 'diamond',
    collection: 'empire-collection',
    featured: false,
    inStock: true,
    quantity: 2,
    tags: ['Black Diamond', 'Multi-Stone', 'Statement', 'Bold'],
    createdAt: '2025-01-23',
  },

  // ═══════════════════════════════════════════════════════════
  // ALEXANDRITE COLLECTION
  // ═══════════════════════════════════════════════════════════
  {
    id: 'al-001',
    name: 'Chameleon Crown',
    slug: 'chameleon-crown',
    tagline: 'Emerald by Day, Ruby by Night',
    description: 'A rare 2.8ct Russian alexandrite displaying strong color change from green to red. The "emerald by day, ruby by night" phenomenon at its finest. Rarer than diamond, more fascinating than any other gem.',
    price: 44500,
    gemstone: {
      type: 'Russian Alexandrite',
      carat: 2.8,
      origin: 'Ural Mountains, Russia',
      clarity: 'VVS2',
      treatment: 'None',
    },
    metal: {
      type: 'Platinum 950',
      purity: '95%',
      weight: '10.2g',
    },
    specifications: {
      setting: 'Four-Prong with Diamond Accents',
      craftTime: '76 Hours',
      certification: 'GIA with Color Change Report',
      rarity: '< 0.001% of gems',
    },
    images: [
      '/products/chameleon-crown-1.jpg',
      '/products/chameleon-crown-2.jpg',
      '/products/chameleon-crown-3.jpg',
    ],
    category: 'alexandrite',
    collection: 'alpha-stones',
    featured: true,
    inStock: true,
    quantity: 1,
    tags: ['Alexandrite', 'Color Change', 'Russian', 'Museum Quality'],
    createdAt: '2025-01-25',
  },

  {
    id: 'al-002',
    name: 'Dual Nature',
    slug: 'dual-nature',
    tagline: 'Two Souls, One Stone',
    description: 'A 3.4ct Brazilian alexandrite with moderate color change. More affordable entry point into the world of this mystical gem. Still rare. Still captivating.',
    price: 18500,
    gemstone: {
      type: 'Brazilian Alexandrite',
      carat: 3.4,
      origin: 'Minas Gerais, Brazil',
      clarity: 'VS1',
      treatment: 'None',
    },
    metal: {
      type: '18K White Gold',
      purity: '75%',
      weight: '11.5g',
    },
    specifications: {
      setting: 'Bezel Setting',
      craftTime: '54 Hours',
      certification: 'GIA Certified',
      rarity: 'Natural Alexandrite - Always Rare',
    },
    images: [
      '/products/dual-nature-1.jpg',
      '/products/dual-nature-2.jpg',
    ],
    category: 'alexandrite',
    collection: 'heritage',
    featured: false,
    inStock: true,
    quantity: 2,
    tags: ['Alexandrite', 'Brazilian', 'Color Change', 'Unique'],
    createdAt: '2025-01-26',
  },
];

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

export const getFeaturedProducts = () => 
  products.filter(p => p.featured);

export const getProductsByCategory = (category: Product['category']) => 
  products.filter(p => p.category === category);

export const getProductsByCollection = (collection: Product['collection']) => 
  products.filter(p => p.collection === collection);

export const getProductBySlug = (slug: string) => 
  products.find(p => p.slug === slug);

export const getRelatedProducts = (productId: string, limit: number = 4) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => 
      p.id !== productId && 
      (p.category === product.category || p.collection === product.collection)
    )
    .slice(0, limit);
};

export const categories = [
  { 
    id: 'sapphire', 
    name: 'Sapphire', 
    description: 'Kashmir, Ceylon, Australian',
    icon: '💙'
  },
  { 
    id: 'emerald', 
    name: 'Emerald', 
    description: 'Colombian, Zambian',
    icon: '💚'
  },
  { 
    id: 'ruby', 
    name: 'Ruby', 
    description: 'Burmese, Mozambique',
    icon: '❤️'
  },
  { 
    id: 'tanzanite', 
    name: 'Tanzanite', 
    description: 'AAA Grade, Violet',
    icon: '💜'
  },
  { 
    id: 'tourmaline', 
    name: 'Paraíba', 
    description: 'Electric Blue',
    icon: '⚡'
  },
  { 
    id: 'diamond', 
    name: 'Black Diamond', 
    description: 'Natural, Bold',
    icon: '⚫'
  },
  { 
    id: 'alexandrite', 
    name: 'Alexandrite', 
    description: 'Color Change',
    icon: '🔮'
  },
];

export const collections = [
  {
    id: 'alpha-stones',
    name: 'Alpha Stones',
    description: 'The absolute pinnacle. Museum-quality gemstones for collectors.',
    tagline: 'When only the best will do',
  },
  {
    id: 'empire-collection',
    name: 'Empire Collection',
    description: 'Bold, commanding pieces for modern leaders.',
    tagline: 'Power refined',
  },
  {
    id: 'heritage',
    name: 'Heritage',
    description: 'Classic designs with timeless gemstones.',
    tagline: 'Tradition meets craft',
  },
  {
    id: 'modern-legends',
    name: 'Modern Legends',
    description: 'Contemporary settings with rare stones.',
    tagline: 'The future of luxury',
  },
];
