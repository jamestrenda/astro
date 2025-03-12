import { useEffect, useMemo, useState } from 'react';
import type { Post } from '~/types/post';
import type { TOCItem } from '~/types/toc';

const createNestedTocStructure = (toc: TOCItem[]): TOCItem[] => {
  const nestedToc: TOCItem[] = [];
  let lastH2: TOCItem | null = null;

  toc.forEach((item) => {
    if (item.style === 'h2') {
      lastH2 = { ...item, children: [] };
      nestedToc.push(lastH2);
    } else if (item.style === 'h3' && lastH2) {
      lastH2.children.push({
        _type: 'block',
        _key: item._key,
        style: 'h3',
        text: item.text,
        anchor: item.anchor,
      });
    }
  });

  return nestedToc;
};

export function useTableOfContents(toc: Required<Post>['toc']) {
  const [activeId, setActiveId] = useState<string>('');
  const structuredTOC = useMemo(() => createNestedTocStructure(toc), [toc]);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    let observer: IntersectionObserver | null = null;

    const observeHeadings = () => {
      const callback: IntersectionObserverCallback = (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0 && visibleEntries[0]?.target) {
          setActiveId(visibleEntries[0].target.id);
        } else {
          let closestPrevious: Element | null = null;
          const allHeadings = Array.from(document.querySelectorAll('.anchor'));

          for (let i = allHeadings.length - 1; i >= 0; i--) {
            const rect = allHeadings[i]?.getBoundingClientRect(); // Optional chaining
            if (rect && rect.top < window.innerHeight * 0.4) {
              closestPrevious = allHeadings[i] as Element;
              break;
            }
          }

          if (closestPrevious) setActiveId(closestPrevious.id);
        }
      };

      observer = new IntersectionObserver(callback, {
        rootMargin: '-20px 0px -40% 0px',
        threshold: 0.1,
      });

      document
        .querySelectorAll('.anchor')
        .forEach((el) => observer?.observe(el));
    };

    observeHeadings(); // Initial observation

    // OPTIONAL: Watch for new headings being added
    const mutationObserver = new MutationObserver(() => {
      observer?.disconnect();
      observeHeadings(); // Reattach observer when content changes
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
  return { activeId, structuredTOC };
}
