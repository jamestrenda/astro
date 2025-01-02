import { cva } from "class-variance-authority";
import { cn } from "~/utils/misc";
import type { Block, Props as $ } from "astro-portabletext/types";
import { forwardRef } from "react";

type HeadingLevel = `h${1 | 2 | 3 | 4 | 5}`;
export interface Props extends Partial<$<Block>> {
  level?: HeadingLevel;
  className?: string;
}

const variants = cva(
  "font-sans text-foreground font-bold [text-wrap:balance]",
  {
    variants: {
      variant: {
        h1: "text-4xl md:text-5xl lg:text-6xl text-background dark:text-foreground",
        h2: "text-3xl md:text-4xl dark:text-foreground mb-6",
        h3: "text-xl md:text-2xl text-primary",
        h4: "text-xl",
        h5: "text-base",
        p: "font-medium text-2xl text-accent",
      },
    },
    defaultVariants: {
      variant: "h2",
    },
  }
);

export const Heading = forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement> & Props
>(function Heading(
  { level, node, className, children, ...props },
  forwardedRef
) {
  const el = level ?? (node?.style as HeadingLevel);

  let Component: HeadingLevel = el ?? "h2";

  const classes = cn(variants({ variant: el as Props["level"] }), className);

  return (
    <Component ref={forwardedRef} className={classes} {...props}>
      {children}
    </Component>
  );
});
