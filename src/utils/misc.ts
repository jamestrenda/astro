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

/**
 * Formats a given date into a readable string, either as an absolute date or a relative time.
 *
 * @param {string | number | Date} date - The date to format. Can be a string, timestamp, or Date object.
 * @param {Object} [options] - Formatting options.
 * @param {string} [options.locale='en-US'] - The locale for formatting (default is 'en-US').
 * @param {boolean} [options.relative=false] - If true, returns a relative time format (e.g., "yesterday", "last week").
 * @returns {string} - The formatted date string.
 */
export function formatDate(
  date: string | number | Date,
  options: { locale?: string; relative?: boolean } = {},
): string {
  const { locale = 'en-US', relative = false } = options;
  const inputDate = new Date(date);
  const now = new Date();

  if (Number.isNaN(inputDate.getTime())) {
    throw new Error('Invalid date provided');
  }

  if (relative) {
    const diffInSeconds = Math.floor(
      (inputDate.getTime() - now.getTime()) / 1000,
    );
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (Math.abs(diffInSeconds) < 60)
      return rtf.format(diffInSeconds, 'second');
    if (Math.abs(diffInMinutes) < 60)
      return rtf.format(diffInMinutes, 'minute');
    if (Math.abs(diffInHours) < 24) return rtf.format(diffInHours, 'hour');
    if (Math.abs(diffInDays) < 7) return rtf.format(diffInDays, 'day');
    if (Math.abs(diffInDays) < 30)
      return rtf.format(Math.round(diffInDays / 7), 'week');
    if (Math.abs(diffInDays) < 365)
      return rtf.format(Math.round(diffInDays / 30), 'month');
    return rtf.format(Math.round(diffInDays / 365), 'year');
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(inputDate);
}
