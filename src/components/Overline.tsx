import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "~/utils/misc";

export const Overline = ({
  children,
  className,
}: ComponentProps<"div"> & PropsWithChildren) => {
  return (
    <div
      className={cn(
        "uppercase text-primary text-sm mb-2 font-semibold ",
        className
      )}
    >
      {children}
    </div>
  );
};
