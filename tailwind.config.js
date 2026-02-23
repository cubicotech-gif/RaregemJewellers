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
        // KRONOS Brand Colors
        'kronos-black': '#0D0D0D',
        'kronos-brown': '#1A1410',
        'kronos-gold': '#C9A96E',
        'kronos-rose': '#8B3A3A',
        'kronos-sapphire': '#1B3A5C',
        'kronos-emerald': '#1B4D3E',
        'kronos-white': '#F5F0E8',
        'kronos-muted': '#A89B8C',

        // Legacy aliases for compatibility
        'brand-black': '#0D0D0D',
        'brand-gold': '#C9A96E',
        'brand-burgundy': '#8B3A3A',
        'brand-cream': '#F5F0E8',
        'brand-charcoal': '#1A1410',
        'brand-gray': '#A89B8C',

        // UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#C9A96E',
          foreground: '#0D0D0D',
        },
        secondary: {
          DEFAULT: '#1A1410',
          foreground: '#F5F0E8',
        },
        destructive: {
          DEFAULT: '#8B3A3A',
          foreground: '#F5F0E8',
        },
        muted: {
          DEFAULT: '#1A1410',
          foreground: '#A89B8C',
        },
        accent: {
          DEFAULT: '#C9A96E',
          foreground: '#0D0D0D',
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
        'hero': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading3': ['1.75rem', { lineHeight: '1.3' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #E8D5A8 50%, #C9A96E 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0D0D0D 0%, #1A1410 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.7) 50%, #0D0D0D 100%)',
      },
      boxShadow: {
        'gold': '0 0 40px rgba(201, 169, 110, 0.15)',
        'gold-lg': '0 0 60px rgba(201, 169, 110, 0.25)',
        'luxury': '0 25px 80px rgba(0, 0, 0, 0.9)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
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
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 169, 110, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
