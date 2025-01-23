import type { TextMarquee } from '~/types/textMarquee';

export const TextMarqueeBlock = ({ marquees }: { marquees: TextMarquee[] }) => {
  return (
    <div className="overflow-clip bg-gray-100 py-8 dark:bg-black/40">
      {marquees && (
        <div className="fadeout-horizontal grid justify-items-start gap-2">
          {marquees.map((marquee, i) => {
            return (
              <div
                key={marquee._key}
                style={
                  {
                    '--speed': `${marquee.speed}s`,
                    '--direction': marquee.direction,
                  } as React.CSSProperties
                }
              >
                <div className="flex w-max animate-text-marquee gap-x-2 pl-2">
                  {marquee.items && (
                    <>
                      {marquee.items.map((item, i) => (
                        <div
                          key={i}
                          className="text-nowrap rounded-full bg-gray-200 px-6 py-2 font-medium text-foreground dark:bg-zinc-900"
                        >
                          {item}
                        </div>
                      ))}
                      {marquee.items.map((item, i) => (
                        <div
                          key={i}
                          aria-hidden="true"
                          className="text-nowrap rounded-full bg-gray-200 px-6 py-2 font-medium text-foreground dark:bg-zinc-900"
                        >
                          {item}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
