import { defineMiddleware, sequence } from "astro:middleware";
import { loadQueryOptions } from "./utils/load-query-options";
// import { getTheme } from "./utils/theme";

export const preview = defineMiddleware(async ({ cookies, locals }, next) => {
  // value for preview below is true...which is not what I expected
  const { preview, options } = await loadQueryOptions(cookies);

  locals.preview = preview;
  locals.loadQueryOptions = options;

  const response = await next();
  return response;
});

// export const userPrefs = defineMiddleware(async ({ cookies, locals }, next) => {
//   // value for preview below is true...which is not what I expected
//   const theme = getTheme(cookies);

//   locals.theme = theme;

//   const response = await next();
//   return response;
// });

export const onRequest = sequence(preview);
