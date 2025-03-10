import { z } from 'zod';
import { imageZ } from './image';
import { tagZ } from './tag';

export const postCardZ = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  image: imageZ.optional().nullable(),
  slug: z.string(),
  publishedAt: z.string().optional(),
  tags: z
    .array(
      tagZ.pick({
        title: true,
        slug: true,
      }),
    )
    .optional()
    .nullable(),
});

export type PostCard = z.infer<typeof postCardZ>;
