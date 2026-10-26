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

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
