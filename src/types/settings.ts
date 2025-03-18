import { z } from 'zod';
import { menuZ } from './menu';
import { socialZ } from './social';

export const settingsZ = z.object({
  siteTitle: z.string(),
  siteUrl: z.string().url(),
  favicon: z.string().url(),
  social: socialZ.optional().nullable(),
  blogIndexSlug: z.string().nullable().optional(),
  footer: z
    .object({
      menus: z.array(menuZ).optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type Settings = z.infer<typeof settingsZ>;
