import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_BASE_PATH,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
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
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
  ],
  image: {
    domains: ["cdn.sanity.io"],
  },
});
