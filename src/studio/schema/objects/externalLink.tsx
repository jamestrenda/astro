import { ExternalLinkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "External Link",
  name: "externalLink",
  type: "object",
  icon: <ExternalLinkIcon size="1em" />,
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https", "tel", "mailto"] }),
    }),
    defineField({
      title: "Open in a new window?",
      name: "newWindow",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      url: "url",
    },
    prepare(selection) {
      const { url } = selection;

      let subtitle = [];
      if (url) {
        subtitle.push(`→ ${url}`);
      }
      return {
        // media: IconArrowUpRightFromSquare,
        title: subtitle.join(" "),
      };
    },
  },
});
