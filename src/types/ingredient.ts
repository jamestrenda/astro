import { z } from 'zod';

export const ingredientZ = z.object({
  title: z.string().optional().nullable(),
  url: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
});

export type Ingredient = z.infer<typeof ingredientZ>;
