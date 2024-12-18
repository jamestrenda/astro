import { MotionValue, motion } from "motion/react";
import type { PropsWithChildren } from "react";

export const FadeInScrollLinked = ({
  children,
  opacity = new MotionValue(),
}: { opacity: MotionValue } & PropsWithChildren) => {
  return <motion.div style={{ opacity }}>{children}</motion.div>;
};
