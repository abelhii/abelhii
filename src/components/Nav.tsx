"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/shadcn.utils";
import { Toggle3D } from "./Toggle3D";

type NavItemProps = { children: ReactNode; className?: string } & LinkProps;

export function NavItem({ ...props }: NavItemProps) {
  return (
    <Link
      {...props}
      className={cn(
        "px-4 py-2 rounded-sm hover:bg-red-300/50",
        props?.className
      )}
    />
  );
}

type NavProps = {
  children: ReactNode;
  className?: string;
};

export function Nav({ children, className }: NavProps) {
  return (
    <nav
      className={cn(
        " top-0 z-10 flex justify-center items-center p-4 min-h-8 gap-4 text-white bg-gray-800/70 border border-gray-700 rounded-md",
        className
      )}
    >
      {children}
      <Toggle3D className="-translate-y-2 active:translate-y-0 data-[state=off]:translate-y-0" />
    </nav>
  );
}
