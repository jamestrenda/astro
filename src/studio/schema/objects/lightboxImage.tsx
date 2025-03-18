import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { imageFields } from '../fields/image';

export const Icon = () => <ImageIcon size="1em" />;

export const title = 'Image';

export default defineType({
  name: 'lightboxImage',
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
  fields: [
    ...imageFields,
    defineField({
      name: 'lightbox',
      title: 'Use Lightbox?',
      type: 'boolean',
      description: 'Enable lightbox for this image',
      initialValue: true,
    }),
  ],
});
