import { motion } from 'motion/react';
import { forwardRef, type ComponentProps, type PropsWithChildren } from 'react';

const Component = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & PropsWithChildren
>(({ className, children }, ref) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0, staggerChildren: 0.3 },
        },
      }}
    >
      {children}
    </motion.div>
  );
});

export const FadeInStaggerChildren = motion.create(Component);

FadeInStaggerChildren.defaultProps = {
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0, staggerChildren: 0.1 },
    },
  },
};
