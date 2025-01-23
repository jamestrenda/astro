import { GalleryVerticalEndIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

const schemaTitle = 'Portfolio';

export default defineType({
  name: 'portfolio',
  type: 'document',
  title: schemaTitle,
  icon: () => <GalleryVerticalEndIcon size="1em" />,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Portfolio Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'website' }], // add other types here
        },
      ],
      validation: (Rule) => Rule.required().unique().min(1).max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ?? schemaTitle,
        subtitle: title ? schemaTitle : undefined,
      };
    },
  },
});
