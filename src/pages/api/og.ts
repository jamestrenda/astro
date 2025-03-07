import { ImageResponse } from '@vercel/og';
import {
  queryGenericPageOGData,
  queryHomePageOGData,
  queryPageOGData,
  queryPostOGData,
} from '~/utils/queries';

import type { APIRoute } from 'astro';
import type { ImageResponseOptions } from 'node_modules/@vercel/og/dist/types';
import { sanityClient as client } from 'sanity:client';
import { handleErrors } from '~/utils/handleErrors';
import { dominantColorSeoImageRender } from '~/utils/og/dominantColorSeoImageRender';
import { errorContent } from '~/utils/og/error';
import { seoImageRender } from '~/utils/og/seoImageRender';

export const runtime = 'edge';

const ogImageDimensions = {
  width: 1200,
  height: 630,
};

export const getOgMetaData = (searchParams: URLSearchParams) => {
  const width = searchParams.get('width') as string;
  const height = searchParams.get('height') as string;

  const ogWidth = Number.isNaN(Number.parseInt(width))
    ? ogImageDimensions.width
    : Number.parseInt(width);

  const ogHeight = Number.isNaN(Number.parseInt(height))
    ? ogImageDimensions.height
    : Number.parseInt(height);

  return { width: ogWidth, height: ogHeight };
};

export async function getHomePageOGData(id: string) {
  return await handleErrors(client.fetch(queryHomePageOGData, { id }));
}

export async function getPageOGData(id: string) {
  return await handleErrors(client.fetch(queryPageOGData, { id }));
}

export async function getPostOGData(id: string) {
  return await handleErrors(client.fetch(queryPostOGData, { id }));
}

export async function getGenericPageOGData(id: string) {
  return await handleErrors(client.fetch(queryGenericPageOGData, { id }));
}

type ContentProps = Record<string, string>;

async function getTtfFont(
  family: string,
  axes: string[],
  value: number[],
): Promise<ArrayBuffer> {
  const familyParam = `${axes.join(',')}@${value.join(',')}`;

  // Get css style sheet with user agent Mozilla/5.0 Firefox/1.0 to ensure non-variable TTF is returned
  const cssCall = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 Firefox/1.0',
      },
    },
  );

  const css = await cssCall.text();
  const ttfUrl = css.match(/url\(([^)]+)\)/)?.[1];

  if (!ttfUrl) {
    throw new Error('Failed to extract font URL from CSS');
  }

  return await fetch(ttfUrl).then((res) => res.arrayBuffer());
}

const getOptions = async ({
  width,
  height,
}: {
  width: number;
  height: number;
}): Promise<ImageResponseOptions> => {
  const [interRegular, interBold, interSemiBold] = await Promise.all([
    getTtfFont('Inter', ['wght'], [400]),
    getTtfFont('Inter', ['wght'], [700]),
    getTtfFont('Inter', ['wght'], [600]),
  ]);
  return {
    width,
    height,
    fonts: [
      {
        name: 'Inter',
        data: interRegular,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Inter',
        data: interBold,
        style: 'normal',
        weight: 700,
      },
      {
        name: 'Inter',
        data: interSemiBold,
        style: 'normal',
        weight: 600,
      },
    ],
  };
};

const getHomePageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getHomePageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};
const getPageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const getPostContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getPostOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const getGenericPageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getGenericPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return dominantColorSeoImageRender(result);
};

const block = {
  homePage: getHomePageContent,
  page: getPageContent,
  post: getPostContent,
} as const;

export const GET: APIRoute = async ({ url }) => {
  const { searchParams } = new URL(url);
  const type = searchParams.get('type') as keyof typeof block;
  const { width, height } = getOgMetaData(searchParams);
  const params = Object.fromEntries(searchParams.entries());
  const options = await getOptions({ width, height });
  const image = block[type] ?? getGenericPageContent;
  try {
    const content = await image(params);
    return new ImageResponse(content ? content : errorContent, options);
  } catch (err) {
    console.log({ err });
    return new ImageResponse(errorContent, options);
  }
};
