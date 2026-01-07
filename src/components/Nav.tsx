"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/shadcn.utils";
import { Toggle3D } from "./Toggle3D";
import { Card, CardContent } from "./ui/card";

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
    <nav className={className}>
      <Card variant="space" effect="glow">
        <CardContent className="space-x-4 relative">
          <Toggle3D className="mr-8 -translate-y-2 active:translate-y-0 data-[state=off]:translate-y-0" />
          {children}
        </CardContent>
      </Card>
    </nav>
  );
}
