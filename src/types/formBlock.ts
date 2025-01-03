import { z } from "zod";
import { baseBlockZ } from "./base";
import { portableTextZ } from "./portableText";
import { formZ } from "./form";

export const formBlockZ = z.object({
  _type: z.literal("form"),
  text: z.array(portableTextZ).optional().nullable(),
  form: formZ,
});

export type FormBlock = z.infer<typeof formBlockZ>;
