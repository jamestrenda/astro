import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'footerMenus',
      title: 'Footer Menus',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Menu',
          to: [{ type: 'menu' }],
        },
      ],
    }),
  ],
});
