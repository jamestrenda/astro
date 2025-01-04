import { z } from "zod";
import { baseBlockZ } from "./base";
import { portableTextZ } from "./portableText";
import { formZ } from "./form";

const formQueryParamsZ = z.object({
  slug: z.string(),
  pageType: z.string(),
});

export const formBlockZ = formQueryParamsZ.extend({
  _type: z.literal("form"),
  text: z.array(portableTextZ).optional().nullable(),
  form: formZ,
});

export interface FormQueryParams extends z.infer<typeof formQueryParamsZ> {}
export type FormBlock = z.infer<typeof formBlockZ>;
