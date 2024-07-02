import { z } from "zod";
import { imageZ } from "./image";
import { tagZ } from "./tag";

export const postZ = z.object({
  title: z.string().optional().nullable(),
  body: z.array(z.any()).optional().nullable(), // TODO: add portableTextZ type
  excerpt: z.string().optional().nullable(),
  image: imageZ.optional().nullable(),
  slug: z.string(),
  publishedAt: z.string().optional().nullable(),
  tags: z.array(tagZ).optional().nullable(),
});

export type Post = z.infer<typeof postZ>;
