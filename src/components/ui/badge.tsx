import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        orange:
          "border-transparent bg-orange-500 text-white [a&]:hover:bg-orange-500/90 focus-visible:ring-orange-500/20 dark:focus-visible:ring-orange-500/40 dark:bg-orange-500/60",
        sky: "border-transparent bg-sky-500 text-white [a&]:hover:bg-sky-500/90 focus-visible:ring-sky-500/20 dark:focus-visible:ring-sky-500/40 dark:bg-sky-500/60",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        amber:
          "border-transparent bg-amber-500 text-white [a&]:hover:bg-amber-500/90 focus-visible:ring-amber-500/20 dark:focus-visible:ring-amber-500/40 dark:bg-amber-500/60",
        yellow:
          "border-transparent bg-yellow-500 text-white [a&]:hover:bg-yellow-500/90 focus-visible:ring-yellow-500/20 dark:focus-visible:ring-yellow-500/40 dark:bg-yellow-500/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        black:
          "border-transparent bg-black text-white [a&]:hover:bg-black/90 focus-visible:ring-black/20 dark:focus-visible:ring-black/40 dark:bg-black/60",
        white:
          "border border-gray-200 bg-white text-gray-800 [a&]:hover:bg-gray-100 focus-visible:ring-gray-200/20 dark:focus-visible:ring-gray-200/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
      },
      size: {
        default: "text-xs px-2 py-0.5",
        sm: "text-sm px-2.5 py-1",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
