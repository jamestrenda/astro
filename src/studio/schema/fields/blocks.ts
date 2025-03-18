import { defineField } from 'sanity';

import { getPortableTextPreview } from '~/studio/lib/utils';
import { Icon as TextIcon } from '../objects/portableText';

export const blocksField = defineField({
  name: 'blocks',
  title: 'Blocks',
  type: 'array',
  options: {
    insertMenu: {
      showIcons: true,
      filter: true,
      views: [
        { name: 'list' },
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
      type: 'articleListBlock',
      title: 'Article List',
    },
    {
      type: 'descriptionGrid',
      title: 'Description Grid',
    },
    {
      type: 'form',
      title: 'Form',
    },
    {
      type: 'hero',
      title: 'Hero',
    },
    {
      type: 'imageObject',
      title: 'Image',
    },
    {
      type: 'portfolio',
      title: 'Portfolio',
    },
    {
      name: 'textBlock',
      title: 'Text Block',
      type: 'object',
      icon: TextIcon,
      fields: [
        defineField({
          title: ' ',
          name: 'portableText',
          type: 'portableText',
        }),
      ],
      // this is the preview config for the blocks inside the portableText field
      preview: {
        select: {
          blocks: 'portableText',
        },
        prepare(selection) {
          const preview = getPortableTextPreview(
            selection.blocks,
            'Text Block',
          );

          return preview;
        },
      },
    },
    {
      type: 'textMarqueeBlock',
      title: 'Text Marquee',
    },
  ],
});
