import { z } from 'zod';
import { postCardZ } from './postCard';
import { seoZ } from './seo';
import { tagZ } from './tag';

export const postListZ = z.object({
  tag: z.object({
    _type: tagZ.shape._type,
    _id: z.string(),
    title: tagZ.shape.title,
    description: tagZ.shape.description.optional().nullable(),
    seo: seoZ.optional().nullable(),
  }),
  posts: z.array(postCardZ),
});

export type PostList = z.infer<typeof postListZ>;
