import { z } from "zod";

export const settingsZ = z.object({
  siteTitle: z.string(),
  siteUrl: z.string().url(),
  favicon: z.string().url(),
});

export type Settings = z.infer<typeof settingsZ>;
