import { z } from 'astro:content';
import { baseBlockZ } from './base';
import { portableTextBlockZ } from './portableTextBlock';
import { postCardZ } from './postCard';

export const articleListZ = baseBlockZ.extend({
  _type: z.literal('articleListBlock'),
  header: z.array(portableTextBlockZ).optional().nullable(),
  articles: z.array(postCardZ),
});

export type ArticleList = z.infer<typeof articleListZ>;
