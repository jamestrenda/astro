import { z } from 'zod';
import { baseBlockZ } from './base';
import { blockquoteZ } from './blockquote';
import { externalLinkZ } from './externalLink';
import { imageZ } from './image';
import { internalRefZ } from './internalRef';

// PortableText block schema (Sanity's "block" type)
export const portableTextBlockZ = baseBlockZ.extend({
  _type: z.literal('block'),
  children: z.array(
    z.object({
      _type: z.literal('span'),
      text: z.string(),
      marks: z.array(z.string()).optional(),
      // marks: z.any().optional(),
    }),
  ),
  style: z.union([
    z.literal('normal'),
    z.literal('h1'),
    z.literal('h2'),
    z.literal('h3'),
    z.literal('h4'),
    z.literal('h5'),
    z.literal('overline'),
    // z.literal('blockquote'),
  ]),
  markDefs: z.array(z.union([internalRefZ, externalLinkZ])).optional(),
  anchor: z.string().optional(),
});

export const portableTextZ = z.array(
  z.union([portableTextBlockZ, blockquoteZ, imageZ]),
);

export type PortableTextBlock = z.infer<typeof portableTextBlockZ>;
export type PortableText = z.infer<typeof portableTextZ>;
