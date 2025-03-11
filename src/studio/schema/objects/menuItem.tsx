import { ExternalLinkIcon, GlobeIcon, Link2Icon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  preview: {
    select: {
      text: 'link.linkText',
      link: 'link.link[0]',
      pageTitle: 'link.link.0.document.title',
    },
    prepare: ({ text, link, pageTitle }) => {
      const type = link?._type;
      let media = undefined;

      switch (type) {
        case 'internalRef':
          media = Link2Icon;
          break;
        case 'relativeUrl':
          media = GlobeIcon;
          break;
        case 'externalLink':
          media = ExternalLinkIcon;
          break;
      }

      return {
        title: text || pageTitle || 'Untitled',
        media,
      };
    },
  },
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
});
