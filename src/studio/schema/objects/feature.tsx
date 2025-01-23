import { CircleCheckBigIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'feature',
  type: 'object',
  title: 'Feature',
  icon: () => <CircleCheckBigIcon size="1em" />,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
});
