import { TextQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import {
  getPortableTextBlocks,
  getPortableTextPreview,
} from '~/studio/lib/utils';

export default defineType({
  name: 'blockquote',
  title: 'Quote',
  type: 'object',
  icon: () => <TextQuoteIcon size="1em" />,
  fields: [
    defineField({
      name: 'quote',
      type: 'array',
      of: getPortableTextBlocks({
        styles: ['normal'],
        lists: [],
      }),
    }),
    defineField({
      name: 'cite',
      type: 'array',
      of: getPortableTextBlocks({
        styles: ['normal'],
        lists: [],
      }),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      cite: 'cite',
    },
    prepare(selection) {
      const preview = getPortableTextPreview(selection.quote, 'Blockquote');

      return preview;
    },
  },
});
