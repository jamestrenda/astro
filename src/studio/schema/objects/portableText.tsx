import { defineArrayMember, defineType } from "sanity";
import { ExternalLinkIcon, Link2Icon, TypeIcon } from "lucide-react";

export const Icon = () => <TypeIcon size="1em" />;

export const portableTextBlocks = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    // {title: 'H1', value: 'h1'}, // reserved for hero blocks
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "H4", value: "h4" },
    { title: "H5", value: "h5" },
    {
      title: "Overline",
      value: "overline",
      component: (props) => (
        <span
          style={{
            fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif`,
            margin: 0,
            fontSize: ".875em",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {props.children}
        </span>
      ),
    },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Number", value: "number" },
  ],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      { title: "Underline", value: "underline" },
      { title: "Strike", value: "strike-through" },
    ],
    // Annotations can be any object structure – e.g. a link or a footnote.
    // Add link styles components
    annotations: [
      {
        name: "internalRef",
        type: "object",
        title: "Internal Reference",
        icon: <Link2Icon size="1em" />,
        fields: [
          {
            name: "ref",
            type: "ref",
          },
        ],
      },
      {
        name: "externalLink",
        type: "object",
        title: "External Link",
        icon: <ExternalLinkIcon size="1em" />,
        fields: [
          {
            title: " ",
            name: "link",
            type: "externalLink",
          },
        ],
      },
    ],
  },
});

export default defineType({
  name: "portableText",
  type: "array",
  of: [portableTextBlocks],
});
