import {definePlugin} from 'sanity'
import {schemaTypes} from './schema'

interface SocialMediaProfilesPluginConfig {
  /* nothing here yet */
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {SocialMediaProfilesPlugin} from 'sanity-plugin-social-media-profiles'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [SocialMediaProfilesPlugin()],
 * })
 * ```
 */
export const SocialMediaProfilesPlugin = definePlugin<SocialMediaProfilesPluginConfig | void>(
  (config = {}) => {
    return {
      name: 'sanity-plugin-social-media-profiles',
      schema: {
        types: schemaTypes,
      },
    }
  },
)
