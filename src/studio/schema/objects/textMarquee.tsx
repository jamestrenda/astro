import { RectangleEllipsisIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  type: "object",
  name: "textMarquee",
  title: "Text Marquee",
  icon: () => <RectangleEllipsisIcon size="1em" />,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "speed",
      title: "Speed (seconds)",
      type: "number",
      initialValue: 60,
    }),
    defineField({
      name: "direction",
      title: "Direction",
      type: "string",
      options: {
        list: ["forwards", "reverse"],
        layout: "radio",
      },
      initialValue: "forwards",
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
