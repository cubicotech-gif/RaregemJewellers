/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand-black': '#1a1a1a',
        'brand-gold': '#B76E79',
        'brand-burgundy': '#8B0000',
        'brand-cream': '#F5F5DC',
        'brand-charcoal': '#2d2d2d',
        'brand-gray': '#888888',

        // Luxury Palette — Rose Gold & Blush
        'obsidian': '#0a0a0a',
        'steel': '#1c1c1e',
        'gold-royal': '#B76E79',
        'gold-light': '#E8B4B8',
        'blood-red': '#8B0000',
        'ivory': '#F5F5DC',

        // UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#B76E79',
          foreground: '#1a1a1a',
        },
        secondary: {
          DEFAULT: '#2d2d2d',
          foreground: '#E8E8E8',
        },
        destructive: {
          DEFAULT: '#8B0000',
          foreground: '#E8E8E8',
        },
        muted: {
          DEFAULT: '#2d2d2d',
          foreground: '#888888',
        },
        accent: {
          DEFAULT: '#B76E79',
          foreground: '#1a1a1a',
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
        'display': ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'playfair': ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'cormorant': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #B76E79 0%, #E8B4B8 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
        'gradient-obsidian': 'linear-gradient(180deg, #0a0a0a 0%, #1c1c1e 50%, #0a0a0a 100%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(183, 110, 121, 0.3)',
        'gold-sm': '0 0 15px rgba(183, 110, 121, 0.2)',
        'gold-lg': '0 0 60px rgba(183, 110, 121, 0.4)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.8)',
        'luxury-hover': '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(183, 110, 121, 0.15)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-gold': 'pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(183, 110, 121, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(183, 110, 121, 0.5)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
