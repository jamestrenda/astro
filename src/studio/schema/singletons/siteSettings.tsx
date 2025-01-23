import { AtSignIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { EmailPreview } from '~/studio/components/previews/EmailPreview';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { title: 'General', name: 'general' },
    { title: 'Contact', name: 'contact' },
    { title: 'Social', name: 'social' },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Just another Sanity.io site',
      group: 'general',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description:
        'Used for sitemap and canonical URLs (e.g. https://www.sanity.io).',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).required(),
      // readOnly: true,
      group: 'general',
    }),
    defineField({
      name: 'address',
      title: 'Company Address',
      type: 'text',
      group: 'contact',
    }),
    defineField({
      name: 'orgEmails',
      title: 'Organizational Emails',
      type: 'array',
      of: [
        {
          name: 'orgEmail',
          title: 'Email',
          type: 'object',
          icon: <AtSignIcon size="1em" />,
          fields: [
            defineField({
              name: 'email',
              title: 'Email address',
              type: 'email',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isPrimary',
              title: 'Set as Primary',
              type: 'boolean',
              initialValue: false,
              validation: (Rule) =>
                Rule.custom((props, context) => {
                  const { document, parent } = context;

                  // @ts-ignore
                  const primary =
                    document?.orgEmails &&
                    // @ts-ignore
                    document.orgEmails.find(
                      // @ts-ignore
                      (email) => email.isPrimary,
                    );

                  // @ts-ignore
                  const key = parent?._key;

                  if (props && primary && primary._key !== key) {
                    return 'Only one email can be set as primary';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'department',
              title: 'Department',
              type: 'string',
              options: {
                list: [
                  { title: 'General', value: 'general' },
                  { title: 'Contact', value: 'contact' },
                  { title: 'Sales', value: 'sales' },
                  { title: 'Billing', value: 'billing' },
                  { title: 'Marketing', value: 'marketing' },
                  { title: 'Social', value: 'social' },
                  { title: 'Support', value: 'support' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: {
            select: {
              title: 'email',
              isPrimary: 'isPrimary',
              department: 'department',
            },
          },
          components: { preview: EmailPreview },
        },
      ],
      group: 'contact',
    }),
    defineField({
      name: 'favicon',
      type: 'image',
      description: 'Upload a favicon for your site.',
      group: 'general',
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'socialMedia',
      group: 'social',
    }),
  ],
});
