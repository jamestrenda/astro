import { z } from "zod";
import { socialZ } from "./social";

export const settingsZ = z.object({
  siteTitle: z.string(),
  siteUrl: z.string().url(),
  favicon: z.string().url(),
  social: socialZ.optional().nullable(),
});

export type Settings = z.infer<typeof settingsZ>;
