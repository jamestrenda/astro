import type { PortableTextComponents } from '@portabletext/react';
import type { externalLink } from '~/types/externalLink';
import type { internalRef } from '~/types/internalRef';

export type Marks = internalRef | externalLink;

export const List: PortableTextComponents['list'] = {
  // Ex. 1: customizing common list types
  bullet: ({ children }) => <ul className="mt-xl list-disc">{children}</ul>,
  number: ({ children }) => (
    <ol className="mt-lg list-decimal pl-4">{children}</ol>
  ),

  // Ex. 2: rendering custom lists
  // checkmarks: ({ children }) => <ol className="m-auto text-lg">{children}</ol>,
};
