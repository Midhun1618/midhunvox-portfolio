"use client";

import { useRef, type DependencyList, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

interface GsapSetupContext {
  /** True when the visitor prefers reduced motion — skip or simplify motion. */
  reducedMotion: boolean;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

type GsapSetup = (context: GsapSetupContext) => void | (() => void);

/**
 * Standard way to run GSAP in a component.
 *
 * - Scopes selectors to `scope` (so "'.item'" only matches inside it).
 * - Re-runs when the reduced-motion preference changes.
 * - Reverts every tween/ScrollTrigger created in `setup` on cleanup, which is
 *   required because Next.js (Cache Components) hides routes with <Activity>,
 *   running effect cleanup, and re-runs the effect when they become visible.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useGsap(ref, ({ gsap, reducedMotion }) => {
 *     if (reducedMotion) return;
 *     gsap.from(".item", { autoAlpha: 0, y: 24 });
 *   });
 */
export function useGsap<T extends HTMLElement>(
  setup: GsapSetup,
  deps: DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        allow: "(prefers-reduced-motion: no-preference)",
      },
      (context) =>
        setup({
          reducedMotion: Boolean(context.conditions?.reduce),
          gsap,
          ScrollTrigger,
        }),
    );

    return () => mm.revert();
    // `setup` is intentionally not a dependency: callers pass inline closures,
    // and re-running on every render would restart animations. Pass `deps`.
  }, deps);

  return scope;
}
