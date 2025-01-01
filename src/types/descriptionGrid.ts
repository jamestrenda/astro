import { z } from "zod";
import { portableTextZ } from "./portableText";
import { descriptionItemZ } from "./descriptionItem";
import { baseBlockZ } from "./base";

export const descriptionGridZ = baseBlockZ.extend({
  _type: z.literal("descriptionGrid"),
  header: z.array(portableTextZ),
  items: z
    .array(descriptionItemZ)
    .nonempty("Description grid must have at least one item"),
});

export type DescriptionGrid = z.infer<typeof descriptionGridZ>;
