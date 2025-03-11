import { z } from 'zod';
import { externalLinkZ } from './externalLink';
import { internalRefZ } from './internalRef';
import { relativeUrlZ } from './relativeUrl';

export const linkZ = z.union([internalRefZ, externalLinkZ, relativeUrlZ]);

export type Link = z.infer<typeof linkZ> & {
  children?: React.ReactNode;
  className?: string;
};
