import { z } from 'zod';
import { portableTextZ } from './portableText';

export const descriptionItemZ = z.object({
  title: z.string(),
  description: z.array(portableTextZ),
});
