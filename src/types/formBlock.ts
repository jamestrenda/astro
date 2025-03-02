import { z } from 'zod';
import { baseBlockZ } from './base';
import { formQueryParamsZ, formZ } from './form';
import { portableTextBlockZ } from './portableTextBlock';

export const formBlockZ = z
  .object({
    ...baseBlockZ.shape,
    ...formQueryParamsZ.shape,
  })
  .extend({
    _type: z.literal('form'),
    text: z.array(portableTextBlockZ).optional().nullable(),
    form: formZ.pick({
      description: true,
      fields: true,
      honeypot: true,
    }),
  });

export type FormBlock = z.infer<typeof formBlockZ>;
