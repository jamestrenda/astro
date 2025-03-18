import type { ReactNode } from 'react';
import { cn } from '~/utils/misc';

type Props = {
  className?: string;
  children: ReactNode;
};

export const Badge: React.FC<Props> = ({ className, children }) => {
  return (
    <span
      className={cn(
        'inline-block rounded-lg bg-zinc-100 px-3 py-0.5 text-sm/6 text-muted transition-colors duration-200 hover:bg-primary! hover:text-background dark:bg-zinc-950 dark:text-zinc-300 dark:hover:text-white',
        className,
      )}
    >
      {children}
    </span>
  );
};
