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
        // Brand
        'brand-black': '#0c0c0c',
        'brand-gold': '#B76E79',
        'brand-burgundy': '#8B0000',
        'brand-cream': '#F0EDE8',
        'brand-charcoal': '#1a1a1a',
        'brand-gray': '#888888',

        // Obsidian Glass Palette
        'obsidian': '#060606',
        'steel': '#111113',
        'gold-royal': '#B76E79',
        'gold-light': '#D4A0A8',
        'blood-red': '#8B0000',
        'ivory': '#F0EDE8',

        // UI
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: '#B76E79', foreground: '#0c0c0c' },
        secondary: { DEFAULT: '#1a1a1a', foreground: '#F0EDE8' },
        destructive: { DEFAULT: '#8B0000', foreground: '#F0EDE8' },
        muted: { DEFAULT: '#1a1a1a', foreground: '#666666' },
        accent: { DEFAULT: '#B76E79', foreground: '#0c0c0c' },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
      },
      fontFamily: {
        'display': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        'playfair': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        'sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'cormorant': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #B76E79 0%, #D4A0A8 50%, #B76E79 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0c0c0c 0%, #111113 100%)',
        'gradient-obsidian': 'linear-gradient(180deg, #060606 0%, #111113 50%, #060606 100%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(183, 110, 121, 0.15)',
        'gold-sm': '0 0 15px rgba(183, 110, 121, 0.1)',
        'gold-lg': '0 0 60px rgba(183, 110, 121, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'luxury': '0 25px 60px rgba(0, 0, 0, 0.6)',
        'luxury-hover': '0 35px 80px rgba(0, 0, 0, 0.7)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
