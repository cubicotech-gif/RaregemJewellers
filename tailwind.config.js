/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // The Palette of Dominance
        'void-black': '#000000',
        'obsidian': '#0A0A0A',
        'charcoal': '#1C1C1C',
        'steel': '#2A2A2A',
        'gold-empire': '#CFB53B',
        'gold-royal': '#D4AF37',
        'gold-whisper': '#E8D5A7',
        'blood-red': '#8B0000',
        'ice-white': '#F8F8F8',

        // Gemstone Accents
        'kashmir-sapphire': '#0D47A1',
        'colombian-emerald': '#00695C',
        'pigeon-blood-ruby': '#B71C1C',
        'paraiba-tourmaline': '#00BCD4',
        'tanzanite-violet': '#673AB7',

        // Legacy brand aliases
        'brand-black': '#000000',
        'brand-gold': '#D4AF37',
        'brand-burgundy': '#8B0000',
        'brand-cream': '#F8F8F8',
        'brand-charcoal': '#1C1C1C',
        'brand-gray': '#888888',

        // UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#D4AF37',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#1C1C1C',
          foreground: '#F8F8F8',
        },
        destructive: {
          DEFAULT: '#8B0000',
          foreground: '#F8F8F8',
        },
        muted: {
          DEFAULT: '#1C1C1C',
          foreground: '#888888',
        },
        accent: {
          DEFAULT: '#D4AF37',
          foreground: '#000000',
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'headline': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'accent': ['Cinzel', 'Georgia', 'serif'],
        'tech': ['"Space Mono"', 'Menlo', 'monospace'],
      },
      fontSize: {
        'hero': ['96px', { lineHeight: '1.1', letterSpacing: '-2px', fontWeight: '700' }],
        'display': ['64px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '600' }],
        'heading': ['48px', { lineHeight: '1.3', letterSpacing: '0px', fontWeight: '600' }],
        'subheading': ['32px', { lineHeight: '1.4', letterSpacing: '1px', fontWeight: '500' }],
        'micro': ['12px', { lineHeight: '1.4', letterSpacing: '2px', fontWeight: '500' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F4E4B0 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0A 0%, #1C1C1C 100%)',
        'gradient-obsidian': 'linear-gradient(180deg, #0A0A0A 0%, #1C1C1C 100%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 175, 55, 0.3)',
        'gold-intense': '0 0 40px rgba(212,175,55,0.3), 0 20px 60px rgba(0,0,0,0.6)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.8)',
        'header': '0 4px 30px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        goldSweep: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      animation: {
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gold-sweep': 'goldSweep 0.8s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
