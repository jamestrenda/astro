import { CompassIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { portableTextBlocks } from "../objects/portableText";

export default defineType({
  name: "principle",
  title: "Guiding Principle",
  type: "document",
  icon: () => <CompassIcon size="1em" />,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "array",
      of: [
        {
          ...portableTextBlocks,
          styles: portableTextBlocks.styles?.filter((style) =>
            ["normal"].includes(style.value)
          ),
        },
      ],
    }),
  ],
});
