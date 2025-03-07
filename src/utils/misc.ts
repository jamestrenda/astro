import clsx, { type ClassValue } from 'clsx';
import type { Observable } from 'rxjs';
import type { DocumentStore } from 'sanity';
import { twMerge } from 'tailwind-merge';
/**
 * A handy utility that makes constructing class names easier.
 * It also merges tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// capitalize a string
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns an observable for a given Sanity query.
 */
export function listenToQuery<T>(
  documentStore: DocumentStore,
  query: string,
  params: Record<string, any> = {},
): Observable<T> {
  return documentStore.listenQuery(query, params, {}) as Observable<T>;
}

/**
 * Converts a string to title case.
 * @param str - The string to convert.
 * @returns The string in title case.
 */
export function titleCase(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
// export const getTitleCase = (name: string) => {
//   const titleTemp = name.replace(/([A-Z])/g, " $1");
//   return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
// };
