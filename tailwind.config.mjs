/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))",
      },
      fontSize: {
        "7xl": [
          "6.5rem",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.01em",
          },
        ],
        "6xl": [
          "5rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.01em",
          },
        ],
      },
    },
  },
  plugins: [],
};
