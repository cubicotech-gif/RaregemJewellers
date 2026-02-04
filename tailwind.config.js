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
        // LIGHT BACKGROUNDS (Use 90% of website)
        'luxury-white': '#FFFFFF',
        'luxury-cream': '#FBF9F6',
        'luxury-beige': '#F5F1EB',

        // PROPER GOLD COLORS (Not bright yellow!)
        'champagne': '#C9A868',
        'rose-gold': '#B76E79',
        'antique-gold': '#AA8453',
        'pale-gold': '#E8D7B5',

        // DARK COLORS (Use sparingly - 10% max)
        'luxury-black': '#1C1B1A',
        'charcoal': '#2F2F2F',

        // NEUTRAL GRAYS
        'warm-gray': '#8B8680',
        'light-gray': '#D4D0CC',
        'border-light': '#E8E4DF',

        // UI Colors (for compatibility)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#C9A868',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F5F1EB',
          foreground: '#1C1B1A',
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F5F1EB',
          foreground: '#8B8680',
        },
        accent: {
          DEFAULT: '#C9A868',
          foreground: '#1C1B1A',
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
        'heading': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        'body': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'display': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        'sans': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      fontSize: {
        'hero': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.2' }],
        'section': ['2.5rem', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      maxWidth: {
        '8xl': '1400px',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A868 0%, #E8D7B5 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1C1B1A 0%, #2F2F2F 100%)',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(28, 27, 26, 0.06)',
        'elegant-hover': '0 8px 30px rgba(201, 168, 104, 0.15)',
        'card': '0 2px 10px rgba(28, 27, 26, 0.04)',
        'card-hover': '0 4px 20px rgba(28, 27, 26, 0.08)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "2px",
        none: "0px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
