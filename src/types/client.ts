import { z } from 'zod';
import { baseBlockZ } from './base';
import { imageZ } from './image';
import { portableTextZ } from './portableText';

export const clientZ = baseBlockZ.extend({
  _type: z.literal('client'),
  name: z.string().optional().nullable(),
  shortName: z.string().optional().nullable(),
  description: z.array(portableTextZ).optional().nullable(),
  logo: imageZ.optional().nullable(),
  website: z.string().url().optional().nullable(),
});

export type Client = z.infer<typeof clientZ>;
