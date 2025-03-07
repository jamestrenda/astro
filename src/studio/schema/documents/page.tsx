import { FileIcon, SearchCheckIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { blocksField } from '../fields/blocks';
import { slugField } from '../fields/slug';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileIcon,
  groups: [
    {
      name: 'meta',
      title: 'Metadata',
      icon: () => <SearchCheckIcon size={16} />,
    },
    // {
    //   name: "social",
    //   title: "Social",
    // },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'For internal reference only',
      validation: (Rule) => Rule.required(),
    }),
    slugField({}),
    blocksField,
    //   ...pageTemplates,
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: ['meta'],
    }),
    defineField({
      name: 'og',
      type: 'og',
      title: 'Open Graph',
      group: ['meta'],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare: ({
      title,
      slug = { current: '' },
    }: {
      title?: string;
      slug?: { current: string };
    }) => {
      const path = `/${slug.current}`;

      return {
        title: `${title || 'Untitled'}`,
        subtitle: slug.current ? path : '(missing slug)',
        media: FileIcon,
      };
    },
  },
});
