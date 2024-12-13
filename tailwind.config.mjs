/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        marquee:
          "marquee var(--speed, 10s) linear infinite var(--direction, forwards)",
        "fade-in-out": "fade-in-out var(--speed, 10s) linear infinite forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
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
          "4rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.01em",
          },
        ],
      },
      keyframes: {
        marquee: {
          to: {
            transform: "translateX(calc(-100cqw - 100%))",
          },
        },
        "fade-in-out": {
          "0%": {
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      screens: {
        xs: "580px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("starting", "@starting-style");
    },
  ],
};
