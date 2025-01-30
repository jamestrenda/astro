// import { cva } from "class-variance-authority";
import { forwardRef } from 'react';
import { SanityImage, type WrapperProps } from 'sanity-image';
import type { SanityImageObjectExtended } from '~/types/image';
import { getEnv } from '~/utils/env';

const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } =
  getEnv();

const baseUrl = `https://cdn.sanity.io/images/${PUBLIC_SANITY_STUDIO_PROJECT_ID}/${PUBLIC_SANITY_STUDIO_DATASET}/`;

// export type ImageProps = {
//   src: SanityImageObjectExtended;
//   q?: number;
//   fit?: ImageUrlFitMode;
//   format?: ImageUrlFormat;
//   width?: number;
//   height?: number;
//   mode?: 'contain' | 'cover';
//   queryParams?: DirectQueryParams | undefined;
//   sizes?: string | undefined;
//   preview?: boolean | undefined;
//   as?: 'img' | 'source';
// } & Omit<
//   React.ImgHTMLAttributes<HTMLImageElement>,
//   'width' | 'height' | 'src'
// > &
//   Pick<SourceHTMLAttributes<HTMLSourceElement>, 'media'>;

export const Image = <T extends React.ElementType = 'img'>(
  props: WrapperProps<T> & { asset: SanityImageObjectExtended },
) => {
  const {
    asset,
    alt,
    // fit = 'crop',
    queryParams,
    sizes,
    as,
  } = props;

  return asset ? (
    <SanityImage
      {...props}
      asset={undefined}
      baseUrl={baseUrl}
      hotspot={asset.hotspot ?? undefined}
      crop={asset.crop ?? undefined}
      preview={asset.preview}
      as={as}
      alt={alt ?? asset.altText ?? ''}
      queryParams={{ ...queryParams, q: queryParams?.q ?? 75 }}
      sizes={sizes ?? undefined}
    />
  ) : null;
};

export const Source = forwardRef(
  ({ src, ...props }: WrapperProps<'source'>, ref) => <source {...props} />,
);
