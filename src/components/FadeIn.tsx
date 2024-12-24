import { motion } from "motion/react";
import { forwardRef, type ComponentProps, type PropsWithChildren } from "react";

const Component = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & PropsWithChildren
>(({ className, children }, ref) => {
  return (
    <div
      className={className}
      ref={ref}
      // whileInView="visible"
      // viewport={{ once: true }}
      // initial="initial"
      // variants={variants}
    >
      {children}
    </div>
  );
});

export const FadeIn = motion.create(Component);

FadeIn.defaultProps = {
  variants: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
};
