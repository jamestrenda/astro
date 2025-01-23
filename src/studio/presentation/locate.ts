// locations.ts
import { map, Observable } from 'rxjs';
import {
  type DocumentLocationResolver,
  type DocumentLocationsState,
} from 'sanity/presentation';

export const locations: DocumentLocationResolver = (params, context) => {
  switch (params.type) {
    // case "siteSettings": {
    //   return defineLocations({
    //     message: "This document is used on all pages",
    //     tone: "caution",
    //   });
    // }
    case 'post': {
      const doc$ = context.documentStore.listenQuery(
        `*[_id==$id || references($id)]{_type,slug,title}`,
        params,
        { perspective: 'previewDrafts' },
      ) as Observable<
        | {
            _type: string;
            slug?: { current: string };
            title?: string | null;
          }[]
        | null
      >;
      // pipe the real-time results to RXJS's map function
      return doc$.pipe(
        map((docs) => {
          if (!docs) {
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            } satisfies DocumentLocationsState;
          }
          // Generate all the locations for person documents
          //   const personLocations = docs
          //     .filter(({ _type, slug }) => _type === 'person' && slug?.current)
          //     .map(({ name, slug }) => ({
          //       title: name || 'Name missing',
          //       href: `/authors/${slug.current}`,
          //     }))

          // Generate all the locations for post documents
          const postLocations: Array<any> = docs
            .filter(({ _type, slug }) => _type === 'post' && slug?.current)
            .map(({ title, slug }) => ({
              title: title || 'Untitled',
              href: `/blog/${slug?.current}`,
            }));

          return {
            locations: [
              //   ...personLocations,
              ...postLocations,
              // Add a link to the "All posts" page when there are post documents
              postLocations.length > 0 && {
                title: 'Home',
                href: '/',
              },
              // Add a link to the "All authors" page when there are person documents
              //   personLocations.length > 0 && {
              //     title: 'All authors',
              //     href: '/authors',
              //   },
            ].filter(Boolean),
          } satisfies DocumentLocationsState;
        }),
      );
    }
  }

  return null;
};
