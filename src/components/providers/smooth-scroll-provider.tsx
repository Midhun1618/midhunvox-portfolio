"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Ref to the active Lenis instance (`ref.current` is null when smooth
 * scrolling is disabled, e.g. reduced motion, or before mount).
 */
export function useLenisRef(): RefObject<Lenis | null> {
  const ref = useContext(LenisContext);
  if (!ref) {
    throw new Error("useLenisRef must be used inside <SmoothScrollProvider>");
  }
  return ref;
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so Lenis and ScrollTrigger
 * share one animation loop. Disabled entirely under reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP defaults
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
