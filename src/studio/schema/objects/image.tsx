import { ImageIcon } from 'lucide-react';
import { defineType } from 'sanity';
import { imageFields } from '../fields/image';

export const Icon = () => <ImageIcon size="1em" />;

export const title = 'Image';

export default defineType({
  name: 'imageObject',
  title,
  type: 'object',
  icon: Icon,
  preview: {
    select: {
      filename: 'image.asset.originalFilename',
      altText: 'altText',
      caption: 'caption',
      globalAltText: 'image.asset.altText',
      media: 'image',
    },
    prepare({ filename, altText, globalAltText, caption, media }) {
      return {
        title: caption ?? altText ?? globalAltText ?? filename,
        subtitle: title,
        media,
      };
    },
  },
  fields: [...imageFields],
});

export function getImageObjectTitle() {
  return title;
}
