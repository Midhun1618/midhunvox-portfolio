import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

interface PagePlaceholderProps {
  title: string;
  description?: string;
  /** Name of the future module that will implement this page. */
  owner: string;
  children?: ReactNode;
}

/**
 * Temporary page body used by routes whose real design belongs to a later
 * module. Delete usages as each module lands.
 */
export function PagePlaceholder({
  title,
  description,
  owner,
  children,
}: PagePlaceholderProps) {
  return (
    <Container as="section" className="py-16">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {description && <p className="mt-3 text-muted">{description}</p>}
      <p className="mt-6 text-sm text-muted">
        TODO: visual implementation pending ({owner}).
      </p>
      {children}
    </Container>
  );
}
