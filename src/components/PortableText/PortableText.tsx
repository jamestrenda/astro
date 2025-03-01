import { PortableText as PT } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { components as c, postComponents as pc } from '.';
import type { Marks } from './Marks';

export interface Props {
  portableText: PortableTextBlock<Marks>[];
  // components?: PortableTextComponents;
  blog?: boolean;
}

export const PortableText = ({ portableText, blog }: Props) => {
  return <PT value={portableText} components={blog ? pc : c} />;
};
