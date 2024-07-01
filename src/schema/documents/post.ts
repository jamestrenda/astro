import { NotebookPenIcon, NotebookTextIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: NotebookTextIcon,
  preview: {
    select: {
      id: "_id",
      title: "title",
      slug: "slug.current",
      tags: "tags.0.title",
    },
    prepare({ id, title, slug, tags }) {
      return {
        title,
        subtitle: tags,
        media: id.startsWith("drafts.") ? NotebookPenIcon : NotebookTextIcon,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      options: {
        layout: "tags",
      },
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
  ],
});
