import { z } from 'zod';
import { baseLinkZ } from './baseLink';

export const relativeUrlZ = baseLinkZ
  .extend({
    _type: z.literal('relativeUrl'),
    url: z.string(),
  })
  .omit({ anchor: true, params: true });

export type RelativeUrl = z.infer<typeof relativeUrlZ>;
