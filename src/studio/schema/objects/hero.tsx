import { CrownIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import {
  getPortableTextBlocks,
  getPortableTextPreview,
} from '~/studio/lib/utils';

export default defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero',
  icon: () => <CrownIcon size="1em" />,
  fields: [
    defineField({
      name: 'valueProposition',
      title: 'Value Proposition',
      type: 'array',
      of: getPortableTextBlocks({
        styles: ['h1', 'overline', 'normal'],
      }),
    }),
    defineField({
      name: 'logos',
      title: 'Logo Marquees',
      type: 'array',
      of: [
        {
          type: 'marquee',
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageObject',
    }),
  ],
  preview: {
    select: {
      valueProposition: 'valueProposition',
    },
    prepare(selection) {
      const preview = getPortableTextPreview(
        selection.valueProposition,
        'Hero',
      );
      return preview;
    },
  },
});
