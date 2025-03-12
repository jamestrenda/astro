import type {
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import type { externalLink } from '~/types/externalLink';
import type { internalRef } from '~/types/internalRef';

export type Marks = internalRef | externalLink;

export const Marks: PortableTextComponents['marks'] = {
  externalLink: ({
    value,
    children,
  }: PortableTextMarkComponentProps<externalLink>) => {
    if (!value) return null;
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
  internalRef: ({
    value,
    children,
  }: PortableTextMarkComponentProps<internalRef>) => {
    if (!value) return null;
    return (
      <a href={`/${value.slug}`} className="text-blue-500">
        {children}
      </a>
    );
  },
  code: ({
    value,
    children,
  }: PortableTextMarkComponentProps<{ _type: 'code' }>) => {
    return (
      <code className="not-prose pointer-events-auto rounded-md bg-background p-1 font-mono text-sm text-muted dark:bg-zinc-950 dark:text-white/70">
        {children}
      </code>
    );
  },
};
