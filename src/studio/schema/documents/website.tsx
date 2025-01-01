import { defineField, defineType } from "sanity";
import { portableTextBlocks } from "../objects/portableText";
import { GlobeIcon } from "lucide-react";

export default defineType({
  name: "website",
  type: "document",
  title: "Website",
  icon: () => <GlobeIcon size="1em" />,
  fields: [
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          ...portableTextBlocks,
          styles: portableTextBlocks.styles?.filter((style) =>
            ["normal"].includes(style.value)
          ),
          lists: [],
        },
      ],
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description:
        "URL of the website (if it differs from the client's primary website)",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageObject",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "feature",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      client: "client.name",
      media: "image.image.asset",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.client,
        media: selection.media,
      };
    },
  },
});
