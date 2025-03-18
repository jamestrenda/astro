import type { ArticleListBlockConfig } from '@trenda/sanity-plugin-page-blocks/article-list-block';
import { defineField } from 'sanity';
import {
  getPortableTextBlocks,
  getPortableTextPreview,
} from '~/studio/lib/utils';

export const articleList: ArticleListBlockConfig = {
  header: defineField({
    name: 'header',
    title: 'Header',
    description: 'Optional text to display above the article list',
    type: 'array',
    of: getPortableTextBlocks({
      styles: ['overline', 'h2', 'normal'],
      lists: [],
    }),
  }),
  categoryField: defineField({
    name: 'tags',
    title: 'Filter by Tag',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    description: 'Optional: Show only articles from selected tags.',
  }),
  //   customFields: [
  //     defineField({
  //       name: 'custom',
  //       title: 'My Custom Field',
  //       type: 'boolean',
  //       description: 'My custom field description',
  //     }),
  //   ],
  preview: {
    select: {
      header: 'header',
    },
    prepare(selection) {
      const preview = getPortableTextPreview(selection.header, 'Article List');

      return preview;
    },
  },
};
