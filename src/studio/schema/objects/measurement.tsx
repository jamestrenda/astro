import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'measurement',
  title: 'Measurement',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Cups', value: 'c' },
          { title: 'Fluid Ounces', value: 'vol' },
          { title: 'Gallons', value: 'gal' },
          { title: 'Grams', value: 'g' },
          { title: 'Liters', value: 'l' },
          { title: 'Milliliters', value: 'ml' },
          { title: 'Ounces', value: 'oz' },
          { title: 'Pounds', value: 'lbs' },
          { title: 'Tablespoons', value: 'tbsp' },
          { title: 'Teaspoons', value: 'tsp' },
        ],
      },
    }),
  ],
});
