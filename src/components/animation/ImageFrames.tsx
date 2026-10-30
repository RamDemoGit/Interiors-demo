"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Service pages: the photo starts zoomed in inside its frame and settles to
 * its full size as it scrolls into the middle of the screen.
 */
export function ZoomOnScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.28, 1]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div style={{ scale: reduce ? 1 : scale }} className="origin-center">
        {children}
      </m.div>
    </div>
  );
}

/**
 * Project pages: the photo opens from the centre outwards, like curtains
 * parting, the first time it is seen.
 */
export function CenterReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(0% 50% 0% 50%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </m.div>
  );
}
