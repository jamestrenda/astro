import type {
  PortableTextBlock,
  PortableTextComponentProps,
  PortableTextComponents,
} from '@portabletext/react';
import { HashIcon } from 'lucide-react';
import { Heading } from '../Heading';
import { Overline } from '../Overline';

interface CustomBlock extends PortableTextBlock {
  anchor?: string;
}

export const PostBlock: PortableTextComponents['block'] = {
  h1: ({ children }) => {
    return <Heading level="h1">{children}</Heading>;
  },
  h2: (props: PortableTextComponentProps<CustomBlock>) => {
    const { children, value } = props;
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
  h3: (props: PortableTextComponentProps<CustomBlock>) => {
    const { children, value } = props;
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
