import { defineField, defineType } from "sanity";
import { Grid3X3Icon, TextIcon } from "lucide-react";
import {
  getPortableTextBlocks,
  getPortableTextPreview,
} from "~/studio/lib/utils";

export default defineType({
  name: "descriptionGrid",
  type: "object",
  title: "Description Grid",
  icon: () => <Grid3X3Icon size="1em" />,
  fields: [
    defineField({
      name: "header",
      title: "Grid Header",
      description: "Optional text to display above the grid",
      type: "array",
      of: getPortableTextBlocks({
        styles: ["h2", "normal"],
        lists: [],
      }),
    }),
    defineField({
      name: "items",
      title: "Grid Items",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "principle" }], // TODO: extract to constant
        },
        {
          type: "object",
          title: "Description Item",
          icon: () => <TextIcon size="1em" />,
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: getPortableTextBlocks({
                styles: ["normal"],
                lists: [],
              }),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      header: "header",
    },
    prepare(selection) {
      const preview = getPortableTextPreview(
        selection.header,
        "Description Grid"
      );

      return preview;
    },
  },
});
