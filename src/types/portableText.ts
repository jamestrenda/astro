import type { PortableTextBlock as PortableTextBlockInternalType } from '@portabletext/react';
import { z } from 'zod';
import { blockquoteZ } from './blockquote';
import { imageZ } from './image';
import { portableTextBlockZ } from './portableTextBlock';
export const portableTextBlockTypes = z.discriminatedUnion('_type', [
  portableTextBlockZ,
  blockquoteZ,
  imageZ,
]);

export const portableTextZ = z.array(portableTextBlockTypes);

export type PortableTextBlock = PortableTextBlockInternalType &
  z.infer<typeof portableTextBlockZ>;
export type PortableText = z.infer<typeof portableTextZ>;
export type PortableTextBlockType = z.infer<typeof portableTextBlockTypes>;
