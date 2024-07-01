// sanity.config.ts
// Different environments use different variables

import { debugSecrets } from "@sanity/preview-url-secret/sanity-plugin-debug-secrets";

const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! ||
  import.meta.env.PUBLIC_SANITY_DATASET!;

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/schema";

export default defineConfig({
  name: "production",
  title: "Production",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      title: "Visual Editor",
      previewUrl: {
        // @TODO change to the URL of the application, or `location.origin` if it's an embedded Studio
        origin: location.origin,
        previewMode: {
          enable: "/api/preview",
        },
      },
    }),
    visionTool(),
    debugSecrets(),
  ],
  schema: {
    types: schemaTypes,
  },
});
