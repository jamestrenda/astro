import { MenuIcon } from 'lucide-react';
import { defineField } from 'sanity';

// export const menuUIOptions = ["mega", "flyout"] as const;

export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: () => <MenuIcon size={16} />,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'menuItem',
        },
      ],
      validation: (Rule) => [Rule.min(1)],
    }),
  ],
};
