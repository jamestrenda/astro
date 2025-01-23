import { z } from 'zod';
import { baseBlockZ } from './base';
import { imageZ } from './image';
import { marqueeZ } from './marquee';
import { portableTextZ } from './portableText';

export const heroZ = baseBlockZ.extend({
  _type: z.literal('hero'),
  valueProposition: z.array(portableTextZ),
  logos: z.array(marqueeZ).nullable().optional(),
  image: imageZ.nullable().optional(),
});

export type Hero = z.infer<typeof heroZ>;
