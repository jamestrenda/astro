import { z } from "zod";
import { baseBlockZ } from "./base";
import { portableTextZ } from "./portableText";

export const textBlockZ = baseBlockZ.extend({
  _type: z.literal("textBlock"),
  portableText: z.array(portableTextZ),
});
