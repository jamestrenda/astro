import { UnlinkIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'notFoundSettings',
  title: '404 Settings',
  type: 'document',
  icon: <UnlinkIcon size="1em" />,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
  ],
});
