import { z } from 'zod';

export const baseLinkZ = z.object({
  _type: z.string(),
  _key: z.string(),
  linkText: z.string().optional().nullable(),
  anchor: z.string().optional().nullable(),
  params: z
    .array(
      z.object({
        key: z.string().optional().nullable(),
        value: z.string().optional().nullable(),
      }),
    )
    .optional()
    .nullable(),
});
