import type { Maybe } from '~/types/index';

type DominantColorSeoImageRenderProps = {
  image?: Maybe<string>;
  title?: Maybe<string>;
  logo?: Maybe<string>;
  dominantColor?: Maybe<string>;
  date?: Maybe<string>;
  _type?: Maybe<string>;
  description?: Maybe<string>;
};

export const dominantColorSeoImageRender = ({
  image,
  title,
  logo,
  dominantColor,
  date,
  description,
  _type,
}: DominantColorSeoImageRenderProps) => {
  return (
    <div tw="flex flex-col bg-stone-200 p-10">
      <div tw="relative z-20 flex h-full w-full items-center bg-black rounded-lg bg-[size:150%] bg-[position:90%] px-4 py-6 pt-14 md:p-16">
        <div tw="absolute inset-x-0 top-0 z-40 flex h-14 items-center rounded-t-lg bg-white/5 backdrop-blur-md">
          <div tw="flex h-full items-center justify-between px-4">
            <div tw="flex items-center">
              <div tw="h-3 w-3 rounded-full bg-white/10"></div>
              <div tw="h-3 w-3 rounded-full bg-white/10 mx-2"></div>
              <div tw="h-3 w-3 rounded-full bg-white/10"></div>
            </div>
          </div>
        </div>
        <div tw="pointer-events-none absolute inset-0 z-30 col-start-0 row-span-5 row-start-0 border-x-(--pattern-fg) bg-black/5 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-zinc-500)]/5 dark:[--pattern-fg:var(--color-black)]/10"></div>
        <div
          tw={`flex flex-row overflow-hidden relative w-full`}
          style={{ fontFamily: 'Inter' }}
        >
          <div tw="flex-1 p-10 flex flex-col justify-between relative z-10">
            <div tw="flex justify-center items-center text-center w-full">
              {/* {logo && <img src={logo} alt="Logo" tw="invert-100" height={48} />} */}
              <div tw="flex bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                {new Date(date ?? new Date()).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            <h1 tw="text-5xl text-center font-bold leading-tight max-w-[90%] mx-auto text-white">
              {title}
            </h1>
            {description && (
              <p tw="text-lg text-center text-white max-w-3xl mx-auto">
                {description}
              </p>
            )}
            {/* {_type && (
          <div
            
            tw={`bg-white text-[${
              dominantColor ?? '#12061F'
            }] flex px-5 py-2 rounded-full text-base font-semibold self-start`}
          >
            {titleCase(_type)}
          </div>
        )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
