import { defineField, defineType } from "sanity";
import { ImageIcon } from "lucide-react";
import anchor from "./fields/anchor";

export default defineType({
  name: "imageObject",
  title: "Full-Width Image",
  type: "object",
  icon: ImageIcon,
  preview: {
    select: {
      title: "image.asset.originalFilename",
      subtitle: "altText",
      caption: "caption",
      altText: "image.asset.altText",
      media: "image",
    },
    prepare({ title, subtitle, altText, caption, media }) {
      return {
        title: title ?? "Untitled",
        subtitle: caption ?? subtitle ?? altText ?? "",
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "image",
      title: "File",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    anchor,
  ],
});
