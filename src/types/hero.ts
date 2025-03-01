import { z } from 'zod';
import { baseBlockZ } from './base';
import { imageZ } from './image';
import { marqueeZ } from './marquee';
import { portableTextBlockZ } from './portableText';

export const heroZ = baseBlockZ.extend({
  _type: z.literal('hero'),
  valueProposition: z.array(portableTextBlockZ),
  logos: z.array(marqueeZ).nullable().optional(),
  image: imageZ.nullable().optional(),
});

export type Hero = z.infer<typeof heroZ>;
