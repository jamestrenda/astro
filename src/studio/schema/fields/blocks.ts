import { defineField } from "sanity";

import { Icon as TextIcon } from "../objects/portableText";
import { getPortableTextPreview } from "~/studio/lib/utils";

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
      type: "descriptionGrid",
      title: "Description Grid",
    },
    {
      type: "imageObject",
      title: "Image",
    },
    {
      name: "textBlock",
      title: "Text Block",
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
          const preview = getPortableTextPreview(
            selection.blocks,
            "Text Block"
          );

          return preview;
        },
      },
    },
  ],
});
