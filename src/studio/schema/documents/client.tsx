import { SmileIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  type: 'document',
  title: 'Client',
  icon: () => <SmileIcon size="1em" />,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageObject',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [
        {
          name: 'note',
          title: 'Note',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'content',
              type: 'portableText',
            }),
          ],
        },
      ],
    }),
  ],
});
