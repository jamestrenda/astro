import { z } from 'zod';
import { menuItemZ } from './menuItem';

export const menuZ = z.object({
  _id: z.string(),
  _type: z.literal('menu'),
  title: z.string().optional().nullable(),
  items: z.array(menuItemZ).optional().nullable(),
});

export type Menu = z.infer<typeof menuZ>;
