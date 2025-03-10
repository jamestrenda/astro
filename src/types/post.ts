import { z } from 'zod';
import { imageZ } from './image';
import { portableTextZ } from './portableText';
import { seoZ } from './seo';
import { tagZ } from './tag';
import { tocZ } from './toc';
export const postZ = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string().optional().nullable(),
  body: portableTextZ.optional().nullable(),
  excerpt: z.string().optional().nullable(),
  repo: z.string().url().optional().nullable(),
  image: imageZ.optional().nullable(),
  slug: z.string(),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional().nullable(),
  tags: z.array(tagZ).optional().nullable(),
  seo: seoZ.optional().nullable(),
  toc: tocZ,
});

export type Post = z.infer<typeof postZ>;
