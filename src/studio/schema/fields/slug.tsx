import { type ConditionalProperty, defineField } from "sanity";
import { Description } from "~/studio/components/Description";
import { SlugInput } from "~/studio/components/SlugInput";
import { formatSlug } from "~/studio/lib/utils";

/**
 * Most common pattern for a slug field. If you need a different configuration, just replace this with your own custom field.
 * @see https://www.sanity.io/docs/slug-type
 */

type SlugFieldProps = {
  prefix?: string;
  value?: string;
  hidden?: ConditionalProperty;
  skipValidation?: boolean;
  group?: string;
  fieldset?: string;
  source?: string;
};

export const slugField = ({
  prefix,
  value,
  hidden = false,
  skipValidation = false,
  group = "meta",
  fieldset,
  source = "title",
}: SlugFieldProps) => {
  return defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    description: (
      <Description>
        A good URL tells users (and search engines) what to expect on the page.
        Use the 'Generate' button to generate a slug based on the title of the
        document..or enter your own custom value.{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide#slugs"
          target="_blank"
        >
          Slug best practices
        </a>
      </Description>
    ),
    options: {
      slugify: (props) => formatSlug(props),
      source,
    },
    components: prefix
      ? {
          input: (props: any) => SlugInput(props, prefix),
        }
      : undefined,
    validation: (rule) =>
      rule.custom((value, context) => {
        // if (skipValidation) {

        // }

        // normal validation for slugs
        const currentSlug = value && value.current;

        if (!currentSlug) {
          return "Required";
        }

        if (currentSlug.length >= 96) {
          return `Must be less than 96 characters`;
        }

        return true;
      }),
    initialValue: () => {
      if (value) {
        return { current: value };
      }
      return {
        current: undefined,
      };
    },
    hidden,
    group,
    fieldset,
  });
};
