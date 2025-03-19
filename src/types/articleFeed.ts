import { z } from 'astro:content';
import { baseBlockZ } from './base';
import { portableTextBlockZ } from './portableTextBlock';
import { postCardZ } from './postCard';

export const articleFeedZ = baseBlockZ.extend({
  _type: z.literal('articleFeedBlock'),
  header: z.array(portableTextBlockZ).optional().nullable(),
  articles: z.array(postCardZ),
});

export type ArticleFeed = z.infer<typeof articleFeedZ>;
