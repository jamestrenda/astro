import { z } from "zod";
import { baseBlockZ } from "./base";
import type { PortableTextMarkDefinition } from "@portabletext/types";

export const internalRefZ = baseBlockZ.extend({
  _type: z.literal("internalRef"),
  slug: z.string(),
});

interface internalRefSchema extends z.infer<typeof internalRefZ> {}
export interface internalRef
  extends internalRefSchema,
    PortableTextMarkDefinition {
  _type: internalRefSchema["_type"];
}
