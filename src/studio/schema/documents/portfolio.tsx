import { GalleryVerticalEndIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolio",
  type: "document",
  title: "Portfolio",
  icon: () => <GalleryVerticalEndIcon size="1em" />,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Portfolio Items",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "website" }], // add other types here
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
  ],
});
