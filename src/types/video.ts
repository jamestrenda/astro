import { z } from 'zod';
import { baseBlockZ } from './base';

export const videoZ = baseBlockZ.extend({
  _type: z.literal('video'),
  id: z.string(),
  hashed_id: z.string(),
  thumbnailAltText: z.string().optional(),
});

export type Video = z.infer<typeof videoZ>;
