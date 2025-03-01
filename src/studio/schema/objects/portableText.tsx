import { TypeIcon } from 'lucide-react';
import { defineArrayMember, defineType } from 'sanity';
import { getPortableTextBlocks } from '~/studio/lib/utils';

export const Icon = () => <TypeIcon size="1em" />;

export default defineType({
  name: 'portableText',
  type: 'array',
  of: [
    ...getPortableTextBlocks({
      styles: ['normal', 'h2', 'h3', 'h4', 'overline'],
    }),
    defineArrayMember({
      type: 'blockquote',
    }),
    defineArrayMember({
      type: 'code',
      name: 'code',
      title: 'Code',
      options: {
        language: 'typescript',
        // languageAlternatives: [
        //   { title: 'Typescript', value: 'ts' },
        //   { title: 'HTML', value: 'html' },
        //   { title: 'CSS', value: 'css' },
        // ],
        withFilename: true,
      },
    }),
    defineArrayMember({
      type: 'imageObject',
      title: 'Image',
    }),
  ],
});
