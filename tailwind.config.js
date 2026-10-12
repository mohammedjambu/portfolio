/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: {
          DEFAULT: "var(--porcelain)",
          50: "#FFFFFF",
          100: "#F8F9FA",
          200: "#F1F3F5",
          300: "#E9ECEF",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#6C757D",
          700: "#495057",
          800: "#343A40",
          900: "#1A1D20",
          950: "#111113",
        },
        onyx: "var(--onyx)",
        surface: "var(--surface)",
        subtle: "var(--subtle)",
        "border-subtle": "var(--border-subtle)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "color-mix(in srgb, var(--accent) 70%, transparent)",
        },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Instrument Serif"', "serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
        tight: "-0.01em",
        editorial: "-0.02em",
      },
    },
  },
  plugins: [],
};