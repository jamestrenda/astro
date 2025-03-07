import { defineField } from 'sanity';

import { CharCountInput } from '~/studio/components/CharCountInput';
import { Description } from '../../components/Description';
import { TitleField } from '../../components/TitleField';

export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Overrides the page title that appears in search engine results pages (SERPs).',
      components: {
        field: (props: any) => <TitleField min={30} max={65} {...props} />,
      },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: (
        <Description>
          <p>Overrides the meta description for this document.</p>
          <a href="https://moz.com/learn/seo/meta-description" target="_blank">
            Meta description best practices
          </a>
        </Description>
      ),
      components: {
        field: (props: any) => <CharCountInput min={50} max={160} {...props} />,
      },
    }),
    // defineField({
    //   name: 'author',
    //   title: 'Author',
    //   type: 'string',
    //   description: 'The author of the page.',
    // }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for the page.',
    }),
    defineField({
      name: 'image',
      title: 'SEO image override',
      description:
        'This will override the main image. If left blank it will inherit the image from the main image.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
};
