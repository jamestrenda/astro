import { z } from "zod";
import { baseBlockZ } from "./base";
import { portfolioItemZ } from "./portfolioItem";

export const portfolioZ = baseBlockZ.extend({
  _type: z.literal("portfolio"),
  title: z.string().optional().nullable(),
  items: z
    .array(portfolioItemZ)
    .nonempty("Description grid must have at least one item"),
});

export type Portfolio = z.infer<typeof portfolioZ>;
