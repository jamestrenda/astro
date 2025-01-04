import { z } from "zod";
import type { Form } from "~/types/form";

export const createZodFormSchema = (data: Form["customFormFields"]) =>
  data.reduce((schema, field) => {
    switch (field._type) {
      case "formField": {
        switch (field.fieldType) {
          case "text": {
            return schema.extend({
              [field._key]: field.required ? z.string() : z.string().optional(),
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
        return field.fields.reduce((schema, field) => {
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
                [field._key]: field.required
                  ? z.string()
                  : z.string().optional(),
              });
            }
            default: {
              return schema;
            }
          }
        }, z.object({}));
      }
      default: {
        return schema;
      }
    }
  }, z.object({}));
