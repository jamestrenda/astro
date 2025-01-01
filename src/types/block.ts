import { z } from "zod";
import { textBlockZ } from "./textBlock";
import { descriptionGridZ } from "./descriptionGrid";

export const blockZ = z.union([textBlockZ, descriptionGridZ]);

export type Block = z.infer<typeof blockZ>;
