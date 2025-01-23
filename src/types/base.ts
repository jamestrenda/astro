import { z } from 'zod';

// Base block schema (common fields)
export const baseBlockZ = z.object({
  _type: z.string(),
  _key: z.string(),
});
