import { defineField, defineType } from 'sanity';
// import { IconArrowUpRightFromSquare } from "@schd/sanity/icons/IconArrowUpRightFromSquare";
// import { IconLink } from "@schd/sanity/icons/IconLink";

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
});
