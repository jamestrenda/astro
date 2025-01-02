import { z } from "zod";
import { portableTextZ } from "./portableText";
import { baseBlockZ } from "./base";
import { imageZ } from "./image";
import { marqueeZ } from "./marquee";

export const heroZ = baseBlockZ.extend({
  _type: z.literal("hero"),
  valueProposition: z.array(portableTextZ),
  logos: z.array(marqueeZ).nullable().optional(),
  image: imageZ.nullable().optional(),
});

export type Hero = z.infer<typeof heroZ>;
