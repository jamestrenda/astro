import { z } from 'zod';
import { baseBlockZ } from './base';
import { descriptionItemZ } from './descriptionItem';
import { portableTextBlockZ } from './portableTextBlock';

export const descriptionGridZ = baseBlockZ.extend({
  _type: z.literal('descriptionGrid'),
  header: z.array(portableTextBlockZ),
  items: z
    .array(descriptionItemZ)
    .nonempty('Description grid must have at least one item'),
});

export type DescriptionGrid = z.infer<typeof descriptionGridZ>;
