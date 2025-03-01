import { useTableOfContents } from '~/hooks/useTableOfContents';
import type { Post } from '~/types/post';

export const TableOfContents = ({ toc }: { toc: Required<Post>['toc'] }) => {
  if (!toc) return null;
  const activeId = useTableOfContents(toc);

  return (
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
  );
};
