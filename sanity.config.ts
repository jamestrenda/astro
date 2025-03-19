import { FormBuilderPlugin } from '@hatchd/sanity-plugin-form-builder';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { articleFeedBlock } from '@trenda/sanity-plugin-page-blocks';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { media } from 'sanity-plugin-media';
import { wistiaInput } from 'sanity-plugin-wistia-input';
import { defineDocuments, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { documentActionsPlugin } from '~/studio/plugins/documentActionsPlugin';
import { SocialMediaProfilesPlugin } from '~/studio/plugins/socialMediaProfilesPlugin';
import { locations } from '~/studio/presentation/locate';
import { articleFeed } from '~/studio/schema/objects/articleFeed';
import { getEnv } from '~/utils/env';
import { SINGLETON_TYPES, schemaTypes } from './src/studio/schema';
import { structure } from './src/studio/structure';

export const projectId = getEnv().PUBLIC_SANITY_STUDIO_PROJECT_ID;
export const dataset = getEnv().PUBLIC_SANITY_STUDIO_DATASET;
export const apiVersion = getEnv().PUBLIC_SANITY_STUDIO_API_VERSION;
const wistiaToken = getEnv().PUBLIC_SANITY_STUDIO_WISTIA_TOKEN;

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2,
    )}`,
  );
}

export default defineConfig({
  name: 'production',
  title: 'Production',
  projectId,
  dataset,
  plugins: [
    presentationTool({
      previewUrl: {
        origin: location.origin,
        previewMode: {
          enable: '/api/preview',
        },
      },
      resolve: {
        locations,
        mainDocuments: defineDocuments([
          {
            route: '/',
            type: 'siteSettings',
          },
          {
            route: '/blog/:slug',
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
      },
    }),
    structureTool({
      structure,
    }),
    documentActionsPlugin(),
    visionTool(),
    media(),
    unsplashImageAsset(),
    FormBuilderPlugin(),
    SocialMediaProfilesPlugin(),
    codeInput(),
    wistiaInput({
      token: wistiaToken,
    }),
    articleFeedBlock(articleFeed),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const excludedTypes = [...SINGLETON_TYPES];

      const post = {
        id: 'post-taxonomy',
        title: 'Post by Tag',
        schemaType: 'post',
        parameters: [{ name: 'id', type: 'string' }],
        value: (params: any) => ({
          tags: [{ _type: 'reference', _ref: params.id }],
        }),
      };

      return [
        ...prev.filter(
          ({ schemaType }) =>
            !excludedTypes.includes(
              schemaType as (typeof excludedTypes)[number],
            ),
        ),
        post,
      ];
    },
  },
  scheduledPublishing: {
    enabled: false,
  },
});
