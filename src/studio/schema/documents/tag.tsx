import { TagIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { GROUP, GROUPS } from '~/studio/lib/constants';

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: GROUP.META,
    }),
    defineField({
      name: 'og',
      title: 'Open Graph',
      type: 'og',
      group: GROUP.META,
    }),
  ],
});
