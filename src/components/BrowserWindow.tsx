import { cn } from "~/utils/misc";
import { motion } from "motion/react";
import { memo } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  withChrome?: boolean;
  withStack?: boolean;
  stackCount?: number;
}

const BrowserWindow = memo(
  ({
    className,
    withChrome = true,
    withStack = true,
    children,
    stackCount = 5,
  }: Props) => {
    return (
      <div className="browser-window md:h-full relative rounded-b-lg">
        <div
          className={cn(
            "relative z-20 pt-14 bg-black bg-[size:150%] bg-[position:90%] bg-[radial-gradient(circle,hsl(0_0%_10%),black_75%)] lg:bg-[radial-gradient(circle,hsl(0_0%_10%)_10%,black_50%)] dark:bg-[radial-gradient(circle,hsl(0_0%_10%),hsl(0 0% 10%)_75%)] rounded-lg max-md:rounded-bl-none w-full h-full p-6 sm:p-16 grid items-center",
            className
          )}
        >
          {withChrome && (
            <div
              className={cn(
                "bg-glass absolute top-0 inset-x-0 z-30 h-14 rounded-t-lg grid items-center"
              )}
            >
              <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-glass dark:bg-white/10 rounded-full"></div>
                  <div className="h-3 w-3 bg-glass dark:bg-white/10 rounded-full"></div>
                  <div className="h-3 w-3 bg-glass dark:bg-white/10 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
          {children}
        </div>
        {withStack && (
          <motion.div className="absolute inset-0">
            {Array.from({ length: stackCount }).map((_, index) => (
              <Shadow key={index} index={index} total={stackCount} />
            ))}
          </motion.div>
        )}
      </div>
    );
  }
);

type ShadowProps = {
  index: number;
  total: number;
};
const Shadow = memo(({ index, total }: ShadowProps) => {
  const increment = 16;
  const bottom = -(index + 1) * increment;

  const lightness = calculateLightnessScale(10, 95, 0.9, total, index);

  return (
    <motion.div
      className={`absolute top-auto bottom-0 w-full mx-auto inset-x-0 backdrop-blur-lg rounded-b-lg`}
      initial={{ bottom: 0 }}
      animate={{ bottom }}
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
        className={cn("bg-black h-24 rounded-lg")}
        style={
          {
            "--lightness": lightness + "%",
            backgroundColor: `hsla(0 0% var(--lightness) / .9)`,
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
  index: number
) {
  const proportion = index / (total - 1); // Normalize index to a range of [0, 1]
  const lightness = min + (max - min) * Math.pow(proportion, exponent);

  return lightness;
}

export default BrowserWindow;
