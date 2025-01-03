import { z } from "zod";
import { baseBlockZ } from "./base";

export const formFieldZ = z.object({
  _type: z.literal("formField"),
  _key: z.string(),
  fieldLabel: z.string(),
  fieldPlaceholder: z.string().optional().nullable(),
  fieldType: z.literal("text"),
  required: z.boolean(),
});

const formFieldEmailZ = formFieldZ.extend({
  fieldType: z.literal("email"),
  replyToEmail: z.boolean(),
});

const formFieldTextareaZ = formFieldZ
  .extend({
    _type: z.literal("formTextarea"),
    fieldMaxLength: z.number().optional().nullable(),
  })
  .omit({
    fieldType: true,
  });

const formGroupZ = baseBlockZ.extend({
  _type: z.literal("formGroup"),
  label: z.string(),
  fields: z.array(z.union([formFieldZ, formFieldEmailZ, formFieldTextareaZ])),
});

export const formZ = z.object({
  _type: z.literal("baseForm"),
  description: z.string().optional().nullable(),
  _id: z.string(),
  emailTo: z.array(z.string().email()),
  emailSubject: z.string(),
  customFormFields: z.array(
    z.union([formFieldZ, formFieldEmailZ, formFieldTextareaZ, formGroupZ])
  ),
});

export type Form = z.infer<typeof formZ>;
export type FormField = z.infer<typeof formFieldZ>;
export type FormFieldEmail = z.infer<typeof formFieldEmailZ>;
export type FormFieldTextarea = z.infer<typeof formFieldTextareaZ>;
