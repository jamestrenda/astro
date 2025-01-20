import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { title: "General", name: "general" },
    { title: "Contact", name: "contact" },
    { title: "Social", name: "social" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "Just another Sanity.io site",
      group: "general",
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      description:
        "Used for sitemap and canonical URLs (e.g. https://www.sanity.io).",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }).required(),
      // readOnly: true,
      group: "general",
    }),
    defineField({
      name: "address",
      title: "Company Address",
      type: "text",
      group: "contact",
    }),
    defineField({
      name: "emails",
      title: "Company Emails",
      type: "array",
      of: [
        {
          type: "email",
        },
      ],
      group: "contact",
    }),
    defineField({
      name: "favicon",
      type: "image",
      description: "Upload a favicon for your site.",
      group: "general",
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "socialMedia",
      group: "social",
    }),
  ],
});
