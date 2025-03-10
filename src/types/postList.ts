import { z } from 'zod';
import { postCardZ } from './postCard';
import { tagZ } from './tag';

export const postListZ = z.object({
  tag: tagZ.pick({ title: true, description: true }),
  posts: z.array(postCardZ),
});

export type PostList = z.infer<typeof postListZ>;
