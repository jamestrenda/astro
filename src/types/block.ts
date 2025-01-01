import { z } from "zod";
import { baseBlockZ } from "./base";
import { internalRefZ } from "./internalRef";
import { externalLinkZ } from "./externalLink";

// PortableText block schema (Sanity's "block" type)
const portableTextZ = baseBlockZ.extend({
  _type: z.literal("block"),
  children: z.array(
    z.object({
      _type: z.literal("span"),
      text: z.string(),
      marks: z.array(z.string()).optional(),
      // marks: z.any().optional(),
    })
  ),
  style: z.union([
    z.literal("normal"),
    z.literal("h1"),
    z.literal("h2"),
    z.literal("h3"),
    z.literal("h4"),
    z.literal("h5"),
    z.literal("overline"),
    z.literal("blockquote"),
  ]),
  markDefs: z.array(z.union([internalRefZ, externalLinkZ])).optional(),
});

const portableTextBlockZ = baseBlockZ.extend({
  _type: z.literal("portableTextBlock"),
  portableText: z.array(portableTextZ),
});

// TODO: remove undefined() once there are more block types
export const blockZ = z.union([portableTextBlockZ, z.undefined()]);

export type Block = z.infer<typeof blockZ>;
