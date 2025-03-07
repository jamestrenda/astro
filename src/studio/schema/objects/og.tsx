import { defineField } from 'sanity';

import { CharCountInput } from '~/studio/components/CharCountInput';
import { TitleField } from '../../components/TitleField';

export default {
  name: 'og',
  title: 'Open Graph',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Customize the open graph title. If left blank it will inherit the SEO title, if one exists. Otherwise, it will fallback to the page title.',
      components: {
        field: (props: any) => <TitleField min={30} max={65} {...props} />,
      },
    }),
    defineField({
      name: 'description',
      title: 'Open graph description override',
      description:
        'This will override the meta description. If left blank it will inherit the description from the SEO meta description.',
      type: 'text',
      rows: 2,
      components: {
        field: (props: any) => <CharCountInput min={50} max={160} {...props} />,
      },
    }),
  ],
};
