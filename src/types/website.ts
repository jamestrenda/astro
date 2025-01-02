import { z } from "zod";
import { baseBlockZ } from "./base";
import { clientZ } from "./client";
import { featureZ } from "./feature";
import { imageZ } from "./image";
import { portableTextZ } from "./portableText";

export const websiteZ = baseBlockZ.extend({
  _type: z.literal("website"),
  id: z.string(),
  client: clientZ.shape.name,
  title: z.string().optional().nullable(),
  description: z.array(portableTextZ).optional().nullable(),
  url: z.string().optional().nullable(),
  image: imageZ.optional().nullable(),
  features: z.array(featureZ).optional().nullable(),
});

export type Website = z.infer<typeof websiteZ>;