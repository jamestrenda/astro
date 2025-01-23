// load-query.ts
import { type QueryParams } from 'sanity';
import { sanityClient } from 'sanity:client';

const token = import.meta.env.PUBLIC_SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>({
  query,
  params,
  preview,
  options,
}: {
  query: string;
  params?: QueryParams;
  preview: boolean;
  options?: App.Locals['loadQueryOptions'];
}) {
  if (preview && options?.token && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.',
    );
  }

  const perspective = preview ? 'previewDrafts' : 'published';

  // @ts-ignore
  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    options
      ? {
          ...options,
          filterResponse: false,
        }
      : {
          filterResponse: false,
          perspective,
          resultSourceMap: preview ? 'withKeyArraySelector' : false,
          stega: preview,
          ...(preview ? { token } : {}),
          useCdn: !preview,
        },
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}
