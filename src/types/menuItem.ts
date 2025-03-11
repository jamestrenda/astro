import { z } from 'zod';
import { linkZ } from './link';

export const menuItemZ = z.object({
  _key: z.string(),
  _type: z.literal('menuItem'),
  link: linkZ.optional().nullable(),
  description: z.string().optional().nullable(),
});

export type MenuItem = z.infer<typeof menuItemZ>;
