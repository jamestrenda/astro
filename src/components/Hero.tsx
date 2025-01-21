import React, { useMemo } from "react";
import { Container } from "./Container";
import BrowserWindow from "./BrowserWindow";
import type { Hero as Props } from "~/types/hero";
import { SanityImage } from "./Image";
import { PortableText } from "./PortableText/PortableText";
import { getRadialGradient } from "~/utils/getRadialGradient";
import { BackgroundRadialGradient } from "./BackgroundRadialGradient";

export const Hero = ({ valueProposition, logos: marquees, image }: Props) => {
  return (
    <div className="max-md:[&>div]:!px-0 pb-16 dark:lg:pb-0 relative max-sm:overflow-hidden">
      <Container>
        <BrowserWindow className="max-md:rounded-t-none min-h-[660px]">
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient("#c7d2fe", "rgba(0,0,0,.8)", "hsla(0 0% 0% / .9)", "40% 30%", ["0%", "50%", "90%"])}, ${getRadialGradient("hsla(0 0% 0% / 0)", "#c7d2fe", "#4338ca", "0% 100%", ["0%", "30%", "90%"])}`,
            }}
          />
          <div className="w-full min-[480px]:w-4/5 xs:w-1/2 mt-16 space-y-3 [&_p]:!text-muted [&_p]:dark:text-foreground [&_p]:text-lg [&_p]:md:text-xl [&_p]:font-light">
            {valueProposition && (
              <PortableText portableText={valueProposition} />
            )}
          </div>

          <div className="grid gap-2 my-6 md:mt-12 sm:mb-0 self-start [--item-width:100px] md:[--item-width:160px]">
            {marquees &&
              marquees.map((marquee, i) => {
                const numItems = useMemo(
                  () => marquee.items?.length ?? 0,
                  [marquee.items?.length]
                );
                return (
                  <div
                    key={marquee._key}
                    className="marquee fadeout-horizontal -mx-8 sm:-mx-16"
                    style={
                      {
                        "--speed": `${marquee.speed}s`,
                        "--direction": marquee.direction,
                        "--num-items": numItems,
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
                                "--item-position": i + 1,
                              } as React.CSSProperties
                            }
                          >
                            <div className="track-item-content px-4 animate-fade-in-out text-white bg-glass rounded-lg grid place-items-center">
                              {item?.image && (
                                <SanityImage
                                  src={item.image}
                                  // width={1280}
                                  // height={817}
                                  loading="eager"
                                  className="h-full w-auto object-contain"
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
          {image && (
            <SanityImage
              src={image.image}
              // width={1280}
              // height={817}
              loading="eager"
              fetchPriority="high"
              queryParams={{
                q: 100,
              }}
              preview={false}
              className="absolute z-30 -bottom-24 md:bottom-0 -right-4 md:right-0 md:rounded-br-lg object-cover max-h-[400px] max-[579px]:max-w-72 xs:h-[600px] xs:max-h-[700px] md:h-[700px] lg:w-[700px] min-[480px]:w-2/3 aspect-square pointer-events-none dark:brightness-75 contrast-[1.1]"
            />
          )}
        </BrowserWindow>
      </Container>
    </div>
  );
};
