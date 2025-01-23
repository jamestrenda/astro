/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare namespace App {
  import type { FilteredResponseQueryOptions } from '@sanity/client';
  import type { Theme } from './utils/theme';
  interface Locals {
    preview: boolean;
    loadQueryOptions: FilteredResponseQueryOptions;
    theme: Theme;
  }
}
