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
  params: Record<string, any> = {}
): Observable<T> {
  return documentStore.listenQuery(query, params, {}) as Observable<T>;
}
