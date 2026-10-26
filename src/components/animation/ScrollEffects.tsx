"use client";

import {
  animate,
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Moves its children vertically while the element crosses the viewport.
 * Pure transform (GPU), no layout work. Static for reduced motion.
 */
export function Drift({
  children,
  from = -40,
  to = 40,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <m.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </m.div>
  );
}

/**
 * Full-bleed background layer that drifts slower than the page while the
 * hero scrolls away (window scroll). Put the <Image> inside.
 */
export function HeroParallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], ["0%", "12%"]);
  return (
    <m.div
      aria-hidden="true"
      style={reduce ? undefined : { y }}
      className={cn("absolute inset-x-0 -top-[6%] -bottom-[6%]", className)}
    >
      {children}
    </m.div>
  );
}

function BandRow({
  text,
  progress,
  reverse,
  outline,
  still,
}: {
  text: string;
  progress: MotionValue<number>;
  reverse?: boolean;
  outline?: boolean;
  still?: boolean;
}) {
  const x = useTransform(progress, [0, 1], reverse ? ["-38%", "2%"] : ["2%", "-38%"]);
  return (
    <m.p
      style={still ? undefined : { x }}
      className={cn(
        "font-heading w-max text-[clamp(3.5rem,2rem+9vw,10rem)] leading-[1.02] font-semibold tracking-tight whitespace-nowrap select-none",
        outline ? "text-outline" : "text-bronze-deep/90",
      )}
    >
      {text}
    </m.p>
  );
}

/**
 * Oversized decorative words that slide sideways as the section scrolls past:
 * one outlined row and one solid row moving in opposite directions.
 */
export function ScrollTextBand({
  top,
  bottom,
  className,
}: {
  top: string;
  bottom: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("overflow-hidden py-8 md:py-12", className)}
    >
      <BandRow text={top} progress={scrollYProgress} outline still={!!reduce} />
      <BandRow text={bottom} progress={scrollYProgress} reverse still={!!reduce} />
    </div>
  );
}

/**
 * Number that counts up once when it scrolls into view. The final value is in
 * the server-rendered HTML (SEO / no-JS safe); reduced motion keeps it as is.
 */
export function CountUp({
  to,
  from = 0,
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  from?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
