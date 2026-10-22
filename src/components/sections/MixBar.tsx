"use client";

import { m } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Two-part proportion bar that grows from the left when scrolled into view. */
export function MixBar({ commercial, homes }: { commercial: number; homes: number }) {
  return (
    <div
      role="img"
      aria-label={`About ${commercial} percent commercial work and ${homes} percent homes`}
      className="bg-sand flex h-4 w-full overflow-hidden rounded-full sm:h-5"
    >
      <m.div
        className="bg-bronze-deep h-full origin-left"
        style={{ width: `${commercial}%` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <m.div
        className="bg-bronze-light h-full origin-left"
        style={{ width: `${homes}%` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
      />
    </div>
  );
}
