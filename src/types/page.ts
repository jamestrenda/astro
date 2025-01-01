import { z } from "zod";
import { seoZ } from "./seo";
import { blockZ } from "./block";

export const pageZ = z.object({
  slug: z.string(),
  blocks: z.array(blockZ).nonempty("Page must have at least one block"),
  seo: seoZ,
});

export type Page = z.infer<typeof pageZ>;
