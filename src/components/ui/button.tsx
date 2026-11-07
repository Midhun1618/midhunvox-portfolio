import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction. Announce state separately if needed. */
  loading?: boolean;
  children: ReactNode;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonOwnProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  accent: "btn-accent",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};
const sizeClass: Record<ButtonSize, string | undefined> = {
  sm: "btn-sm",
  md: undefined,
  lg: "btn-lg",
};

/**
 * Design-system button (styles: src/styles/components.css).
 * Renders a next/link when `href` is given, otherwise a <button>.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    className,
    children,
    ...rest
  } = props;
  const classes = cn("btn", variantClass[variant], sizeClass[size], className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link
        {...(rest as Omit<ComponentPropsWithoutRef<typeof Link>, "className">)}
        className={classes}
        data-loading={loading || undefined}
        aria-disabled={loading || undefined}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, ...buttonRest } =
    rest as Omit<ComponentPropsWithoutRef<"button">, "className">;
  return (
    <button
      {...buttonRest}
      type={type}
      className={classes}
      disabled={disabled}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
    >
      {children}
    </button>
  );
}