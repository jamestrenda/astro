import { loadQuery } from "../utils/load-query";
import {
  FORM_QUERY,
  INDEX_QUERY,
  POSTS_QUERY,
  POST_QUERY,
  SETTINGS_QUERY,
} from "./queries";
import type { Settings } from "~/types/settings";
import type { Post } from "~/types/post";
import { type Home } from "~/types/home";
import type { Form } from "~/types/form";
import type { FormQueryParams } from "~/types/formBlock";

export async function getPosts({
  preview,
  options,
}: {
  preview: boolean;
  options?: App.Locals["loadQueryOptions"];
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
  options: App.Locals["loadQueryOptions"];
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
  options: App.Locals["loadQueryOptions"];
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
}: FormQueryParams): Promise<Form["customFormFields"]> {
  const { data } = await loadQuery<Form["customFormFields"]>({
    query: FORM_QUERY,
    params: { pageType, slug },
    preview: false,
  });
  return data;
}

export async function getSettings({
  preview,
  options,
}: {
  preview: boolean;
  options: App.Locals["loadQueryOptions"];
}): Promise<Settings> {
  const { data } = await loadQuery<Settings>({
    query: SETTINGS_QUERY,
    preview,
    options,
  });

  return data;
}
