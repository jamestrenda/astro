import type { TextMarquee } from '~/types/textMarquee';
import { cn } from '~/utils/misc';
import { Container } from './Container';

export const TextMarqueeBlock = ({ marquees }: { marquees: TextMarquee[] }) => {
  return (
    <Container>
      <div className="overflow-clip bg-transparent py-8">
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
                            key={item._key}
                            className={cn(
                              'text-nowrap rounded-full bg-gray-200/50 px-6 py-2 font-medium text-foreground backdrop-blur-md dark:bg-black/50',
                              item.featured
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : '',
                            )}
                          >
                            {item.value}
                          </div>
                        ))}
                        {marquee.items.map((item, i) => (
                          <div
                            key={item._key}
                            aria-hidden="true"
                            className={cn(
                              'text-nowrap rounded-full bg-gray-200/50 px-6 py-2 font-medium text-foreground backdrop-blur-md dark:bg-black/50',
                              item.featured
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : '',
                            )}
                          >
                            {item.value}
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
    </Container>
  );
};
