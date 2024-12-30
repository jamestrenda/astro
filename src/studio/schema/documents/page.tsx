import { FileIcon, HomeIcon, SearchCheckIcon } from "lucide-react";
import {
  defineField,
  defineType,
  type PortableTextBlock,
  type PortableTextTextBlock,
} from "sanity";
import { slugField } from "../fields/slug";
import { blocksField } from "../fields/blocks";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: FileIcon,
  groups: [
    {
      name: "meta",
      title: "Metadata",
      icon: () => <SearchCheckIcon size={16} />,
    },
    // {
    //   name: "social",
    //   title: "Social",
    // },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "For internal reference only",
      validation: (Rule) => Rule.required(),
    }),
    slugField({}),
    blocksField,
    //   ...pageTemplates,
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO",
      group: ["meta"],
    }),
    // {
    //   name: 'openGraph',
    //   type: 'og',
    //   group: ['social'],
    // },
    defineField({
      name: "isHomepage",
      hidden: true,
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
      isHomepage: "isHomepage",
    },
    prepare: ({
      title,
      slug = { current: "" },
      isHomepage,
    }: {
      title?: string;
      slug?: { current: string };
      isHomepage?: boolean;
    }) => {
      const path = `/${slug.current}`;

      return {
        title: `${title || "Untitled"}`,
        subtitle: isHomepage
          ? undefined
          : slug.current
            ? path
            : "(missing slug)",
        media: isHomepage
          ? () => <HomeIcon size="1em" />
          : () => <FileIcon size="1em" />,
      };
    },
  },
});
