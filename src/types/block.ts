import { z } from "zod";
import { textBlockZ } from "./textBlock";

// TODO: remove undefined() once there are more block types
export const blockZ = z.union([textBlockZ, z.undefined()]);

export type Block = z.infer<typeof blockZ>;
