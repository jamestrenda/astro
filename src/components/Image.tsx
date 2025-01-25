import type { ImageUrlFitMode, ImageUrlFormat } from '@sanity/types';
import type { DirectQueryParams } from 'node_modules/sanity-image/dist/types';
import { type SanityImageObjectExtended } from '~/types/image';

// import { cva } from "class-variance-authority";
import type { SourceHTMLAttributes } from 'react';
import { SanityImage as InternalSanityImage } from 'sanity-image';
import { getEnv } from '~/utils/env';

const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } =
  getEnv();

const baseUrl = `https://cdn.sanity.io/images/${PUBLIC_SANITY_STUDIO_PROJECT_ID}/${PUBLIC_SANITY_STUDIO_DATASET}/`;

export type ImageProps = {
  src: SanityImageObjectExtended;
  q?: number;
  fit?: ImageUrlFitMode;
  format?: ImageUrlFormat;
  width?: number;
  height?: number;
  mode?: 'contain' | 'cover';
  queryParams?: DirectQueryParams | undefined;
  sizes?: string | undefined;
  preview?: boolean | undefined;
  as?: 'img' | 'source';
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'width' | 'height' | 'src'
> &
  Pick<SourceHTMLAttributes<HTMLSourceElement>, 'media'>;

export const SanityImage = (props: ImageProps) => {
  const {
    src,
    className,
    width,
    height,
    alt,
    q,
    mode = 'cover',
    fit = 'crop',
    queryParams,
    sizes,
    as,
    preview = true,
    ...attrs
  } = props;

  return src.asset ? (
    <InternalSanityImage
      id={src.asset._id}
      baseUrl={baseUrl}
      width={Number(width)}
      height={Number(height)}
      mode={mode}
      hotspot={src.hotspot ?? undefined}
      crop={src.crop ?? undefined}
      preview={preview ? src.asset.metadata?.lqip ?? undefined : undefined}
      as={as}
      // @ts-ignore
      alt={alt ?? src.asset.altText ?? ''}
      queryParams={{ ...queryParams, q: queryParams?.q ?? 75 }}
      className={className}
      sizes={sizes ?? undefined}
      {...attrs}
    />
  ) : null;
};
