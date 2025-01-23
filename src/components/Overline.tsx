import type { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '~/utils/misc';

export type Props = ComponentProps<'div'> & PropsWithChildren;

export const Overline = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'mb-3 w-fit bg-gradient-to-r from-indigo-600 from-0% to-indigo-500 to-100% bg-clip-text text-sm font-semibold uppercase text-transparent',
        className,
      )}
    >
      {children}
    </div>
  );
};
