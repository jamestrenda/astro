import { ClipboardPenIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { getPortableTextPreview } from "~/studio/lib/utils";

export default defineType({
  name: "form",
  title: "Form",
  icon: () => <ClipboardPenIcon size="1em" />,
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "portableText",
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "reference",
      to: [{ type: "baseForm" }],
    }),
  ],
  preview: {
    select: {
      title: "form.formTitle",
      text: "text",
    },
    prepare({ title, text }) {
      const preview: {
        title: string;
        media: typeof ClipboardPenIcon;
        subtitle?: string;
      } = {
        title: title,
        media: ClipboardPenIcon,
        subtitle: undefined,
      };

      if (!title) {
        const result = getPortableTextPreview(text, "Form");

        preview.title = result.title ?? "Form";
      }
      preview.subtitle = !title && !text ? undefined : "Form";

      return preview;
    },
  },
});
