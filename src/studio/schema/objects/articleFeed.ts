import type { ArticleFeedBlockConfig } from '@trenda/sanity-plugin-page-blocks/article-feed-block';

export const articleFeed: ArticleFeedBlockConfig = {
  articleTypes: ['post'],
  title: false,
  filterBy: {
    schemaType: {
      type: 'tag',
    },
  },
  // preview: {
  //   select: {
  //     header: 'header',
  //   },
  //   prepare(selection) {
  //     const preview = getPortableTextPreview(selection.header, 'Article Feed');

  //     return preview;
  //   },
  // },
};
