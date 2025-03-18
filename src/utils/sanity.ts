import type { Form, FormQueryParams } from '~/types/form';
import { type Home } from '~/types/home';
import type { Page } from '~/types/page';
import type { Post } from '~/types/post';
import type { PostList } from '~/types/postList';
import type { Recipe } from '~/types/recipe';
import type { Settings } from '~/types/settings';
import { loadQuery } from '../utils/load-query';
import {
  BLOG_INDEX_SLUG_QUERY,
  FORM_QUERY,
  FROM_EMAIL_QUERY,
  INDEX_QUERY,
  PAGES_QUERY,
  PAGE_QUERY,
  POSTS_BY_TAG_QUERY,
  POSTS_QUERY,
  POST_QUERY,
  RECIPES_QUERY,
  RECIPE_QUERY,
  SETTINGS_QUERY,
} from './queries';

export const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:4321';
};

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

export async function getPostsByTag({
  preview,
  options,
  tag,
}: {
  preview: boolean;
  options?: App.Locals['loadQueryOptions'];
  tag: string;
}): Promise<PostList> {
  const { data: posts } = await loadQuery<PostList>({
    query: POSTS_BY_TAG_QUERY,
    preview,
    options: options ?? undefined,
    params: { tag },
  });

  return posts;
}

export async function getPages({
  preview,
  options,
}: {
  preview: boolean;
  options?: App.Locals['loadQueryOptions'];
}): Promise<Page[]> {
  const { data: pages } = await loadQuery<Page[]>({
    query: PAGES_QUERY,
    preview,
    options: options ?? undefined,
  });

  return pages;
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

export async function getBlogIndexSlug({
  preview,
  options,
}: {
  preview: boolean;
  options: App.Locals['loadQueryOptions'];
}): Promise<string> {
  const { data } = await loadQuery<string>({
    query: BLOG_INDEX_SLUG_QUERY,
    preview,
    options,
  });
  return data;
}

export async function getRecipes({
  preview,
  options,
}: {
  preview: boolean;
  options?: App.Locals['loadQueryOptions'];
}): Promise<Recipe[]> {
  const { data: recipes } = await loadQuery<Recipe[]>({
    query: RECIPES_QUERY,
    preview,
    options: options ?? undefined,
  });

  return recipes;
}

export async function getRecipe({
  preview,
  options,
  slug,
}: {
  preview: boolean;
  slug: string;
  options: App.Locals['loadQueryOptions'];
}): Promise<Recipe> {
  const { data: recipe } = await loadQuery<Recipe>({
    query: RECIPE_QUERY,
    params: { slug },
    preview,
    options,
  });
  return recipe;
}

export async function getPage({
  preview,
  options,
  slug,
}: {
  preview: boolean;
  slug: string;
  options: App.Locals['loadQueryOptions'];
}): Promise<Page> {
  const { data } = await loadQuery<Page>({
    query: PAGE_QUERY,
    params: { slug },
    preview,
    options,
  });

  return data;
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
