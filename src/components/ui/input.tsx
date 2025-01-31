import * as React from 'react';
import { cn } from '~/utils/misc';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'focus-visible:outline-hidden focus-visible:ring-ring aria-[invalid]:border-input-invalid w-full rounded-lg border border-zinc-900/50 bg-zinc-900/70 p-4 text-background ring-offset-background backdrop-blur-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-foreground max-sm:text-base',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
