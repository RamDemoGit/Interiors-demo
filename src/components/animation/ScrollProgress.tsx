"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Thin bronze reading-progress line, placed at the bottom of the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-bronze absolute inset-x-0 bottom-0 h-px origin-left"
    />
  );
}
