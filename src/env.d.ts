/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare namespace App {
  import type { FilteredResponseQueryOptions } from "@sanity/client";
  interface Locals {
    preview: boolean;
    loadQueryOptions: FilteredResponseQueryOptions;
  }
}
