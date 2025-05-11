/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "theme-dark-teal": "rgb(var(--theme-dark-teal) / <alpha-value>)",
        "theme-teal": "rgb(var(--theme-teal) / <alpha-value>)",
        "theme-teal-dark": "rgb(var(--theme-teal-dark) / <alpha-value>)",
        "theme-orange": "rgb(var(--theme-orange) / <alpha-value>)",
        "theme-light-gray": "rgb(var(--theme-light-gray) / <alpha-value>)",
        "theme-black": "rgb(var(--theme-black) / <alpha-value>)",
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