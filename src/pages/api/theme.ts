import { parseWithZod } from '@conform-to/zod';
import type { APIRoute } from 'astro';
import { ThemeFormSchema, getTheme } from '~/utils/theme';

export const themeCookieName = '__theme';

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema,
  });

  if (submission.status !== 'success') {
    return new Response('Invalid theme received', {
      status: 400,
    });
  }
  const { theme } = submission.value;

  cookies.set(themeCookieName, theme, { path: '/', maxAge: 31536000 });

  return new Response(JSON.stringify({ theme: submission.value.theme }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

// TODO: where is this being used?
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const theme = getTheme(cookies);
  return new Response(JSON.stringify({ theme }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
