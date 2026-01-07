/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/shadcn.utils";
import { cva, type VariantProps } from "class-variance-authority";
import "./card.css";

const cardVariants = cva(
  "card group relative text-card-foreground flex flex-col gap-6 rounded-xl border py-6",
  {
    variants: {
      variant: {
        default: "bg-card shadow-sm",
        space:
          "text-white backdrop-blur-xs bg-gray-800/70 border-transparent",
      },
      effect: {
        glow: ''
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

function Card({
  className,
  variant = "default",
  effect,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  const card = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (effect !== "glow") return;
    if (!window || !card.current) return;
    const target = card.current;

    const mouseMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
    };

    target.addEventListener("mousemove", mouseMove);

    return () => {
      target.removeEventListener("mousemove", mouseMove);
    };
  }, [effect]);

  return (
    <div
      data-slot="card"
      data-variant={variant}
      ref={card}
      className={cn(cardVariants({ variant, effect, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-muted-foreground text-sm group-data-[variant=space]:text-white",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
};

