import { z } from 'zod';
import { pageZ } from './page';

export const homeZ = pageZ;

export type Home = z.infer<typeof homeZ>;
