import { PortableText as PT } from "@portabletext/react";
import { components } from ".";
import type { PortableTextBlock } from "@portabletext/types";
import type { Marks } from "./Marks";

export interface Props {
  portableText: PortableTextBlock<Marks>[];
}

export const PortableText = ({ portableText }: Props) => {
  return <PT value={portableText} components={components} />;
};
