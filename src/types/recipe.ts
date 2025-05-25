import { z } from 'zod';
import { galleryZ } from './gallery';
import { ingredientZ } from './ingredient';
import { portableTextBlockZ } from './portableTextBlock';

export const recipeZ = z.object({
  title: z.string().optional().nullable(),
  slug: z.string(),
  publishedAt: z.string().optional(),
  updatedAt: z.string().nullable(),
  gallery: galleryZ.optional().nullable(),
  ingredients: z
    .array(
      z.object({
        _key: z.string(),
        ingredient: ingredientZ,
        measurement: z.object({
          amount: z.string().optional().nullable(),
          unit: z.string().optional().nullable(),
        }),
        notes: z.string().optional().nullable(),
      }),
    )
    .optional()
    .nullable(),
  instructions: z.array(portableTextBlockZ).optional().nullable(),
  notes: z.array(portableTextBlockZ).optional().nullable(),
});

export type Recipe = z.infer<typeof recipeZ>;
