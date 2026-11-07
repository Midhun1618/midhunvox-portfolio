"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

/**
 * Every client-side provider lives here and is mounted once in the root
 * layout. Add new providers here, not in individual pages.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user": Framer Motion disables transform/layout animation
    // when the visitor prefers reduced motion.
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  );
}
