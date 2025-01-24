import { motion } from 'motion/react';
import { memo } from 'react';
import { cn } from '~/utils/misc';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  withChrome?: boolean;
  withStack?: boolean;
  withStripes?: boolean;
  stackCount?: number;
  stackPosition?: 'top' | 'bottom';
}

const BrowserWindow = memo(
  ({
    className,
    withChrome = true,
    withStack = true,
    children,
    stackCount = 5,
    withStripes = false,
    stackPosition = 'bottom',
  }: Props) => {
    return (
      <div
        className={cn(
          'relative rounded-b-lg md:h-full',
          stackPosition === 'top' ? 'mt-15' : '',
        )}
      >
        <div
          className={cn(
            'relative z-20 grid h-full w-full items-center rounded-lg bg-black bg-[size:150%] bg-[position:90%] p-6 pt-14 max-md:rounded-b-none md:p-16',
            className,
          )}
        >
          {withChrome && (
            <div
              className={cn(
                'bg-glass absolute inset-x-0 top-0 z-40 grid h-14 items-center rounded-t-lg',
              )}
            >
              <div className="flex h-full items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-white/10"></div>
                  <div className="h-3 w-3 rounded-full bg-white/10"></div>
                  <div className="h-3 w-3 rounded-full bg-white/10"></div>
                </div>
              </div>
            </div>
          )}
          {withStripes && (
            <div className="border-x-(--pattern-fg) [--pattern-fg:var(--color-zinc-500)]/5 dark:[--pattern-fg:var(--color-black)]/10 col-start-0 row-start-0 pointer-events-none absolute inset-0 z-30 row-span-5 bg-black/5 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
          )}
          {children}
        </div>
        {withStack && (
          <motion.div className="absolute inset-0">
            {Array.from({ length: stackCount }).map((_, index) => (
              <Shadow
                key={index}
                index={index}
                total={stackCount}
                position={stackPosition}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  },
);

type ShadowProps = {
  index: number;
  total: number;
  position: 'top' | 'bottom';
};
const Shadow = memo(({ index, total, position }: ShadowProps) => {
  const increment = 12;
  const y = -(index + 1) * increment;

  const lightness = calculateLightnessScale(50, 97, 0.9, total, index);

  return (
    <motion.div
      className={cn(
        `absolute inset-x-0 mx-auto w-full rounded-lg backdrop-blur-lg`,
        position === 'top' ? 'bottom-auto top-0' : 'bottom-0 top-auto',
      )}
      initial={{
        bottom: position === 'top' ? undefined : 0,
        top: position === 'top' ? 0 : undefined,
      }}
      animate={{
        bottom: position === 'top' ? undefined : y,
        top: position === 'top' ? y : undefined,
      }}
      whileInView="animate"
      viewport={{ once: true }}
      transition={{
        duration: 1,
        delay: 0.05 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        zIndex: 10 - index,
        width: `calc(100% - ${32 * (index + 1)}px)`,
      }}
    >
      <div
        className={cn(`bg-zinc-950/(--tw-bg-opacity) h-24 rounded-lg`)}
        style={
          {
            '--tw-bg-opacity': `${100 - lightness}%`,
          } as React.CSSProperties
        }
      />
    </motion.div>
  );
});

function calculateLightnessScale(
  min: number,
  max: number,
  exponent: number,
  total: number,
  index: number,
) {
  const proportion = index / (total - 1); // Normalize index to a range of [0, 1]
  const lightness = min + (max - min) * Math.pow(proportion, exponent);

  return lightness;
}

export default BrowserWindow;
