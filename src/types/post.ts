import { z } from 'zod';
import { imageZ } from './image';
import { portableTextBlockZ, portableTextZ } from './portableText';
import { tagZ } from './tag';

export const postZ = z.object({
  title: z.string().optional().nullable(),
  body: portableTextZ.optional().nullable(),
  excerpt: z.string().optional().nullable(),
  image: imageZ.optional().nullable(),
  slug: z.string(),
  publishedAt: z.string().optional().nullable(),
  tags: z.array(tagZ).optional().nullable(),
  toc: z
    .array(
      portableTextBlockZ
        .pick({
          _type: true,
          _key: true,
        })
        .extend({
          style: z.union([z.literal('h2'), z.literal('h3'), z.literal('h4')]),
          text: portableTextBlockZ.shape.children.element.shape.text,
          anchor: z.string(),
        }),
    )
    .optional()
    .nullable(),
});

export type Post = z.infer<typeof postZ>;
