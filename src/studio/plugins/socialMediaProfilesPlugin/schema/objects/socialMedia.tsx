import {defineField, defineType} from 'sanity'

export const socialMedia = defineType({
  name: 'socialMedia',
  type: 'object',
  fields: [
    defineField({
      name: 'profiles',
      type: 'array',
      of: [{type: 'profile'}],
    }),
  ],
})
