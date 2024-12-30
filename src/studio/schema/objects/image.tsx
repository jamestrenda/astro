import { defineField, defineType } from "sanity";
import { ImageIcon } from "lucide-react";
import anchor from "../fields/anchor";

export const Icon = () => <ImageIcon size="1em" />;

export const title = "Image";

export default defineType({
  name: "imageObject",
  title,
  type: "object",
  icon: Icon,
  preview: {
    select: {
      filename: "image.asset.originalFilename",
      altText: "altText",
      caption: "caption",
      globalAltText: "image.asset.altText",
      media: "image",
    },
    prepare({ filename, altText, globalAltText, caption, media }) {
      return {
        title: caption ?? altText ?? globalAltText ?? filename,
        subtitle: title,
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
