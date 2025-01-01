import { PortableText as PT } from "@portabletext/react";
import { components } from ".";
import type { PortableTextBlock } from "@portabletext/types";
import type { Marks } from "./Marks";

export interface Props {
  value: PortableTextBlock<Marks>[];
}

export const PortableText = ({ value }: Props) => {
  return <PT value={value} components={components} />;
};
