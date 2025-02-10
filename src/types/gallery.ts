import { z } from 'zod';
import { baseBlockZ } from './base';
import { imageZ } from './image';

export const galleryZ = baseBlockZ.extend({
  _type: z.literal('gallery'),
  images: z.array(imageZ).nullable().optional(),
});

export type Gallery = z.infer<typeof galleryZ>;
