import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "~/utils/misc";

export type Props = ComponentProps<"div"> & PropsWithChildren;

export const Overline = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "uppercase text-primary text-sm mb-3 font-semibold ",
        className
      )}
    >
      {children}
    </div>
  );
};
