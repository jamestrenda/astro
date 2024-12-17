"use client";

import * as Headless from "@headlessui/react";
import clsx from "clsx";
import {
  AnimatePresence,
  LayoutGroup,
  MotionValue,
  motion,
  useMotionValue,
} from "framer-motion";
import React, { forwardRef, useId } from "react";
import { TouchTarget } from "./button";
import { Link } from "./link";

export function Navbar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={clsx(className, "flex flex-1 items-center gap-4 py-2.5")}
    />
  );
}

export function NavbarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")}
    />
  );
}

export function NavbarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  let id = useId();

  return (
    <LayoutGroup id={id}>
      <div {...props} className={clsx(className, "flex items-center")} />
    </LayoutGroup>
  );
}

export function NavbarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, "-ml-4 flex-1")}
    />
  );
}

export const NavbarItem = forwardRef(function NavbarItem(
  {
    active,
    activeX,
    className,
    children,
    ...props
  }: {
    active?: boolean;
    activeX?: MotionValue;
    className?: string;
    children: React.ReactNode;
  } & (
    | Omit<Headless.ButtonProps, "as" | "className">
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "className">
  ),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  let [hovered, setHovered] = React.useState(false);

  // const hoveredRef = React.useRef<HTMLSpanElement>(null);
  // const hoveredX = useMotionValue(0);

  // React.useEffect(() => {
  //   if (!hoveredRef.current) return;

  //   hoveredX.set(hoveredRef.current.getBoundingClientRect().x);
  //   // x.set(currentRef.current?.getBoundingClientRect().x || 0);
  // }, [active, hovered]);

  let classes = clsx(
    // Base
    "relative z-10 flex min-w-0 items-center gap-3 rounded-full cursor-pointer py-2 px-4 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5",
    // Leading icon/icon-only
    "data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5",
    // Trailing icon (down chevron or similar)
    "data-[slot=icon]:last:[&:not(:nth-child(2))]:*:ml-auto data-[slot=icon]:last:[&:not(:nth-child(2))]:*:size-5 sm:data-[slot=icon]:last:[&:not(:nth-child(2))]:*:size-4",
    // Avatar
    "data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--avatar-radius:theme(borderRadius.DEFAULT)] data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6",
    // Hover
    // "data-[hover]:bg-zinc-950/5 data-[slot=icon]:*:data-[hover]:fill-zinc-950",
    // Active
    "data-[active]:bg-zinc-950/5 data-[slot=icon]:*:data-[active]:fill-zinc-950",
    // Current
    "data-[current]:text-background",
    // Dark mode
    "dark:text-foreground dark:data-[slot=icon]:*:fill-zinc-400",
    // "dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[hover]:fill-white",
    "dark:data-[active]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white",
    "dark:data-[current]:text-background"
  );

  return (
    <span className={clsx(className, "relative")}>
      <AnimatePresence>
        {hovered && (
          <motion.span
            layoutId="hover-indicator"
            className="absolute inset-0 rounded-full bg-zinc-950/5 dark:bg-white/5 z-0"
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
            className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white z-0"
          />
        )}
      </AnimatePresence>
      {"href" in props ? (
        <Link
          {...props}
          className={classes}
          data-current={active ? "true" : undefined}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          <TouchTarget>{children}</TouchTarget>
        </Link>
      ) : (
        <Headless.Button
          {...props}
          className={clsx("cursor-default", classes)}
          data-current={active ? "true" : undefined}
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.Button>
      )}
    </span>
  );
});

export function NavbarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={clsx(className, "truncate")} />;
}
