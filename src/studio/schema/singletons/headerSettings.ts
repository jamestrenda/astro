import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'headerSettings',
  title: 'Header Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'headerMenu',
      title: 'Main Menu',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'menu' }] }],
    }),
  ],
});
