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
    <div className="max-md:[&>div]:!px-0 relative pb-20">
      <Container>
        <BrowserWindow className="max-md:rounded-t-none min-h-[550px] md:min-h-[660px]">
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient("#c7d2fe", "rgba(0,0,0,.8)", "hsla(0 0% 0% / .9)", "40% 30%", ["0%", "50%", "90%"])}, ${getRadialGradient("hsla(0 0% 0% / 0)", "#c7d2fe", "#4338ca", "0% 100%", ["0%", "30%", "90%"])}`,
            }}
          />
          <div className="w-full max-xs:mt-auto z-40 max-xs:mb-4 min-[480px]:w-4/5 xs:w-1/2 mt-16 space-y-3 [&_p]:!text-muted [&_p]:dark:text-foreground [&_p]:text-lg [&_p]:md:text-xl [&_p]:font-light">
            {valueProposition && (
              <PortableText portableText={valueProposition} />
            )}
          </div>

          {marquees && (
            <div className="grid gap-2 my-6 md:mt-12 sm:mb-0 self-start [--item-width:100px] md:[--item-width:160px]">
              {marquees.map((marquee, i) => {
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
                                  height={96}
                                  loading="eager"
                                  className=" w-auto object-contain h-10"
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
          )}
          {image && (
            <SanityImage
              src={image.image}
              // width={1280}
              // height={817}
              queryParams={{
                q: 100,
              }}
              preview={true}
              className="absolute z-30 bottom-0 right-0 max-xs:left-0 md:rounded-br-lg object-cover max-h-[400px] max-xs:max-w-full xs:h-[580px] xs:w-2/3 xs:max-h-[700px] md:h-[700px] lg:w-[700px] max-xs:w-full max-xs:h-auto max-xs:-top-8 max-xs:max-h-[580px] aspect-square pointer-events-none dark:brightness-75 contrast-[1.1] max-xs:gradient-mask-b-[black_50%]"
            />
          )}
        </BrowserWindow>
      </Container>
    </div>
  );
};
