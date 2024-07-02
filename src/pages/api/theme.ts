import type { APIRoute } from "astro";
import { ThemeFormSchema, getTheme, setTheme, type Theme } from "~/utils/theme";
import { parseWithZod } from "@conform-to/zod";
import { invariantResponse } from "@epic-web/invariant";

export const themeCookieName = "__theme";

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema,
  });

  invariantResponse(submission.status === "success", "Invalid theme received");
  const { theme } = submission.value;

  console.log("theme", theme);

  if (theme === "system") {
    cookies.set(themeCookieName, "", { path: "/", maxAge: -1 });
  } else {
    cookies.set(themeCookieName, theme, { path: "/", maxAge: 31536000 });
  }

  submission.value.theme =
    theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  return new Response(JSON.stringify({ result: submission }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const theme = getTheme(cookies);
  return new Response(JSON.stringify({ theme }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
