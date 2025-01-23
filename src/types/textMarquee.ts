import { z } from 'zod';
import { baseBlockZ } from './base';

export const textMarqueeZ = baseBlockZ.extend({
  _type: z.literal('textMarquee'),
  speed: z.number().int().positive(),
  direction: z.union([z.literal('forwards'), z.literal('reverse')]),
  items: z
    .array(
      z.object({
        _key: z.string(),
        value: z.string().min(1),
        featured: z.boolean(),
      }),
    )
    .nullable()
    .optional(),
});

export const textMarqueeBlockZ = baseBlockZ.extend({
  _type: z.literal('textMarqueeBlock'),
  marquees: z.array(textMarqueeZ).nullable(),
});

export type TextMarquee = z.infer<typeof textMarqueeZ>;
