import { defineMiddleware, sequence } from 'astro:middleware';
import { redirectsZ, type Redirect } from './types/redirect';
import { loadQuery } from './utils/load-query';
import { loadQueryOptions } from './utils/load-query-options';
import { REDIRECTS_QUERY } from './utils/queries';
// import { getTheme } from "./utils/theme";

export const preview = defineMiddleware(async ({ cookies, locals }, next) => {
  // value for preview below is true...which is not what I expected
  const { preview, options } = await loadQueryOptions(cookies);

  locals.preview = preview;
  locals.loadQueryOptions = options;

  const response = await next();
  return response;
});

export const redirects = defineMiddleware(
  async ({ request, redirect }, next) => {
    const response = await next();

    let initial = await loadQuery<Redirect[]>({
      query: REDIRECTS_QUERY,
      preview: false,
    });

    const data = redirectsZ.parse(initial.data);

    const redirects = data?.reduce((redirects, next) => {
      let splat = false;
      let { _key, _type, from, to, permanent } = next;

      // super basic support for splats
      if (from.endsWith('/*')) {
        from = from.slice(0, -2);
        splat = true;
      }

      redirects.push({ _key, _type, from, to, splat, permanent });
      return redirects;
    }, [] as Redirect[]);

    if (!redirects) return response;

    let url = new URL(request.url);

    for (let r of redirects) {
      let { from, to, splat, permanent } = r;
      let match = splat ? url.pathname.startsWith(from) : from === url.pathname;
      if (match) {
        let location = to;
        if (to.endsWith('/*')) {
          let base = to.slice(0, -2);
          let splatPath = url.pathname.replace(from, '');
          location = base + splatPath;
        }
        if (
          !location.startsWith('/') &&
          !location.startsWith('http://') &&
          !location.startsWith('https://')
        ) {
          location = '/' + location;
        }
        return redirect(location, permanent ? 308 : 307);
      }
    }

    return response;
  },
);

// export const userPrefs = defineMiddleware(async ({ cookies, locals }, next) => {
//   // value for preview below is true...which is not what I expected
//   const theme = getTheme(cookies);

//   locals.theme = theme;

//   const response = await next();
//   return response;
// });

export const onRequest = sequence(redirects, preview);
