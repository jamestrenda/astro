import type { z } from "astro:schema";
import * as E from "@react-email/components";
import type { Form, FormFields } from "~/types/form";

export function Email({ submission, form }: { submission?: any; form: Form }) {
  const messageKey =
    form.fields.find((field) => field._type === "formTextarea")?._key ??
    "message";
  const message = submission[messageKey];

  const emailBody = generateEmailTextComponents(form.fields, submission);

  return (
    <E.Html lang="en" dir="ltr">
      <E.Head />
      {/* TODO: probably need to update the textarea schema with a checkbox for "preview" or establish a naming convention for transactional email message fields   */}
      <E.Preview>{message}</E.Preview>
      <E.Body className="bg-gray-100 text-base font-sans p-2">
        <E.Container className="bg-white py-16 px-8 my-0">
          <E.Section>
            <E.Row>{emailBody}</E.Row>
          </E.Section>
        </E.Container>
      </E.Body>
    </E.Html>
  );
}

export const generateEmailTextComponents = (
  formFields: FormFields, // Replace `any` with the correct type for formFields
  formSubmission: Record<string, string | undefined>
): JSX.Element[] => {
  // Helper to generate Text component for a single field
  const createTextComponent = (label: string, value: string | undefined) => (
    <E.Text key={label}>
      <strong>{label}: </strong>
      {value || "N/A"}
    </E.Text>
  );

  // Recursive function to process fields and groups
  const processFields = (fields: FormFields): JSX.Element[] => {
    return fields.flatMap((field) => {
      switch (field._type) {
        case "formField": {
          const value = formSubmission[field._key];
          return createTextComponent(
            field.fieldLabel || "Unnamed Field",
            value
          );
        }
        case "formTextarea": {
          const value = formSubmission[field._key];
          return createTextComponent(
            field.fieldLabel || "Unnamed Textarea",
            value
          );
        }
        case "formGroup": {
          // Recursively process formGroup fields
          return [
            // <E.Text key={field._key}>
            //   <strong>{field.label || "Group"}:</strong>
            // </E.Text>,
            ...processFields(field.fields),
          ];
        }
        default:
          return []; // Skip unsupported field types
      }
    });
  };

  // Process the root level fields and return the resulting components
  return processFields(formFields);
};
