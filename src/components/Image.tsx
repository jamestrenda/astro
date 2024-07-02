import { type SanityImageObjectExtended } from "~/types/image";
import type { ImageUrlFitMode, ImageUrlFormat } from "@sanity/types";
import type { DirectQueryParams } from "node_modules/sanity-image/dist/types";

// import { cva } from "class-variance-authority";
import { SanityImage as InternalSanityImage } from "sanity-image";
import { getEnv } from "~/utils/env";

const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } =
  getEnv();

const baseUrl = `https://cdn.sanity.io/images/${PUBLIC_SANITY_STUDIO_PROJECT_ID}/${PUBLIC_SANITY_STUDIO_DATASET}/`;

export type ImageProps = {
  src: SanityImageObjectExtended;
  alt?: string;
  q?: number;
  fit?: ImageUrlFitMode;
  format?: ImageUrlFormat;
  width?: number;
  height?: number;
  mode?: "contain" | "cover";
  queryParams?: DirectQueryParams | undefined;
  sizes?: string | undefined;
  preview?: boolean | undefined;
};

export const SanityImage = (
  props: ImageProps &
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height" | "src">
) => {
  const {
    src,
    className,
    width,
    height,
    alt,
    q,
    mode = "cover",
    fit = "crop",
    queryParams,
    sizes,
    preview = true,
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
      queryParams={{ ...queryParams, q: q ?? 75 }}
      alt={alt ?? src.asset.altText ?? ""}
      className={className}
      sizes={sizes ?? undefined}
    />
  ) : null;
};
