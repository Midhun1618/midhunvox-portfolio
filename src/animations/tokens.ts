/**
 * Shared motion tokens (seconds). Mirrors the CSS variables in
 * src/styles/tokens.css (--duration-*, --ease-*): change both together.
 * Animations must reference these, never magic numbers.
 */
export const duration = {
  instant: 0.12,
  fast: 0.25,
  base: 0.6,
  slow: 1.0,
} as const;

/** GSAP ease strings. */
export const gsapEase = {
  out: "power3.out",
  inOut: "power2.inOut",
  emphasized: "expo.out",
} as const;

/** Framer Motion cubic-bezier equivalents. */
export const motionEase = {
  out: [0.215, 0.61, 0.355, 1],
  inOut: [0.455, 0.03, 0.515, 0.955],
  emphasized: [0.16, 1, 0.3, 1],
} as const;

/** Default ScrollTrigger start for reveal-on-scroll animations. */
export const scrollStart = "top 85%";

/** Stagger gaps (seconds) between sibling reveals. */
export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.15,
} as const;