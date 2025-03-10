import { z } from 'zod';

export const tagZ = z.object({
  _type: z.literal('tag'),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
});

export type Tag = z.infer<typeof tagZ>;
