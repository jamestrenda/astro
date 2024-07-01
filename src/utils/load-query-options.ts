import type { AstroCookies } from "astro";
import { previewCookieName } from "../pages/api/preview";
import type { ClientConfig } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
const token = import.meta.env.PUBLIC_SANITY_API_READ_TOKEN;
const studioUrl = import.meta.env.PUBLIC_SANITY_STUDIO_BASE_PATH;

export async function loadQueryOptions(
  cookies: AstroCookies
): Promise<{ preview: boolean; options: ClientConfig }> {
  const preview = cookies.get(previewCookieName)?.value === projectId;

  if (preview && !token) {
    throw new Error(
      `Cannot activate preview mode without a "SANITY_API_READ_TOKEN" token in your environment variables. \n\n
      Create one with "Viewer" permissions at\n\n
      https://sanity.io/manage/project/${projectId}/api#tokens`
    );
  }

  return {
    preview,
    options: {
      perspective: preview ? "previewDrafts" : "published",
      stega: preview ? { enabled: true, studioUrl } : undefined,
      useCdn: !preview,
      token: preview ? token : undefined,
      resultSourceMap: preview ? "withKeyArraySelector" : false,
    },
  };
}
