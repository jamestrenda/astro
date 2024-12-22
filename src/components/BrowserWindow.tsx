import { cn } from "~/utils/misc";
import { MotionValue, motion, useTransform } from "motion/react";
import { memo } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  withChrome?: boolean;
  withStack?: boolean;
  scrollY?: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
}

const BrowserWindow = memo(
  ({
    className,
    withChrome = true,
    withStack = true,
    children,
    scrollY = new MotionValue(),
    scrollYProgress = new MotionValue(),
  }: Props) => {
    return (
      <div className="browser-window md:h-full relative rounded-b-lg">
        <div
          className={cn(
            "relative z-20 pt-14 bg-black bg-[size:150%] bg-[position:90%] bg-[radial-gradient(circle,hsl(var(--primary-dark)),black_75%)] lg:bg-[radial-gradient(circle,hsl(var(--primary-dark))_10%,black_50%)] dark:bg-[radial-gradient(circle,hsl(var(--primary-dark)),hsl(0 0% 10%)_75%)] rounded-lg max-md:rounded-bl-none w-full h-full p-6 sm:p-16 grid items-center",
            className
          )}
        >
          {withChrome && (
            <div
              className={cn(
                "bg-glass absolute top-0 inset-x-0 z-30 h-14 rounded-t-lg grid items-center"
                // className
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
            {Array.from({ length: 5 }).map((_, index) => (
              <Shadow key={index} index={index} scrollY={scrollY} count={5} />
            ))}
          </motion.div>
        )}
      </div>
    );
  }
);

type ShadowProps = {
  index: number;
  delay?: number;
  scrollY?: MotionValue<number>;
  count?: number;
};
const Shadow = memo(
  ({ index, scrollY = new MotionValue(), count = 1 }: ShadowProps) => {
    const increment = 12;
    const bottom = -(index + 1) * increment;

    // const bottomOpposite = useMemo(
    //   () => findOpposite(Math.abs(bottom), count, increment),
    //   [bottom, count]
    // );

    // const bottomProgress = useTransform(
    //   scrollY,
    //   [bottomOpposite - increment, bottomOpposite],
    //   [bottom, 0]
    // );

    return (
      <motion.div
        className={`absolute top-auto bottom-0 w-full mx-auto inset-x-0`}
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
          // bottom: bottomProgress,
        }}
      >
        <div
          className={cn("bg-black h-24 rounded-lg")}
          style={
            {
              "--lightness": Math.abs(bottom * 1.5) + "%",
              backgroundColor: `hsl(0 0% var(--lightness))`,
            } as React.CSSProperties
          }
        />
      </motion.div>
    );
  }
);

function findOpposite(num: number, count: number, increment: number) {
  const max = increment * count; // The maximum value in the sequence
  return max + increment - num;
}

export default BrowserWindow;
