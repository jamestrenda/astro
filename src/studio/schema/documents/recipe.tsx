import { defineField, defineType } from 'sanity';
import { getPortableTextBlocks } from '~/studio/lib/utils';

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'gallery',
      title: 'Images',
      type: 'gallery',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ingredient',
          fields: [
            defineField({
              name: 'ingredient',
              type: 'reference',
              to: [{ type: 'ingredient' }],
            }),
            defineField({
              name: 'measurement',
              title: 'Measurement',
              type: 'measurement',
            }),
            defineField({
              name: 'notes',
              title: 'Notes',
              type: 'string',
              description: 'Any notes about the measurement or ingredient.',
            }),
          ],
          preview: {
            select: {
              title: 'ingredient.title',
              amount: 'measurement.amount',
              unit: 'measurement.unit',
            },
            prepare({ title, amount, unit }) {
              return {
                title: `${title} (${amount}${unit ? ` ${unit}` : ''})`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'portableText',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: getPortableTextBlocks({
        styles: ['normal'],
      }),
    }),
  ],
});
