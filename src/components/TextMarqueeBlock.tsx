import type { TextMarquee } from '~/types/textMarquee';
import { cn } from '~/utils/misc';
import { Container } from './Container';

export const TextMarqueeBlock = ({ marquees }: { marquees: TextMarquee[] }) => {
  return (
    <Container>
      <div className="-mx-4 overflow-clip bg-transparent py-8">
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
                    {marquee.items &&
                      Array(2)
                        .fill(undefined)
                        .map(() =>
                          marquee.items?.map((item, i) => (
                            <div
                              key={item._key}
                              className={cn(
                                'text-nowrap rounded-full bg-stone-300/50 px-6 py-2 font-medium text-foreground backdrop-blur-lg dark:bg-black/50',
                              )}
                            >
                              <span
                                className={cn(
                                  'text-sm',
                                  item.featured
                                    ? 'text-sm font-semibold text-primary'
                                    : '',
                                )}
                              >
                                {item.value}
                              </span>
                            </div>
                          )),
                        )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
};
