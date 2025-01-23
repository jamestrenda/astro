import type { Form, FormQueryParams } from '~/types/form';
import { type Home } from '~/types/home';
import type { Post } from '~/types/post';
import type { Settings } from '~/types/settings';
import { loadQuery } from '../utils/load-query';
import {
  FORM_QUERY,
  FROM_EMAIL_QUERY,
  INDEX_QUERY,
  POSTS_QUERY,
  POST_QUERY,
  SETTINGS_QUERY,
} from './queries';

export async function getPosts({
  preview,
  options,
}: {
  preview: boolean;
  options?: App.Locals['loadQueryOptions'];
}): Promise<Post[]> {
  const { data: posts } = await loadQuery<Post[]>({
    query: POSTS_QUERY,
    preview,
    options: options ?? undefined,
  });

  return posts;
}

export async function getPost({
  preview,
  options,
  slug,
}: {
  preview: boolean;
  slug: string;
  options: App.Locals['loadQueryOptions'];
}): Promise<Post> {
  const { data: post } = await loadQuery<Post>({
    query: POST_QUERY,
    params: { slug },
    preview,
    options,
  });
  return post;
}

export async function getIndex({
  preview,
  options,
}: {
  preview: boolean;
  options: App.Locals['loadQueryOptions'];
}): Promise<Home> {
  const { data } = await loadQuery<Home>({
    query: INDEX_QUERY,
    preview,
    options,
  });
  //
  // const { seo } = data;

  // // Validate the seo
  // const seoValidationResult = validateZodSchema(seo, [seoZ]);

  // // Validate the blocks
  // const blocksValidatioResult = blockZ.safeParse(blocks);

  // if (seoValidationResult.success) {
  //   // TODO: handle this better so that
  //   // 1. The error is more readable
  //   // 2. The studio doesn't crash
  //   // throw new Error(seoValidationResult.error.message);
  //   // return seoValidationResult
  // }

  // if (!blocksValidatioResult.success) {
  //   // TODO: handle this better so that
  //   // 1. The error is more readable
  //   // 2. The studio doesn't crash
  //   throw new Error(blocksValidatioResult.error.message);
  //   // return validationResult.error;
  // }

  // // return validationResult.data;
  return data;
}

export async function getForm({
  pageType,
  slug,
}: FormQueryParams): Promise<Form> {
  const { data } = await loadQuery<Form>({
    query: FORM_QUERY,
    params: { _type: pageType, slug },
    preview: false,
  });
  return data;
}

export async function getFromEmail(): Promise<string> {
  const { data } = await loadQuery<string>({
    query: FROM_EMAIL_QUERY,
    preview: false,
  });
  return data;
}

export async function getSettings({
  preview,
  options,
}: {
  preview: boolean;
  options: App.Locals['loadQueryOptions'];
}): Promise<Settings> {
  const { data } = await loadQuery<Settings>({
    query: SETTINGS_QUERY,
    preview,
    options,
  });

  return data;
}
