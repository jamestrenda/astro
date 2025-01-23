import { type ConditionalProperty, defineField } from 'sanity';
import { TitleField } from '~/studio/components/TitleField';

type TitleFieldProps = {
  name?: string;
  group?: string;
  fieldset?: string;
  hidden?: ConditionalProperty;
  description?: string;
  required?: boolean;
  withSEO?: boolean;
};
export const titleField = ({
  group,
  fieldset,
  name = 'title',
  hidden = false,
  required = true,
  withSEO,
  description,
}: TitleFieldProps) =>
  defineField({
    name,
    title: 'Title',
    description: description || undefined,
    type: 'string',
    validation: (Rule) =>
      Rule.custom((value) => {
        if (!required) return true;
        if (!value) {
          return 'Required';
        }
        return true;
      }),
    components: {
      field: (props: any) => (
        <TitleField min={30} max={65} withSEO={withSEO} {...props} />
      ),
    },
    hidden,
    group,
    fieldset,
  });
