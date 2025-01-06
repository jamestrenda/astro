import { z } from "zod";
import { portableTextZ } from "./portableText";
import { formQueryParamsZ, formZ } from "./form";
import { baseBlockZ } from "./base";

export const formBlockZ = z
  .object({
    ...baseBlockZ.shape,
    ...formQueryParamsZ.shape,
  })
  .extend({
    _type: z.literal("form"),
    text: z.array(portableTextZ).optional().nullable(),
    form: formZ,
  });

export type FormBlock = z.infer<typeof formBlockZ>;
