import { z } from 'zod';
import { portableTextBlockZ } from './portableTextBlock';

export const descriptionItemZ = z.object({
  title: z.string(),
  description: z.array(portableTextBlockZ),
});

export type DescriptionItem = z.infer<typeof descriptionItemZ>;
