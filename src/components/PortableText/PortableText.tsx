import { PortableText as PT } from '@portabletext/react';
import type { PortableText as PortableTextProps } from '~/types/portableText';
import { components as c, postComponents as pc } from '.';
export interface Props {
  portableText: PortableTextProps;
  // components?: PortableTextComponents;
  blog?: boolean;
}

export const PortableText = ({ portableText, blog }: Props) => {
  return <PT value={portableText} components={blog ? pc : c} />;
};
