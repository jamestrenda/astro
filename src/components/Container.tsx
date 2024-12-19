import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/misc";

interface Props extends VariantProps<typeof variants> {
  className?: string;
  padding?: boolean;
  children: React.ReactNode;
}

const variants = cva("h-full mx-auto", {
  variants: {
    variant: {
      default: ["max-w-7xl"],
      tight: ["max-w-xl md:max-w-2xl lg:max-w-4xl"],
    },
    padding: {
      false: null,
      true: ["py-16 xs:py-32"],
    },
  },
  defaultVariants: {
    variant: "default",
    padding: false,
  },
});

export const Container = ({ variant, padding, className, children }: Props) => {
  return (
    <div className={cn("group/container px-4 h-full")}>
      <div className={cn([variants({ variant, padding }), className])}>
        {children}
      </div>
    </div>
  );
};
