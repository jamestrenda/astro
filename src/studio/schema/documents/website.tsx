import { GlobeIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { getPortableTextBlocks } from '~/studio/lib/utils';

export default defineType({
  name: 'website',
  type: 'document',
  title: 'Website',
  icon: () => <GlobeIcon size="1em" />,
  fields: [
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: getPortableTextBlocks({
        styles: ['normal'],
        lists: [],
      }),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description:
        "URL of the website (if it differs from the client's primary website)",
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Image for desktop devices',
      type: 'imageObject',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image',
      description: 'Image for mobile devices',
      type: 'imageObject',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'feature',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client.name',
      media: 'image.image.asset',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.client,
        media: selection.media,
      };
    },
  },
});
