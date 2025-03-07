import { TypeIcon, VideoIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
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
    defineArrayMember({
      name: 'video',
      title: 'Video',
      type: 'object',
      icon: () => <VideoIcon size="1em" />,
      fields: [
        defineField({
          name: 'wistiaMedia',
          title: 'Wistia Media',
          type: 'wistiaMedia',
        }),
        defineField({
          name: 'thumbnailAltText',
          title: 'Thumbnail Alt Text',
          type: 'string',
        }),
      ],
      preview: {
        select: {
          wistiaMedia: 'wistiaMedia',
          thumbnailAltText: 'thumbnailAltText',
        },
        prepare({ wistiaMedia, thumbnailAltText }) {
          return {
            title: thumbnailAltText || wistiaMedia.id,
            subtitle: 'Video',
          };
        },
      },
    }),
  ],
});
