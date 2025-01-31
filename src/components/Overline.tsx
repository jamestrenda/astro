import type { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '~/utils/misc';

export type Props = ComponentProps<'div'> & PropsWithChildren;

export const Overline = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'mb-3 w-fit text-sm font-semibold uppercase text-primary',
        className,
      )}
    >
      {children}
    </div>
  );
};
