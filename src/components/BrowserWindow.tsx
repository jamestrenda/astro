import { cn } from "~/utils/misc";
import { motion } from "motion/react";
import { memo } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  withChrome?: boolean;
  withStack?: boolean;
  stackCount?: number;
  stackPosition?: "top" | "bottom";
}

const BrowserWindow = memo(
  ({
    className,
    withChrome = true,
    withStack = true,
    children,
    stackCount = 5,
    stackPosition = "bottom",
  }: Props) => {
    return (
      <div
        className={cn(
          "browser-window md:h-full relative rounded-b-lg",
          stackPosition === "top" ? "mt-20" : ""
        )}
      >
        <div
          className={cn(
            "relative z-20 pt-14 bg-black bg-[size:150%] bg-[position:90%] rounded-lg max-md:rounded-bl-none w-full h-full p-6 sm:p-16 grid items-center",
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
  }
);

type ShadowProps = {
  index: number;
  total: number;
  position: "top" | "bottom";
};
const Shadow = memo(({ index, total, position }: ShadowProps) => {
  const increment = 16;
  const y = -(index + 1) * increment;

  const lightness = calculateLightnessScale(10, 95, 0.9, total, index);

  return (
    <motion.div
      className={cn(
        `absolute w-full mx-auto inset-x-0 backdrop-blur-lg rounded-lg`,
        position === "top" ? "bottom-auto top-0" : "top-auto bottom-0"
      )}
      initial={{
        bottom: position === "top" ? undefined : 0,
        top: position === "top" ? 0 : undefined,
      }}
      animate={{
        bottom: position === "top" ? undefined : y,
        top: position === "top" ? y : undefined,
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
