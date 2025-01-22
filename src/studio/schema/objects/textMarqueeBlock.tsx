import { RectangleEllipsisIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  type: "object",
  name: "textMarqueeBlock",
  title: "Text Marquee",
  icon: () => <RectangleEllipsisIcon size="1em" />,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "marquees",
      type: "array",
      of: [{ type: "textMarquee" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: selection.title ?? "Text Marquee",
      };
    },
  },
});
