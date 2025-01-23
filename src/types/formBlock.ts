import { z } from 'zod';
import { baseBlockZ } from './base';
import { formQueryParamsZ, formZ } from './form';
import { portableTextZ } from './portableText';

export const formBlockZ = z
  .object({
    ...baseBlockZ.shape,
    ...formQueryParamsZ.shape,
  })
  .extend({
    _type: z.literal('form'),
    text: z.array(portableTextZ).optional().nullable(),
    form: formZ.pick({
      description: true,
      fields: true,
      honeypot: true,
    }),
  });

export type FormBlock = z.infer<typeof formBlockZ>;
