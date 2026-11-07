import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The ONLY place GSAP plugins are registered. Always import `gsap` and
 * `ScrollTrigger` from here, never from "gsap" directly, so registration is
 * guaranteed. Client-only: import from "use client" modules.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
