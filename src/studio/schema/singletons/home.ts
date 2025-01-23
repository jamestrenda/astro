import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'reference',
      description: 'Choose a page to display as the homepage',
      to: { type: 'page' },
      // options: {
      //   filter: "!defined(isPostsPage) || isPostsPage == false",
      // },
    }),
  ],
});
