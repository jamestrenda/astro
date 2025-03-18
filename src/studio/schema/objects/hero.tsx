import { CrownIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { GROUP, GROUPS } from '~/studio/lib/constants';
import {
  getPortableTextBlocks,
  getPortableTextPreview,
} from '~/studio/lib/utils';

export default defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero',

  groups: GROUPS,
  icon: () => <CrownIcon size="1em" />,
  fields: [
    defineField({
      name: 'valueProposition',
      title: 'Value Proposition',
      type: 'array',
      of: getPortableTextBlocks({
        styles: ['h1', 'overline', 'normal'],
      }),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageObject',
      group: GROUP.IMAGE,
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
