import { z } from 'zod';
import { baseBlockZ } from './base';
import { portableTextBlockZ } from './portableTextBlock';

export const blockquoteZ = baseBlockZ.extend({
  _type: z.literal('blockquote'),
  quote: z.array(portableTextBlockZ),
  cite: z.array(portableTextBlockZ),
});

export type Blockquote = z.infer<typeof blockquoteZ>;
