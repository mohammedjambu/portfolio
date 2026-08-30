/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: {
          DEFAULT: "#F8F9FA",
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
        onyx: "var(--color-onyx)",
        subtle: "var(--color-subtle)",
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "rgba(37, 99, 235, 0.7)", // This creates a very subtle blue tint
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
