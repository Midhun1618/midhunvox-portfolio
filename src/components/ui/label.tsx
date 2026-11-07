import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type LabelProps<T extends ElementType> = {
  as?: T;
  /** "timecode" = cyan tabular numerals (e.g. 00:00:12:08); "label" = muted caps. */
  tone?: "label" | "timecode";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Monospaced label / timecode text. */
export function Label<T extends ElementType = "span">({
  as,
  tone = "label",
  className,
  ...props
}: LabelProps<T>) {
  const Component: ElementType = as ?? "span";
  return (
    <Component
      className={cn(tone === "timecode" ? "timecode" : "label", className)}
      {...props}
    />
  );
}