import { defineField, defineType } from "sanity";
import anchor from "./fields/anchor";
import { Link2Icon } from "lucide-react";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: <Link2Icon size="1em" />,
  preview: {
    select: {
      title: "linkText",
      type: "link[0]._type",
    },
    prepare({ title, type }) {
      return {
        title,
      };
    },
  },
  fields: [
    defineField({
      name: "linkText",
      title: "Text",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "To",
      description: "Add an internal reference, external link, or relative URL.",
      type: "array",
      of: [{ type: "ref" }, { type: "externalLink" }],
      validation: (Rule) => Rule.max(1),
    }),
    anchor,
  ],
});
