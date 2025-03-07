import { z } from 'zod';
import { blockZ } from './block';
import { seoZ } from './seo';

export const pageZ = z.object({
  _id: z.string(),
  _type: z.literal('page'),
  slug: z.string(),
  blocks: z.array(blockZ).nonempty('Page must have at least one block'),
  seo: seoZ,
});

export type Page = z.infer<typeof pageZ>;
