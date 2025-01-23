import { z } from 'zod';
import { websiteZ } from './website';

// TOOD: convert to z.union([...]) to include other types
export const portfolioItemZ = websiteZ;

export type PortfolioItem = z.infer<typeof portfolioItemZ>;
