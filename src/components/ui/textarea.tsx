import * as React from 'react';
import { cn } from '~/utils/misc';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'bg-glass ring-ring focus-visible:outline-hidden focus-visible:ring-ring placeholder:text-muted-foreground aria-[invalid]:border-input-invalid w-full rounded-lg border border-white/5 p-4 text-white ring-offset-background placeholder:text-background/50 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
