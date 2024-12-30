import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "Just another Sanity.io site",
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      description:
        "Used for sitemap and canonical URLs (e.g. https://www.sanity.io).",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }).required(),
      // readOnly: true,
    }),
    defineField({
      name: "favicon",
      type: "image",
      description: "Upload a favicon for your site.",
    }),
    defineField({
      name: "homepage",
      title: "Homepage",
      type: "reference",
      description: "Choose a page to display as the homepage",
      to: { type: "page" },
      // options: {
      //   filter: "!defined(isPostsPage) || isPostsPage == false",
      // },
    }),
  ],
});
