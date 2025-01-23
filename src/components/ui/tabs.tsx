import * as TabsPrimitive from '@radix-ui/react-tabs';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import * as React from 'react';
import { cn } from '~/utils/misc';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  let id = React.useId();
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <LayoutGroup id={id}>{children}</LayoutGroup>
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    active?: boolean;
  }
>(({ active, className, ...props }, ref) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.span
      className="relative"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            layoutId="hover-indicator"
            className="absolute inset-x-1.5 inset-y-0 z-0 rounded-full bg-white/5 backdrop-blur-lg"
            // style={{
            //   x: hovered ? 0 : hoveredX.get(),
            //   // x: active ? 0 : hovered ? 0 : activeX.get(),
            //   // opacity: hovered ? 1 : 0,
            // }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="current-indicator"
            className="absolute inset-x-1.5 inset-y-0 z-10 rounded-full bg-white/90 backdrop-blur-lg"
            transition={{
              layout: { duration: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <TabsPrimitive.Trigger
        ref={ref}
        disabled={active}
        className={cn(
          'focus-visible:outline-hidden focus-visible:ring-ring relative z-10 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium text-foreground ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground',
          active ? 'disabled:opacity-100! cursor-default' : 'cursor-pointer',
          className,
        )}
        {...props}
      />
    </motion.span>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'focus-visible:outline-hidden focus-visible:ring-ring ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
