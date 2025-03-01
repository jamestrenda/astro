import { useEffect, useState } from 'react';
import type { Post } from '~/types/post';

export const TableOfContents = ({ toc }: { toc: Required<Post>['toc'] }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Set initial active state to first item
    if (toc.length > 0) {
      setActiveId(toc[0].anchor);
    }

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the first heading that's currently visible
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveId(visible.target.id);
      }
    };

    // Create observer with slight offset to trigger earlier
    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20px 0px -40% 0px',
    });

    // Observe all heading elements
    document.querySelectorAll('.anchor').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc) return null;
  return (
    <div className="order-2 max-xl:hidden">
      <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden pt-10 pb-24 pl-6">
        <div className="not-prose flex min-w-72 flex-col gap-3">
          <h3 className="my-0! text-sm/6 font-medium tracking-widest text-muted uppercase sm:text-xs/6">
            On this page
          </h3>
          <nav className="mt-0">
            <ul className="flex flex-col gap-2 border-l border-[color-mix(in_oklab,_var(--color-zinc-950),white_80%)] dark:border-[color-mix(in_oklab,_var(--color-zinc-950),white_20%)]">
              {toc.map((item) => (
                <li
                  key={item._key}
                  className="-ml-px flex flex-col items-start gap-2"
                >
                  <a
                    className="inline-block border-l border-transparent pl-5 text-base/8 text-muted hover:border-zinc-950/50 hover:text-zinc-950 aria-[current=true]:border-zinc-950 aria-[current=true]:font-semibold aria-[current=true]:text-zinc-950 sm:pl-4 sm:text-sm/6 dark:text-zinc-300 dark:hover:border-white/25 dark:hover:text-white dark:aria-[current=true]:border-white dark:aria-[current=true]:text-white"
                    aria-current={activeId === item.anchor}
                    href={`#${item.anchor}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
