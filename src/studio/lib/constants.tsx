import type { FieldGroupDefinition } from '@sanity/types';
import { ImageIcon, ImagesIcon, SearchCheckIcon } from 'lucide-react';

export const GROUP = {
  ASSETS: 'assets',
  IMAGE: 'image',
  META: 'meta',
  MAIN_CONTENT: 'main-content',
};

export const GROUPS: FieldGroupDefinition[] = [
  {
    name: GROUP.MAIN_CONTENT,
    //   icon: ComposeIcon,
    title: 'Content',
    default: true,
  },
  {
    name: GROUP.IMAGE,
    icon: () => <ImageIcon size="1em" />,
    title: 'Image',
  },
  {
    name: GROUP.ASSETS,
    icon: () => <ImagesIcon size="1em" />,
    title: 'Assets',
  },
  {
    name: GROUP.META,
    icon: () => <SearchCheckIcon size="1em" />,
    title: 'Metadata',
  },
  // {
  //   name: GROUP.OG,
  //   icon: InsertAboveIcon,
  //   title: "Open Graph",
  // },
];
