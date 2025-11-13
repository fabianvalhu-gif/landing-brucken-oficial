export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans'", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        // Original landing colors
        ebony: "#111111",
        petrol: "#0A2540",
        electric: "#1B76FF",
        graphite: "#1C1C1C",
        bone: "#F4F5F7",
        
        // CRM Dashboard colors (modern real estate style)
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Purple
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        cream: '#FAF6F0',
        sand: '#E5DDD1',
        sage: '#9CA986',
      },
      boxShadow: {
        glow: "0 20px 60px rgba(10, 37, 64, 0.35)",
        soft: "0 2px 8px rgba(0, 0, 0, 0.04)",
        hover: "0 4px 16px rgba(0, 0, 0, 0.08)",
        card: "0 1px 3px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
