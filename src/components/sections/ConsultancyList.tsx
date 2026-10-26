"use client";

import { m, type Variants } from "motion/react";
import { consultancyPoints } from "@/content/scope";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/** Rows slide in from alternating sides. */
const row = (dir: 1 | -1): Variants => ({
  hidden: { opacity: 0, x: 36 * dir },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
});

/**
 * Alternating black / white rows. Mild motion: slide-in from alternate sides,
 * a colour sweep and a nudge on hover/press, and a drawn rule under the title.
 */
export function ConsultancyList() {
  return (
    <m.ol
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      className="space-y-3"
    >
      {consultancyPoints.map((point, i) => {
        const dark = i % 2 === 0;
        return (
          <m.li
            key={point.title}
            variants={row(dark ? -1 : 1)}
            className={cn(
              "group relative touch-manipulation overflow-hidden transition-[transform,box-shadow] duration-500 ease-out active:scale-[0.99] [@media(hover:hover)]:hover:translate-x-1.5 [@media(hover:hover)]:hover:shadow-[0_24px_50px_-28px_rgba(53,44,39,0.6)]",
              dark
                ? "bg-espresso text-ivory"
                : "border-espresso text-espresso border bg-white",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-0 left-0 w-0 transition-[width] duration-700 ease-(--ease-out-expo) group-active:w-full [@media(hover:hover)]:group-hover:w-full",
                dark ? "bg-bronze-deep" : "bg-sand",
              )}
            />
            <div className="relative flex items-start gap-5 p-5 sm:gap-8 sm:p-7">
              <span
                className={cn(
                  "font-heading w-12 shrink-0 text-4xl leading-none sm:w-14 sm:text-5xl",
                  dark ? "text-bronze-light" : "text-bronze-deep",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3
                  className={cn(
                    "font-heading text-[1.4rem] leading-tight sm:text-[1.7rem]",
                    dark ? "text-ivory" : "text-espresso",
                  )}
                >
                  {point.title}
                </h3>
                <span
                  aria-hidden="true"
                  className={cn(
                    "my-3 block h-px w-10 transition-all duration-700 ease-(--ease-out-expo) group-active:w-24 [@media(hover:hover)]:group-hover:w-24",
                    dark ? "bg-bronze-light" : "bg-bronze",
                  )}
                />
                <p className={cn("text-[1rem]", dark ? "text-ivory" : "text-taupe-deep")}>
                  {point.body}
                </p>
              </div>
            </div>
          </m.li>
        );
      })}
    </m.ol>
  );
}
