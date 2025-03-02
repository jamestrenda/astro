import { z } from 'zod';
import { baseBlockZ } from './base';
import { portableTextBlockZ } from './portableTextBlock';

export const textBlockZ = baseBlockZ.extend({
  _type: z.literal('textBlock'),
  portableText: z.array(portableTextBlockZ),
});

export type TextBlock = z.infer<typeof textBlockZ>;
