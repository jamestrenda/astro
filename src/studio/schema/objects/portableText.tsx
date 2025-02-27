import { TypeIcon } from 'lucide-react';
import { defineArrayMember, defineType } from 'sanity';
import { getPortableTextBlocks } from '~/studio/lib/utils';

export const Icon = () => <TypeIcon size="1em" />;

export default defineType({
  name: 'portableText',
  type: 'array',
  of: [
    ...getPortableTextBlocks({
      styles: ['normal', 'h2', 'h3', 'h4', 'blockquote', 'overline'],
    }),
    defineArrayMember({
      type: 'code',
      name: 'code',
      title: 'Code',
    }),
    defineArrayMember({
      type: 'imageObject',
      title: 'Image',
    }),
  ],
});
