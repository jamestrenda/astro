import { z } from 'zod';

export const ogZ = z.object({
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
});

export type Og = z.infer<typeof ogZ>;
