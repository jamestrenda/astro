import type { PropsWithChildren } from "react";

export const Overline = ({ children }: PropsWithChildren) => {
  return (
    <div className="uppercase text-primary text-sm mb-2 font-semibold fade-in">
      {children}
    </div>
  );
};
