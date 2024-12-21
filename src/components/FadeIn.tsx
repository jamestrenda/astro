import { motion, type Variants } from "motion/react";
import type { PropsWithChildren } from "react";

const defaultVariants = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.05 * delay },
  },
  exit: { opacity: 0 },
});

export const FadeIn = ({
  children,
  delay = 0,
  variants = defaultVariants(delay),
}: { delay?: number; variants?: Variants } & PropsWithChildren) => {
  return (
    <motion.div
      whileInView="animate"
      viewport={{ once: true }}
      initial="initial"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
