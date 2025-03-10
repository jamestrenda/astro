import z from 'zod';
import { portableTextBlockZ } from './portableTextBlock';

export const tocItemZ = z.object({
  _type: z.literal('block'),
  _key: z.string(),
  style: z.union([z.literal('h2'), z.literal('h3')]),
  text: portableTextBlockZ.shape.children.element.shape.text,
  anchor: z.string(),
  children: z
    .array(
      z.object({
        _type: z.literal('block'),
        _key: z.string(),
        style: z.literal('h3'),
        text: portableTextBlockZ.shape.children.element.shape.text,
        anchor: z.string(),
      }),
    )
    .optional()
    .default([]), // Ensure `children` is always an array
});

export const tocZ = z.array(tocItemZ).optional();

export type TOCItem = z.infer<typeof tocItemZ>;
export type TOC = z.infer<typeof tocZ>;
