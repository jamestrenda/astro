import { z } from "zod";
import { type FormField, type FormFields, type FormQuery } from "~/types/form";
import { formQueryParamsZ } from "~/types/form";

// TODO: extend to handle custom validation (e.g. name fields may have different requirements than other "text" fields)
export const createFieldSchema = (field: FormField) => {
  switch (field.fieldType) {
    case "text":
      return field.required ? z.string() : z.string().optional();
    case "email":
      return field.required
        ? z.string().email()
        : z.string().email().optional();
    default:
      return null;
  }
};

// Helper function to handle a group of fields
export const processFields = (
  fields: FormFields,
  schema: z.ZodObject<any>
): z.ZodObject<any> => {
  return fields.reduce((currentSchema, field) => {
    switch (field._type) {
      case "formField": {
        const fieldSchema = createFieldSchema(field);
        if (fieldSchema) {
          return currentSchema.extend({ [field._key]: fieldSchema });
        }
        return currentSchema;
      }
      case "formTextarea": {
        return currentSchema.extend({
          [field._key]: field.required
            ? z.string().min(40, "Please provide a little more detail.")
            : z.string().optional(),
        });
      }
      case "formGroup": {
        return processFields(field.fields, currentSchema);
      }
      default:
        return currentSchema;
    }
  }, schema);
};

export const createZodFormSchema = (
  data: FormQuery,
  baseSchema = formQueryParamsZ
) => {
  // Add the honeypot field to the base schema
  const extendedBaseSchema = baseSchema
    .extend({
      [data.honeypot]: z
        .string()
        .optional()
        .refine((val) => val === undefined, {
          message: "Please try again.", // This is for spam bots
        }),
    })
    .strict();

  // Process all fields and return the final schema
  return processFields(data.fields, extendedBaseSchema);
};
