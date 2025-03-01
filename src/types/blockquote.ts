import { z } from 'zod';
import { portableTextZ } from './portableText';

export const blockquoteZ = z.object({
  quote: z.array(portableTextZ),
  cite: z.array(portableTextZ),
});
