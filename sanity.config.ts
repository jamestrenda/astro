import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { defineDocuments, presentationTool } from "sanity/presentation";
import { SINGLETON_TYPES, schemaTypes } from "./src/studio/schema";
import { structure } from "./src/studio/structure";
import { locations } from "~/studio/presentation/locate";
import { getEnv } from "~/utils/env";
import { PublishDocumentWithSlugAction } from "~/studio/schema/actions/publishWithSlugAction";
import { PublishHomeSettingsAction } from "~/studio/schema/actions/publishHomeSettingsAction";

const projectId = getEnv().PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = getEnv().PUBLIC_SANITY_STUDIO_DATASET;
export const apiVersion = getEnv().PUBLIC_SANITY_STUDIO_API_VERSION;

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

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "production",
  title: "Production",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      previewUrl: {
        origin: location.origin,
        previewMode: {
          enable: "/api/preview",
        },
      },
      resolve: {
        locations,
        mainDocuments: defineDocuments([
          {
            route: "/",
            type: "siteSettings",
          },
          {
            route: "/blog/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
      },
    }),
    visionTool(),
    media(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev, context) => {
      const excludedTypes = [...SINGLETON_TYPES];

      const post = {
        id: "post-taxonomy",
        title: "Post by Tag",
        schemaType: "post",
        parameters: [{ name: "id", type: "string" }],
        value: (params: any) => ({
          tags: [{ _type: "reference", _ref: params.id }],
        }),
      };

      return [
        ...prev.filter(
          ({ schemaType }) =>
            !excludedTypes.includes(
              schemaType as (typeof excludedTypes)[number]
            )
        ),
        post,
      ];
    },
  },
  document: {
    actions: (prev, context) => {
      const homeSettingsActions = prev
        .filter(({ action }) => action && singletonActions.has(action))
        .map((originalAction) =>
          originalAction.action === "publish"
            ? PublishHomeSettingsAction(originalAction, context)
            : originalAction
        );

      switch (context.schemaType) {
        case "home":
          return homeSettingsActions;
        case "page":
          return prev.map((originalAction) =>
            originalAction.action === "publish"
              ? PublishDocumentWithSlugAction(originalAction, context)
              : originalAction
          );
        default:
          return SINGLETON_TYPES.has(context.schemaType)
            ? prev.filter(
                ({ action }) => action && singletonActions.has(action)
              )
            : prev;
      }
    },
  },
});
