import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_BASE_PATH,
} = loadEnv(import.meta.env.MODE, process.cwd(), '');

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
  }),
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
      dataset: PUBLIC_SANITY_STUDIO_DATASET,
      studioBasePath: PUBLIC_SANITY_STUDIO_BASE_PATH,
      stega: {
        studioUrl: PUBLIC_SANITY_STUDIO_BASE_PATH,
      },
      // Set useCdn to false if you're building statically.
      useCdn: false,
    }),
    react(),
  ],
  image: {
    domains: ['cdn.sanity.io'],
  },
  vite: {
    plugins: [
      tailwindcss({
        applyBaseStyles: false,
        nesting: true,
      }),
    ],
  },
});
