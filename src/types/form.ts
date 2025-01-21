import { z } from "zod";
import { baseBlockZ } from "./base";

export const formFieldTextZ = z.object({
  _type: z.literal("formField"),
  _key: z.string(),
  fieldLabel: z.string(),
  fieldPlaceholder: z.string().optional().nullable(),
  fieldType: z.literal("text"),
  required: z.boolean(),
  fieldErrorMessage: z.string().optional().nullable(),
});

const formFieldEmailZ = formFieldTextZ.extend({
  fieldType: z.literal("email"),
  replyToEmail: z.boolean(),
});

const formFieldZ = z.union([formFieldTextZ, formFieldEmailZ]);
const formTextareaZ = formFieldTextZ
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
  fields: z.array(z.union([formFieldZ, formFieldEmailZ, formTextareaZ])),
});

export const formZ = z.object({
  _type: z.literal("baseForm"),
  emailTo: z.string(),
  emailSubject: z.string(),
  description: z.string().optional().nullable(),
  fields: z.array(z.union([...formFieldZ.options, formTextareaZ, formGroupZ])),
  honeypot: z.string(),
});

export const formQueryParamsZ = z.object({
  slug: z.string(),
  pageType: z.string(),
});

export type Form = z.infer<typeof formZ>;
export type FormField = z.infer<typeof formFieldZ>;
export type FormFieldEmail = z.infer<typeof formFieldEmailZ>;
export type FormFieldTextarea = z.infer<typeof formTextareaZ>;
export type FormGroup = z.infer<typeof formGroupZ>;
export type FormFields = z.infer<typeof formZ>["fields"];
export interface FormQueryParams extends z.infer<typeof formQueryParamsZ> {}
export type FormData = Pick<Form, "fields" | "honeypot">;
