import type { TextMarquee } from "~/types/textMarquee";
import { Container } from "./Container";

export const TextMarqueeBlock = ({ marquees }: { marquees: TextMarquee[] }) => {
  return (
    <div className="py-16 overflow-clip bg-zinc-100 dark:bg-black/25">
      {marquees && (
        <div className="grid gap-2 justify-items-start fadeout-horizontal">
          {marquees.map((marquee, i) => {
            return (
              <div
                key={marquee._key}
                style={
                  {
                    "--speed": `${marquee.speed}s`,
                    "--direction": marquee.direction,
                  } as React.CSSProperties
                }
              >
                <div className="flex pl-2 gap-x-2 w-max animate-text-marquee">
                  {marquee.items && (
                    <>
                      {marquee.items.map((item, i) => (
                        <div
                          key={i}
                          className="px-6 py-2 text-foreground bg-zinc-200 dark:bg-zinc-900 rounded-full text-nowrap font-medium"
                        >
                          {item}
                        </div>
                      ))}
                      {marquee.items.map((item, i) => (
                        <div
                          key={i}
                          aria-hidden="true"
                          className="px-6 py-2 text-foreground bg-zinc-200 dark:bg-zinc-900 rounded-full text-nowrap font-medium"
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
