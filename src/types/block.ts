import { z } from "zod";
import { textBlockZ } from "./textBlock";
import { descriptionGridZ } from "./descriptionGrid";
import { portfolioZ } from "./portfolio";
import { heroZ } from "./hero";
import { formBlockZ } from "./formBlock";

// TODO: As noted in src/utils/sanity.ts, I need to handle parsing errors better. Currently, if there is a single
// parsing error in one of these types, the entire check fails resulting in a gnarly issues list,
// and the studio crashes as well because it's an embedded studio.
export const blockZ = z.union([
  descriptionGridZ,
  formBlockZ,
  heroZ,
  portfolioZ,
  textBlockZ,
]);

export type Block = z.infer<typeof blockZ>;
