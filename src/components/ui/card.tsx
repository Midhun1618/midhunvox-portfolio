import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "flat" | "glass" | "featured";

type CardProps<T extends ElementType> = {
  as?: T;
  variant?: CardVariant;
  /** Adds hover/focus lift. Only for cards that are (or contain) a link. */
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const variantClass: Record<CardVariant, string | undefined> = {
  default: undefined,
  flat: "card-flat",
  glass: "card-glass",
  featured: "card-featured",
};

/** Design-system card surface (styles: src/styles/components.css). */
export function Card<T extends ElementType = "div">({
  as,
  variant = "default",
  interactive = false,
  className,
  ...props
}: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn(
        "card",
        variantClass[variant],
        interactive && "card-interactive",
        className,
      )}
      {...props}
    />
  );
}