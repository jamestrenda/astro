import type { PortableTextComponentProps } from '@portabletext/react';
import { HashIcon } from 'lucide-react';
import type { PortableTextBlock as PortableTextBlockType } from '~/types/portableText';
import { Heading } from '../Heading';
import { Overline } from '../Overline';

export const PostBlock = {
  h1: ({ children }: PortableTextComponentProps<PortableTextBlockType>) => {
    return <Heading level="h1">{children}</Heading>;
  },
  h2: ({
    children,
    value,
  }: PortableTextComponentProps<PortableTextBlockType>) => {
    return (
      <Heading className="group anchor relative" level="h2" id={value.anchor}>
        <span className="pointer-events-none absolute inset-y-0 -left-8 hidden place-items-center text-muted opacity-0 group-hover:opacity-100 xl:grid">
          <HashIcon size={24} />
        </span>
        <a className="text-inherit! no-underline!" href={`#${value.anchor}`}>
          {children}
        </a>
      </Heading>
    );
  },
  h3: ({
    children,
    value,
  }: PortableTextComponentProps<PortableTextBlockType>) => {
    return (
      <Heading className="group anchor relative" level="h3" id={value.anchor}>
        <span className="pointer-events-none absolute inset-y-0 -left-8 hidden place-items-center text-muted opacity-0 group-hover:opacity-100 xl:grid">
          <HashIcon size={24} />
        </span>
        <a className="text-inherit! no-underline!" href={`#${value.anchor}`}>
          {children}
        </a>
      </Heading>
    );
  },
  h4: ({ children }: PortableTextComponentProps<PortableTextBlockType>) => {
    return <Heading level="h4">{children}</Heading>;
  },
  normal: ({ children }: PortableTextComponentProps<PortableTextBlockType>) => {
    return <p>{children}</p>;
  },
  overline: ({
    children,
  }: PortableTextComponentProps<PortableTextBlockType>) => {
    return <Overline>{children}</Overline>;
  },
  // add more block-level components here.
};
