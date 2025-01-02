import { z } from "zod";
import { textBlockZ } from "./textBlock";
import { descriptionGridZ } from "./descriptionGrid";
import { portfolioZ } from "./portfolio";

export const blockZ = z.union([textBlockZ, descriptionGridZ, portfolioZ]);

export type Block = z.infer<typeof blockZ>;
