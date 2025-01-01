import { loadQuery } from "../utils/load-query";
import {
  INDEX_QUERY,
  POSTS_QUERY,
  POST_QUERY,
  SETTINGS_QUERY,
} from "./queries";
import type { Settings } from "~/types/settings";
import type { Post } from "~/types/post";
import { homeZ, type Home } from "~/types/home";

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
  const { data } = await loadQuery<Array<{ title: string }>>({
    query: INDEX_QUERY,
    preview,
    options,
  });

  const validationResult = homeZ.safeParse(data);
  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }

  return validationResult.data;
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
