import { useState, useEffect } from "react";
import {  takeUntil, Subject } from "rxjs";
import { type DocumentStore } from "sanity";
import { listenToQuery } from "~/utils/misc";

/**
 * Custom hook to listen for homepage ID updates in real-time.
 */
export const useHomepageId = (documentStore: DocumentStore) => {
  const [homepageId, setHomepageId] = useState<string | null>(null);

  useEffect(() => {
    const destroy$ = new Subject<void>();

    const subscription = listenToQuery<string>(
      documentStore,
      `*[_id == "home"][0].homepage._ref`
    )
      .pipe(takeUntil(destroy$))
      .subscribe({
        next: setHomepageId,
        error: console.error
      });

    return () => {
      destroy$.next();
      destroy$.complete();
      subscription.unsubscribe();
    };
  }, [documentStore]);

  return homepageId;
}