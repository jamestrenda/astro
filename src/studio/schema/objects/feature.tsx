import { defineField, defineType } from "sanity";
import { portableTextBlocks } from "../objects/portableText";
import { CheckCircle2Icon, CircleCheckBigIcon } from "lucide-react";

export default defineType({
  name: "feature",
  type: "object",
  title: "Feature",
  icon: () => <CircleCheckBigIcon size="1em" />,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    // TODO: I've done something like this a few times now. I should probably
    // make a helper function for this
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
  ],
});
