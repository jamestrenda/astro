import { z } from "zod";
import { baseBlockZ } from "./base";
import { imageZ } from "./image";

export const marqueeZ = baseBlockZ.extend({
  _type: z.literal("marquee"),
  speed: z.number().int().positive(),
  direction: z.enum(["forwards", "reverse"]),
  items: z.array(imageZ).nullable().optional(),
});

export type Hero = z.infer<typeof marqueeZ>;
