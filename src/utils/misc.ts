import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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
