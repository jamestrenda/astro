import { firstValueFrom } from "rxjs";
import {  type DocumentStore } from "sanity";
import home from "~/studio/schema/singletons/home";
import { listenToQuery } from "./misc";
/**
 * Fetches the homepage ID by resolving the observable.
 */
export async function getHomepageId(documentStore: DocumentStore) {
  return firstValueFrom(
    listenToQuery<string>(
      documentStore,
      `*[_id == "${home.name}"][0].homepage._ref`
    )
  );
}