import { z } from "zod";
import { baseBlockZ } from "./base";

export const externalLinkZ = baseBlockZ.extend({
  _type: z.literal("externalLink"),
  url: z.string().nullable(),
  newWindow: z.boolean(),
});
