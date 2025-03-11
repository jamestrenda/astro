import { GlobeIcon, Link2Icon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import anchor from '../fields/anchor';
import { queryParams } from '../fields/queryParams';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: <Link2Icon size="1em" />,
  preview: {
    select: {
      title: 'linkText',
      type: 'link[0]._type',
    },
    prepare({ title, type }) {
      return {
        title,
      };
    },
  },
  fields: [
    defineField({
      name: 'linkText',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'To',
      description: 'Add an internal reference, external link, or relative URL.',
      type: 'array',
      of: [
        { name: 'internalRef', type: 'ref' },
        { type: 'externalLink' },
        {
          name: 'relativeUrl',
          title: 'Relative URL',
          type: 'object',
          icon: <GlobeIcon size="1em" />,
          fields: [
            defineField({
              name: 'url',
              title: 'Relative URL',
              description: 'Example: /a-relative-url',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(1),
    }),
    anchor,
    queryParams({}),
  ],
});
