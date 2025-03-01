import type { PortableTextComponents } from '@portabletext/react';
import { Heading } from '../Heading';
import { Overline } from '../Overline';

export const Block: PortableTextComponents['block'] = {
  h1: ({ children }) => {
    return <Heading level="h1">{children}</Heading>;
  },
  h2: ({ children }) => {
    return <Heading level="h2">{children}</Heading>;
  },
  h3: ({ children }) => {
    return <Heading level="h3">{children}</Heading>;
  },
  h4: ({ children }) => {
    return <Heading level="h4">{children}</Heading>;
  },
  normal: ({ children }) => {
    return <p>{children}</p>;
  },
  overline: ({ children }) => {
    return <Overline>{children}</Overline>;
  },
  // add more block-level components here.
};
