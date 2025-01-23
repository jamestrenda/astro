import type { PortableTextComponents } from '@portabletext/react';
import type { externalLink } from '~/types/externalLink';
import type { internalRef } from '~/types/internalRef';

export type Marks = internalRef | externalLink;

export const Marks: PortableTextComponents['marks'] = {
  externalLink: ({ value, children }) => {
    return (
      <a
        href={value.url ?? '#'}
        target={value.newWindow ? '_blank' : undefined}
        className="text-blue-500"
      >
        {children}
      </a>
    );
  },
  internalRef: ({ value, children }) => {
    return (
      <a href={`/${value.slug}`} className="text-blue-500">
        {children}
      </a>
    );
  },
};
