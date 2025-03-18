import { z } from 'zod';
import { baseBlockZ } from './base';
import { imageZ } from './image';
import { portableTextBlockZ } from './portableTextBlock';

export const heroZ = baseBlockZ.extend({
  _type: z.literal('hero'),
  valueProposition: z.array(portableTextBlockZ),
  image: imageZ.nullable().optional(),
});

export type Hero = z.infer<typeof heroZ>;
