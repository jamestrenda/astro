import { CompassIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { getPortableTextBlocks } from '~/studio/lib/utils';

export default defineType({
  name: 'principle',
  title: 'Guiding Principle',
  type: 'document',
  icon: () => <CompassIcon size="1em" />,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: getPortableTextBlocks({
        styles: ['normal'],
        lists: [],
      }),
    }),
  ],
});
