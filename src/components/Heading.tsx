import type { Props as $, Block } from 'astro-portabletext/types';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '~/utils/misc';

type HeadingLevel = `h${1 | 2 | 3 | 4 | 5}`;
export interface Props extends Partial<$<Block>> {
  level?: HeadingLevel;
  className?: string;
}

const variants = cva(
  'heading font-sans font-bold text-foreground [text-wrap:balance]',
  {
    variants: {
      variant: {
        h1: 'text-balance text-5xl text-background dark:text-foreground max-sm:text-4xl lg:text-6xl',
        h2: 'mb-6 text-3xl text-foreground md:text-4xl',
        h3: 'text-xl text-foreground md:text-2xl',
        h4: 'text-xl',
        h5: 'text-base',
        p: 'text-2xl font-medium text-accent',
      },
    },
    defaultVariants: {
      variant: 'h2',
    },
  },
);

export const Heading = forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement> & Props
>(function Heading(
  { level, node, className, children, ...props },
  forwardedRef,
) {
  const el = level ?? (node?.style as HeadingLevel);

  let Component: HeadingLevel = el ?? 'h2';

  const classes = cn(variants({ variant: el as Props['level'] }), className);

  return (
    <Component ref={forwardedRef} className={classes} {...props}>
      {children}
    </Component>
  );
});
