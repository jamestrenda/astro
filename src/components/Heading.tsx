import { cva } from "class-variance-authority";
import { cn } from "~/utils/misc";
import type { Block, Props as $ } from "astro-portabletext/types";
import { forwardRef } from "react";

interface Props extends Partial<$<Block>> {
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

const variants = cva(
  "font-sans text-foreground font-bold [text-wrap:balance]",
  {
    variants: {
      variant: {
        1: "text-4xl md:text-5xl lg:text-6xl text-background dark:text-foreground",
        2: "text-3xl md:text-4xl dark:text-foreground",
        3: "text-xl md:text-3xl text-primary",
        4: "text-xl",
        5: "text-base",
        p: "font-medium text-2xl text-accent",
      },
    },
    defaultVariants: {
      variant: 2,
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
  const el = level ?? node?.style ?? "h2";

  let Component: "h1" | "h2" | "h3" | "h4" | "h5" = "h2";

  const classes = cn(
    variants({ variant: level ?? (el as Props["level"]) }),
    className
  );

  switch (el) {
    case 1:
      Component = "h1";
      break;
    case 2:
      Component = "h2";
      break;
    case 3:
      Component = "h3";
      break;
    case 4:
      Component = "h4";
      break;
    case 5:
      Component = "h5";
      break;
    default:
      break;
  }
  return (
    <Component ref={forwardedRef} className={classes} {...props}>
      {children}
    </Component>
  );
});
