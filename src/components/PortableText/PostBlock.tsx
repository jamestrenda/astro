import { HashIcon } from 'lucide-react';
import type { PortableTextBlock as PortableTextBlockType } from '~/types/portableText';
import { Heading } from '../Heading';
import { Overline } from '../Overline';

export const PostBlock = {
  h1: ({ children }: { children: React.ReactNode }) => {
    return <Heading level="h1">{children}</Heading>;
  },
  h2: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: PortableTextBlockType;
  }) => {
    return (
      <Heading className="anchor relative" level="h2" id={value.anchor}>
        <a
          className="absolute inset-y-0 right-full hidden place-items-center px-2 text-muted! no-underline! opacity-0 transition hover:text-primary! hover:opacity-100 xl:grid"
          href={`#${value.anchor}`}
        >
          <HashIcon size={24} />
        </a>
        {children}
      </Heading>
    );
  },
  h3: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: PortableTextBlockType;
  }) => {
    return (
      <Heading className="anchor relative" level="h3" id={value.anchor}>
        <a
          className="absolute inset-y-0 right-full hidden place-items-center px-2 text-muted! no-underline! opacity-0 transition hover:text-primary! hover:opacity-100 xl:grid"
          href={`#${value.anchor}`}
        >
          <HashIcon size={24} />
        </a>
        {children}
      </Heading>
    );
  },
  h4: ({ children }: { children: React.ReactNode }) => {
    return <Heading level="h4">{children}</Heading>;
  },
  normal: ({ children }: { children: React.ReactNode }) => {
    return <p>{children}</p>;
  },
  overline: ({ children }: { children: React.ReactNode }) => {
    return <Overline>{children}</Overline>;
  },
  // add more block-level components here.
};
