import { z } from "zod";
import { type Form, type FormQuery } from "~/types/form";
import { formQueryParamsZ } from "~/types/form";

// TODO: Need to fix the types, but this actually works
export const createZodFormSchema = (
  data: FormQuery,
  baseSchema = formQueryParamsZ
) =>
  data.fields.reduce(
    (schema, field) => {
      switch (field._type) {
        case "formField": {
          switch (field.fieldType) {
            case "text": {
              return schema.extend({
                [field._key]: field.required
                  ? z.string()
                  : z.string().optional(),
              });
            }
            case "email": {
              return schema.extend({
                [field._key]: field.required
                  ? z.string().email()
                  : z.string().email().optional(),
              });
            }
            default: {
              return schema;
            }
          }
        }
        case "formTextarea": {
          return schema.extend({
            [field._key]: field.required ? z.string() : z.string().optional(),
          });
        }
        case "formGroup": {
          return field.fields.reduce((prev, field) => {
            switch (field._type) {
              case "formField": {
                switch (field.fieldType) {
                  case "text": {
                    return prev.extend({
                      [field._key]: field.required
                        ? z.string()
                        : z.string().optional(),
                    });
                  }
                  case "email": {
                    return prev.extend({
                      [field._key]: field.required
                        ? z.string().email()
                        : z.string().email().optional(),
                    });
                  }
                  default: {
                    return prev;
                  }
                }
              }
              case "formTextarea": {
                return prev.extend({
                  [field._key]: field.required
                    ? z.string()
                    : z.string().optional(),
                });
              }
              default: {
                return prev;
              }
            }
          }, schema);
        }
        default: {
          return schema;
        }
      }
    },
    baseSchema
      .extend({
        [data.honeypot]: z
          .string()
          .optional()
          .refine((val) => val === undefined, {
            message: "Please try again.", // This is for spam bots
          }),
      })
      .strict()
  );
