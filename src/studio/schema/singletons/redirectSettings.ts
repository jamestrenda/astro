import type { Rule, ValidationContext } from 'sanity';
import { defineField } from 'sanity';
import type { Redirect } from '~/types/redirect';

export default {
  name: 'redirectSettings',
  title: 'Redirects',
  type: 'document',
  validation: (Rule: Rule) =>
    Rule.custom(
      (
        context: ValidationContext & {
          redirects: Redirect[];
        },
      ) => {
        const { redirects } = context;

        // create a map of all the redirects along with their count
        const lookup = redirects?.reduce(
          (acc, currentItem) => {
            acc[currentItem.from] = (acc[currentItem.from] ?? 0) + 1; // increment the count if the key already exists
            return acc;
          },
          {} as Record<string, number>,
        );

        console.log({ lookup });

        // return true if there are no duplicates, otherwise return an error message
        return redirects?.filter((redirect) =>
          lookup[redirect.from] && lookup[redirect.from]! > 1 ? true : false,
        ).length
          ? "Redirects can't have duplicate 'from' values."
          : true;
      },
    ),
  fields: [
    defineField({
      name: 'redirects',
      title: ' ',
      description: 'Click the "Add item" button to add a redirect.',
      type: 'array',
      of: [
        {
          type: 'redirect',
        },
      ],
    }),
  ],
};
