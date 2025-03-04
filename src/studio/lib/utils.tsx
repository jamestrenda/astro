import type { CurrentUser, PortableTextTextBlock } from '@sanity/types';
import {
  defineArrayMember,
  type PortableTextBlock,
  type SlugRule,
} from 'sanity';

import { ExternalLinkIcon, Link2Icon } from 'lucide-react';
import slug from 'slug';

const MAX_LENGTH = 96;

export const validateSlug = ({
  skipValidation = false,
  rule,
}: {
  skipValidation: boolean;
  rule: SlugRule;
}) => {
  return rule.custom((value) => {
    if (skipValidation) {
      return true;
    }
    const currentSlug = value && value.current;
    if (!currentSlug) {
      return true;
    }

    if (currentSlug.length >= MAX_LENGTH) {
      return `Must be less than ${MAX_LENGTH} characters`;
    }

    return true;
  });
};

export const formatSlug = (input: string) => {
  const formattedSlug = slug(input);

  return formattedSlug;
};

export function isAdminUser(user: Omit<CurrentUser, 'role'> | null) {
  return !!user?.roles.find(({ name }) => name === 'administrator');
}

export function getPortableTextPreview(
  blocks: PortableTextBlock[],
  title: string,
) {
  if (!blocks) {
    return {
      title,
    };
  }

  // find the first block that is a heading
  let block = blocks.find(
    (block) =>
      block._type === 'block' && ['h1', 'h2'].includes(block.style as string),
  ) as PortableTextTextBlock;

  if (!block) {
    block = blocks[0] as PortableTextTextBlock; // if no heading, use the first block
  }

  // Get the first block of text, which could be broken up into multiple children depending on "marks" (i.e. formatting)
  const textSnippet = block?.children.map((child) => child.text).join('');

  return {
    title: textSnippet?.length ? textSnippet : title,
    subtitle: textSnippet ? title : undefined, // if title is set, show the type as the subtitle
  };
}

export const portableTextBlocks = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H1', value: 'h1' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
    { title: 'H4', value: 'h4' },
    { title: 'H5', value: 'h5' },
    {
      title: 'Overline',
      value: 'overline',
      component: (props) => (
        <span
          style={{
            fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif`,
            margin: 0,
            fontSize: '.875em',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {props.children}
        </span>
      ),
    },
    { title: 'Quote', value: 'blockquote' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Number', value: 'number' },
  ],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' },
      { title: 'Strike', value: 'strike-through' },
      { title: 'Code', value: 'code' },
      // { title: 'Code', value: 'inline-code', component: ({ children }) => <code>{children}</code>, icon: <CodeIcon size="1em" /> },
    ],
    // Annotations can be any object structure – e.g. a link or a footnote.
    // Add link styles components
    annotations: [
      {
        name: 'internalRef',
        type: 'object',
        title: 'Internal Reference',
        icon: <Link2Icon size="1em" />,
        fields: [
          {
            name: 'ref',
            type: 'ref',
          },
        ],
      },
      {
        name: 'externalLink',
        type: 'object',
        title: 'External Link',
        icon: <ExternalLinkIcon size="1em" />,
        fields: [
          {
            title: ' ',
            name: 'link',
            type: 'externalLink',
          },
        ],
      },
    ],
  },
});

export function getPortableTextBlocks(options?: {
  styles?: Exclude<
    (typeof portableTextBlocks)['styles'],
    undefined
  >[number]['value'][];
  lists?: Exclude<
    (typeof portableTextBlocks)['lists'],
    undefined
  >[number]['value'][];
  decorators?: Exclude<
    Exclude<
      (typeof portableTextBlocks)['marks'],
      undefined
    >[][number]['decorators'],
    undefined
  >[number]['value'][];
  annotations?: Exclude<
    Exclude<
      (typeof portableTextBlocks)['marks'],
      undefined
    >[][number]['annotations'],
    undefined
  >[number]['name'][];
}) {
  if (!options) {
    return [portableTextBlocks];
  }
  const { styles, lists, decorators, annotations } = options;

  const result = [
    {
      ...portableTextBlocks,
      styles: styles
        ? portableTextBlocks.styles?.filter((style) =>
            styles?.includes(style.value),
          )
        : portableTextBlocks.styles,
      lists: lists
        ? portableTextBlocks.lists?.filter((list) =>
            lists?.includes(list.value),
          )
        : portableTextBlocks.lists,
      marks: {
        decorators: decorators
          ? portableTextBlocks.marks?.decorators?.filter((decorator) =>
              decorators?.includes(decorator.value),
            )
          : portableTextBlocks.marks?.decorators,
        annotations: annotations
          ? portableTextBlocks.marks?.annotations?.filter((annotation) =>
              annotations?.includes(annotation.name),
            )
          : portableTextBlocks.marks?.annotations,
      },
    },
  ];

  return result;
}
