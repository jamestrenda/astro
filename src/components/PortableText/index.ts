import type { PortableTextComponents } from '@portabletext/react';
import { Block } from './Block';
import { List } from './List';
import { Marks } from './Marks';
import { PostBlock } from './PostBlock';
import { Types } from './Types';

export const components: PortableTextComponents = {
  block: Block,
  marks: Marks,
  list: List,
  types: Types,
};

export const postComponents: PortableTextComponents = {
  block: PostBlock,
  marks: Marks,
  list: List,
  types: Types,
};
