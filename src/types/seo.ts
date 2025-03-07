import { z } from 'zod';

export const seoZ = z.object({
  title: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  keywords: z.array(z.string()).optional().nullable(),
});

export type Seo = z.infer<typeof seoZ>;
