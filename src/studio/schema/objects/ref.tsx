import { Link2Icon } from 'lucide-react';
import type { ValidationContext } from 'sanity';
import { defineField, defineType } from 'sanity';

export default defineType({
  title: 'Internal Reference',
  name: 'ref',
  type: 'object',
  icon: <Link2Icon size="1em" />,
  preview: {
    select: {
      title: 'document.title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
  fields: [
    defineField({
      name: 'document',
      type: 'reference',
      title: 'Reference To',
      description: 'Select a document to link to internally.',
      validation: (Rule) =>
        Rule.custom((doc, context: ValidationContext) => {
          const parent = context.parent;
          if (!doc && !Object.hasOwn(parent as object, 'anchor')) {
            return 'A document or anchor must be defined';
          }
          return true;
        }),
      to: [{ type: 'post' }],
      options: {
        disableNew: true,
        filter: '!(_id in path("drafts.**"))',
      },
    }),
  ],
});
