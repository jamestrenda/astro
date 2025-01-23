import { parseWithZod } from '@conform-to/zod';
import { ActionError, defineAction } from 'astro:actions';
import { createZodFormSchema } from '~/utils/createZodFormSchema';
import { getForm } from '~/utils/sanity';

export const server = {
  submitForm: defineAction({
    accept: 'form',
    // need to generate schema on the fly, so I can't use 'input' here
    // input: schema,
    handler: async (formData) => {
      // hidden fields that are passed from the form to help query the correct form
      const slug = formData.get('slug') as string;
      const pageType = formData.get('pageType') as string;

      // calls a sanity query to get the form schema
      const data = await getForm({
        pageType,
        slug,
      });

      // generates a zod schema from the form schema
      const schema = createZodFormSchema(data);

      // validates the form data against the generated schema
      const submission = parseWithZod(formData, {
        schema,
      });

      if (submission.status !== 'success') {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Invalid form submission',
        });
      }

      return `Thank you!`;
    },
  }),
};
