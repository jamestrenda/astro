import { z } from "zod";
import { pageZ } from "./page";

export const homeZ = pageZ.omit({
  slug: true,
});

export type Home = z.infer<typeof homeZ>;
