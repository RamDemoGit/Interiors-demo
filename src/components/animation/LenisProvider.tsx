"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

/** Returns the Lenis instance, or null (SSR, reduced motion, not yet loaded). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Smooth scrolling. Lenis is dynamically imported after the page is idle so it
 * never competes with LCP, and it is skipped entirely when the visitor
 * prefers reduced motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let raf = 0;
    let instance: Lenis | null = null;

    const start = async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;
      instance = new LenisCtor({ lerp: 0.1, smoothWheel: true });
      setLenis(instance);
      const loop = (time: number) => {
        instance?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => void start(), { timeout: 1500 })
        : window.setTimeout(() => void start(), 300);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function")
        window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
