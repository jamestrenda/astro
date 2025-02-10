import { z } from 'zod';
import { galleryZ } from './gallery';
import { ingredientZ } from './ingredient';
import { portableTextZ } from './portableText';

export const recipeZ = z.object({
  title: z.string().optional().nullable(),
  slug: z.string(),
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
  instructions: z.array(portableTextZ).optional().nullable(),
  notes: z.array(portableTextZ).optional().nullable(),
});

export type Recipe = z.infer<typeof recipeZ>;
