/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssTypography from "@tailwindcss/typography";

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        marquee:
          'marquee var(--speed, 10s) linear infinite var(--direction, forwards)',
        'text-marquee':
          'text-marquee var(--speed, 10s) linear infinite var(--direction, forwards)',
        'fade-in-out':
          'fade-in-out var(--speed, 10s) linear infinite var(--direction, forwards)',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        accent: 'hsl(var(--accent))',
        border: 'hsl(var(--border))',
        destructive: 'hsl(var(--destructive))',
        'destructive-light': 'hsl(var(--destructive-light))',
        positive: 'hsl(var(--positive))',
        'positive-light': 'hsl(var(--positive-light))',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // fontSize: {
      //   '7xl': [
      //     '6.5rem',
      //     {
      //       lineHeight: '1.1',
      //       letterSpacing: '-0.01em',
      //     },
      //   ],
      //   '6xl': [
      //     '4rem',
      //     {
      //       lineHeight: '1',
      //       letterSpacing: '-0.01em',
      //     },
      //   ],
      // },
      keyframes: {
        marquee: {
          to: {
            transform: 'translateX(calc(-100cqw - 100%))',
          },
        },
        'text-marquee': {
          to: {
            transform: 'translateX(-50%)',
          },
        },
        'fade-in-out': {
          '0%': {
            opacity: '0',
          },
          '2.5%': {
            opacity: '1',
          },
          '98%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      screens: {
        xs: '580px',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('starting', '@starting-style');
    },
    require('tailwind-gradient-mask-image'),
    tailwindcssTypography
  ],
};
