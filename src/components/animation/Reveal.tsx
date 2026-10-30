"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -40px 0px" } as const;

/** Where a revealed element travels from. Offsets stay small (no overflow). */
export type RevealFrom = "up" | "left" | "right" | "scale";

const hiddenState: Record<
  RevealFrom,
  (y: number) => { opacity: number; x?: number; y?: number; scale?: number }
> = {
  up: (y) => ({ opacity: 0, y }),
  left: () => ({ opacity: 0, x: -36 }),
  right: () => ({ opacity: 0, x: 36 }),
  scale: () => ({ opacity: 0, y: 16, scale: 0.94 }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  from?: RevealFrom;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
};

/** Reveals once when scrolled into view (0.7s ease-out), from any direction. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  from = "up",
  as = "div",
}: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={hiddenState[from](y)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/** Parent that staggers its <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

/** Alternative entrances for card grids so each page feels different. */
const swing: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 70,
    rotate: i % 2 === 0 ? -5 : 5,
    scale: 0.92,
  }),
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const flip: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -40, transformPerspective: 900 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 900,
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Image-card curtain: the card opens upwards from its bottom edge. */
const wipe: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", y: 24 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    transition: { duration: 1, ease: EASE },
  },
};

/** Rows that slide in from the left. */
const slide: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const effects = { rise: item, swing, flip, wipe, slide } as const;

/**
 * Child of <RevealGroup>. `effect` picks the entrance: "rise" (default),
 * "swing" (cards tilt in from alternate sides) or "flip" (cards fold up).
 * `index` is used by "swing" to alternate direction.
 */
export function RevealItem({
  children,
  className,
  as = "div",
  effect = "rise",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  effect?: keyof typeof effects;
  index?: number;
}) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={effects[effect]} custom={index}>
      {children}
    </Tag>
  );
}
