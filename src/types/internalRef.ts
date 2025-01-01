import { z } from "zod";
import { baseBlockZ } from "./base";

export const internalRefZ = baseBlockZ.extend({
  _type: z.literal("internalRef"),
  slug: z.string(),
});
