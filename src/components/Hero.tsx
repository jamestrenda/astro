import type { Hero as Props } from '~/types/hero';
import { getRadialGradient } from '~/utils/getRadialGradient';
import { BackgroundRadialGradient } from './BackgroundRadialGradient';
import BrowserWindow from './BrowserWindow';
import { Container } from './Container';
import { Image } from './Image';
import { PortableText } from './PortableText/PortableText';

export const Hero = ({ valueProposition, logos: marquees, image }: Props) => {
  return (
    <div className="max-md:[&>div]:px-0! pb-15 relative">
      <Container>
        <BrowserWindow
          withStripes
          className="relative grid min-h-[550px] grid-cols-12 max-md:rounded-t-none md:min-h-[660px]"
        >
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient('var(--color-zinc-500)', 'rgba(0,0,0,.8)', 'hsla(0 0% 0% / .9)', '40% 30%', ['0%', '50%', '90%'])}, ${getRadialGradient('hsla(0 0% 0% / 0)', 'var(--color-zinc-200)', 'var(--color-zinc-400)', '0% 100%', ['0%', '30%', '90%'])}`,
            }}
          />
          <div className="[&_p]:text-zinc-500! z-60 col-span-11 mt-auto w-full space-y-3 text-lg leading-6 max-xs:mb-4 xs:col-start-1 xs:col-end-8 xs:mt-16 [&_p]:font-light dark:[&_p]:text-foreground sm:[&_p]:text-xl [&_p]:lg:max-w-[85%] lg:[&_p]:text-2xl">
            {valueProposition && (
              <PortableText portableText={valueProposition} />
            )}
          </div>

          {/* {marquees && (
            <div className="my-6 grid gap-2 self-start [--item-width:100px] sm:mb-0 md:mt-12 md:[--item-width:160px]">
              {marquees.map((marquee, i) => {
                const numItems = useMemo(
                  () => marquee.items?.length ?? 0,
                  [marquee.items?.length],
                );
                return (
                  <div
                    key={marquee._key}
                    className="marquee fadeout-horizontal -mx-8 sm:-mx-16"
                    style={
                      {
                        '--speed': `${marquee.speed}s`,
                        '--direction': marquee.direction,
                        '--num-items': numItems,
                      } as React.CSSProperties
                    }
                  >
                    <div className="track">
                      {marquee.items &&
                        marquee.items.map((item, i) => (
                          <div
                            key={item._key}
                            className="track-item"
                            style={
                              {
                                '--item-position': i + 1,
                              } as React.CSSProperties
                            }
                          >
                            <div className="track-item-content bg-glass grid animate-fade-in-out place-items-center rounded-lg px-4 text-white">
                              {item?.image && (
                                <SanityImage
                                  src={item.image}
                                  // width={1280}
                                  height={96}
                                  loading="eager"
                                  className="h-10 w-auto object-contain"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )} */}
          {image?.image && (
            <div className="contents [&_img[data-lqip=true]]:gradient-mask-t-50">
              <Image
                id={image.image.id}
                asset={image.image}
                // width={1280}
                // height={817}
                loading="eager"
                queryParams={{
                  q: 100,
                }}
                className="grayscale-100 pointer-events-none absolute bottom-0 right-0 z-50 aspect-square max-h-[400px] rounded-br-lg object-cover brightness-90 contrast-[1.2] dark:brightness-0 max-xs:-top-8 max-xs:left-0 max-xs:h-auto max-xs:max-h-[580px] max-xs:w-full max-xs:max-w-full max-xs:gradient-mask-b-[black_50%] xs:h-[580px] xs:max-h-[700px] xs:w-2/3 md:h-[700px] lg:w-[700px]"
              />
            </div>
          )}
        </BrowserWindow>
      </Container>
    </div>
  );
};
