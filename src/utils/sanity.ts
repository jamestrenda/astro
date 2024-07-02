import type { z } from "zod";
import { loadQuery } from "../utils/load-query";
import {
  INDEX_QUERY,
  POSTS_QUERY,
  POST_QUERY,
  SETTINGS_QUERY,
} from "./queries";
import type { Settings } from "~/types/settings";
import type { Post } from "~/types/post";

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
}): Promise<any> {
  const { data: post } = await loadQuery<Array<{ title: string }>>({
    query: INDEX_QUERY,
    preview,
    options,
  });
  return post;
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
