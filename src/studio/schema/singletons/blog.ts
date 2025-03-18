import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'indexPage',
      title: 'Blog Index Page',
      type: 'reference',
      description: 'Choose a page to display as the blog index page',
      to: { type: 'page' },
      options: {
        disableNew: true,
      },
    }),
  ],
});
