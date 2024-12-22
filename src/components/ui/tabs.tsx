import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "~/utils/misc";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  let id = React.useId();
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("flex items-center justify-center", className)}
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
            className="absolute inset-x-1.5 inset-y-0 rounded-full bg-zinc-950/5 dark:bg-white/5 z-0"
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
            className="absolute inset-y-0 inset-x-1.5 rounded-full bg-zinc-950 dark:bg-white z-0"
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
          "inline-flex items-center justify-center whitespace-nowrap rounded-full cursor-pointer py-2 px-6  text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-foreground data-[state=active]:text-background relative z-10",
          active ? "cursor-default disabled:!opacity-100" : "cursor-pointer",
          className
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
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
