import { GalleryHorizontalEndIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  type: "object",
  title: "Gallery",
  icon: () => <GalleryHorizontalEndIcon size="1em" />,
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "imageObject",
        },
      ],
    }),
  ],
});
