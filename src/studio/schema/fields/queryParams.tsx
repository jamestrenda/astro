import { RiQuestionFill } from '@remixicon/react';
import { defineField } from 'sanity';
import { Description } from '~/studio/components/Description';

export type Props = {
  group?: string;
  fieldset?: string;
};

export const queryParams = ({ group, fieldset }: Props) => {
  return defineField({
    name: 'q',
    title: 'Query Params',
    type: 'array',
    description: (
      <Description>
        Add key-value pairs to be used as query parameters in the URL.{' '}
        <a href="https://www.semrush.com/blog/url-parameters/" target="_blank">
          What are Query Params?
        </a>
      </Description>
    ),
    of: [
      {
        type: 'object',
        preview: {
          select: {
            key: 'key',
            value: 'value',
          },
          prepare: ({ key, value }) => ({
            title: `${key}=${value}`,
            media: RiQuestionFill,
          }),
        },
        fields: [
          {
            name: 'key',
            title: 'Key',
            type: 'string',
          },
          {
            name: 'value',
            title: 'Value',
            type: 'string',
          },
        ],
      },
    ],
    group: group ?? undefined,
    fieldset: fieldset ?? undefined,
  });
};
