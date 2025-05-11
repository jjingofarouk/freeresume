// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "theme-navy": "var(--theme-navy)",
        "theme-dark-navy": "var(--theme-dark-navy)",
        "theme-emerald": {
          DEFAULT: "var(--theme-emerald)",
          hover: "#248b80",
        },
        "theme-gold": "var(--theme-gold)",
        "theme-light-gray": "var(--theme-light-gray)",
        "theme-black": "var(--theme-black)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        dot: "var(--background-dot)",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/aspect-ratio"),
  ],
};