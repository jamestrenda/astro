import { loadQuery } from "../utils/load-query";
import groq from "groq";
import { POST_QUERY } from "./queries";

export async function getPosts({
  preview,
  options,
}: {
  preview: boolean;
  options?: App.Locals["loadQueryOptions"];
}): Promise<any[]> {
  const { data: posts } = await loadQuery<Array<{ title: string }>>({
    query: groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
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
}): Promise<any> {
  const { data: post } = await loadQuery<Array<{ title: string }>>({
    query: POST_QUERY,
    params: { slug },
    preview,
    options,
  });
  return post;
}
