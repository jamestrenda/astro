import { z } from 'zod';
import { baseBlockZ } from './base';

export const textMarqueeZ = baseBlockZ.extend({
  _type: z.literal('textMarquee'),
  speed: z.number().int().positive(),
  direction: z.enum(['forwards', 'reverse']),
  items: z.array(z.string()).nullable().optional(),
});

export const textMarqueeBlockZ = baseBlockZ.extend({
  _type: z.literal('textMarqueeBlock'),
  marquees: z.array(textMarqueeZ).nullable(),
});

export type TextMarquee = z.infer<typeof textMarqueeZ>;
