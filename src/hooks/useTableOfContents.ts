import { useEffect, useState } from 'react';
import type { Post } from '~/types/post';

export function useTableOfContents(toc: Required<Post>['toc']) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Only run on screens wider than 1280px
    if (
      typeof window === 'undefined' ||
      window.innerWidth < 1280 ||
      !toc?.length
    ) {
      return;
    }

    // Set initial active state to first item
    setActiveId(toc?.[0]?.anchor ?? '');

    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveId(visible.target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20px 0px -40% 0px',
    });

    // Observe all heading elements
    document.querySelectorAll('.anchor').forEach((element) => {
      observer.observe(element);
    });

    // Cleanup function
    const cleanup = () => {
      observer.disconnect();
    };

    // Add resize listener to disable observer on smaller screens
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        cleanup();
        setActiveId(''); // Reset active state
      } else {
        // Re-observe elements when screen becomes large enough
        document.querySelectorAll('.anchor').forEach((element) => {
          observer.observe(element);
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, [toc]);

  return activeId;
}
