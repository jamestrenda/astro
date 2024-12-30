import {
  defineField,
  type PortableTextBlock,
  type PortableTextTextBlock,
} from "sanity";

import { Icon as TextIcon } from "../objects/portableText";
import type { ImageObject } from "~/types/image";
import { title as imageTitle } from "../objects/image";
import { title as portableTextTitle } from "../objects/portableText";

export const blocksField = defineField({
  name: "blocks",
  title: "Blocks",
  type: "array",
  options: {
    insertMenu: {
      showIcons: true,
      filter: true,
      views: [
        { name: "list" },
        // TODO: Add screenshots for block previews
        // {
        //   name: "grid",
        //   previewImageUrl: (schemaTypeName) =>
        //     `/static/preview-${schemaTypeName}.png`,
        // },
      ],
    },
  },
  of: [
    {
      type: "imageObject",
      title: "Image",
    },
    {
      name: "portableTextBlock",
      title: "Portable Text",
      type: "object",
      icon: TextIcon,
      fields: [
        defineField({
          title: " ",
          name: "portableText",
          type: "portableText",
        }),
      ],
      // this is the preview config for the blocks inside the portableText field
      preview: {
        select: {
          blocks: "portableText",
        },
        prepare(selection) {
          const { blocks } = selection as { blocks: PortableTextBlock[] };
          if (!blocks) {
            return {
              title: portableTextTitle,
            };
          }

          let block;
          switch (blocks[0]?._type) {
            case "block":
              block = blocks[0] as PortableTextTextBlock;

              // Get the first block of text, which could be broken up into multiple children depending on "marks" (i.e. formatting)
              const title = block?.children.map((child) => child.text).join("");

              return {
                title: title?.length ? title : portableTextTitle,
                subtitle: title && portableTextTitle, // if title is set, show the type as the subtitle
              };
            // TODO: This is not available in the portable text schema, but could be added
            case "imageObject":
              block = blocks[0] as ImageObject;
              return {
                title: block.altText ?? block.image.asset?.altText ?? "Image",
                subtitle: block.caption ?? imageTitle,
                media: block.image.asset?._id,
              };
            default:
              return {
                title: portableTextTitle,
              };
          }
        },
      },
    },
  ],
});
