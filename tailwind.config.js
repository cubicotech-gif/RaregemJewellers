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
        // KRONOS Brand Colors — Refined Luxury Palette
        'kronos-black': '#0A0A0A',
        'kronos-brown': '#161210',
        'kronos-gold': '#D4AF37',
        'kronos-gold-light': '#E8CC6E',
        'kronos-gold-dark': '#B8962E',
        'kronos-rose': '#9B3A3A',
        'kronos-rose-light': '#C45656',
        'kronos-sapphire': '#1E4D8C',
        'kronos-sapphire-light': '#2B6BC4',
        'kronos-emerald': '#1B6B4E',
        'kronos-emerald-light': '#26A06F',
        'kronos-tanzanite': '#5B3E8C',
        'kronos-tanzanite-light': '#7B5BB5',
        'kronos-white': '#F5F0E8',
        'kronos-cream': '#EDE4D4',
        'kronos-muted': '#9A8E80',
        'kronos-steel': '#1E1C1A',
        'kronos-charcoal': '#121110',

        // Legacy aliases for compatibility
        'brand-black': '#0A0A0A',
        'brand-gold': '#D4AF37',
        'brand-burgundy': '#9B3A3A',
        'brand-cream': '#F5F0E8',
        'brand-charcoal': '#161210',
        'brand-gray': '#9A8E80',

        // UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#D4AF37',
          foreground: '#0A0A0A',
        },
        secondary: {
          DEFAULT: '#161210',
          foreground: '#F5F0E8',
        },
        destructive: {
          DEFAULT: '#9B3A3A',
          foreground: '#F5F0E8',
        },
        muted: {
          DEFAULT: '#161210',
          foreground: '#9A8E80',
        },
        accent: {
          DEFAULT: '#D4AF37',
          foreground: '#0A0A0A',
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
        'sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'hero-lg': ['5.5rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading3': ['1.75rem', { lineHeight: '1.3' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #B8962E 0%, #D4AF37 25%, #E8CC6E 50%, #D4AF37 75%, #B8962E 100%)',
        'gradient-gold-subtle': 'linear-gradient(135deg, #D4AF37 0%, #E8CC6E 50%, #D4AF37 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0A 0%, #161210 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 50%, #0A0A0A 100%)',
        'gradient-radial-gold': 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
        'gradient-diagonal': 'linear-gradient(135deg, #0A0A0A 0%, #161210 50%, #1E1C1A 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(212,175,55,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(91,62,140,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(30,77,140,0.06) 0px, transparent 50%)',
      },
      boxShadow: {
        'gold': '0 0 40px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 60px rgba(212, 175, 55, 0.25)',
        'gold-xl': '0 0 100px rgba(212, 175, 55, 0.2), 0 0 40px rgba(212, 175, 55, 0.1)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.05)',
        'luxury': '0 25px 80px rgba(0, 0, 0, 0.9)',
        'luxury-hover': '0 35px 100px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.1)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.08)',
        'inner-gold': 'inset 0 0 30px rgba(212, 175, 55, 0.05)',
        'elegant': '0 10px 50px rgba(0, 0, 0, 0.8), 0 0 1px rgba(212, 175, 55, 0.2)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay': 'fadeUp 0.8s ease-out 0.2s forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'border-glow': 'borderGlow 4s ease-in-out infinite',
        'text-shimmer': 'textShimmer 4s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'particle-float': 'particleFloat 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)' },
          '50%': { boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(212, 175, 55, 0.1)' },
          '50%': { borderColor: 'rgba(212, 175, 55, 0.4)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { transform: 'translate(100px, -100px) rotate(180deg)', opacity: '0.5' },
          '90%': { opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-gentle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
