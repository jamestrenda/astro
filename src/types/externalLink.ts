import type { PortableTextMarkDefinition } from '@portabletext/types';
import { z } from 'zod';
import { baseBlockZ } from './base';

export const externalLinkZ = baseBlockZ.extend({
  _type: z.literal('externalLink'),
  url: z.string().nullable(),
  newWindow: z.boolean(),
});

interface externalLinkSchema extends z.infer<typeof externalLinkZ> {}
export interface externalLink
  extends externalLinkSchema,
    PortableTextMarkDefinition {
  _type: externalLinkSchema['_type'];
}
