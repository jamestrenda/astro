import { z } from 'zod';
import { baseBlockZ } from './base';

export const featureZ = baseBlockZ.extend({
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export type Feature = z.infer<typeof featureZ>;
