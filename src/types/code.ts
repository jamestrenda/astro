import { z } from 'zod';

export const code = z.object({
  language: z.string(),
  code: z.string(),
  highlightedLines: z.array(z.string()),
});

export type Code = z.infer<typeof code>;
