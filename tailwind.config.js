// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "theme-dark-teal": "var(--theme-dark-teal)",
        "theme-teal": "var(--theme-teal)",
        "theme-teal-dark": "var(--theme-teal-dark)",
        "theme-orange": "var(--theme-orange)",
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
        dot: "url('/assets/dots.svg')",
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