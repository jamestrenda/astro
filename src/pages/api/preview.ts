import type { APIRoute } from "astro";
const token = import.meta.env.PUBLIC_SANITY_API_READ_TOKEN;
const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
import { sanityClient } from "sanity:client";
import { validatePreviewUrl } from "@sanity/preview-url-secret";

export const previewCookieName = "__preview";

// A `POST` request to this route will exit preview mode
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  cookies.delete(previewCookieName);
  return redirect("/");
};

// A `GET` request to this route will enter preview mode
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  if (!token) {
    throw new Error("A read token is required to enable Visual Editing.");
  }

  const clientWithToken = sanityClient.withConfig({
    token,
  });

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return redirect("/");
  }

  cookies.set(previewCookieName, projectId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
  });

  return redirect(redirectTo);
};
