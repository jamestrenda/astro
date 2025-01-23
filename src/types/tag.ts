import { z } from 'zod';

export const tagZ = z.object({
  title: z.string(),
  slug: z.string(),
});

export type Tag = z.infer<typeof tagZ>;
