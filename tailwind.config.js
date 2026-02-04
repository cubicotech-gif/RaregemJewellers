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
        // Brand Colors
        'brand-black': '#1a1a1a',      // Primary dark
        'brand-gold': '#D4AF37',        // Primary accent
        'brand-burgundy': '#8B0000',    // Secondary accent
        'brand-cream': '#F5F5DC',       // Neutral light
        'brand-charcoal': '#2d2d2d',   // Card backgrounds
        'brand-gray': '#888888',        // Muted text

        // UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#D4AF37',
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
          DEFAULT: '#D4AF37',
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
        'sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F4E4B0 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 175, 55, 0.3)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.8)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
