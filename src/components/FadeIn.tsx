import { motion } from "motion/react";
import type { PropsWithChildren } from "react";

export const FadeIn = ({
  children,
  delay = 0,
}: { delay?: number } & PropsWithChildren) => {
  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.05 * delay },
    },
    exit: { opacity: 0 },
  };

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
