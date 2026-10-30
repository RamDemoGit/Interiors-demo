"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export type Step = { title: string; body: string };

/**
 * Vertical timeline: a bronze line draws itself down the list as you scroll,
 * and each numbered node pops in when it is reached.
 */
export function StepTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative mt-10 space-y-2">
      {/* Track + drawing line */}
      <span
        aria-hidden="true"
        className="bg-line absolute top-3 bottom-3 left-[1.375rem] w-px"
      />
      <m.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : draw, transformOrigin: "top" }}
        className="bg-bronze absolute top-3 bottom-3 left-[1.375rem] w-px"
      />
      {steps.map((step, i) => (
        <m.li
          key={step.title}
          initial={reduce ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="relative flex gap-6 py-5"
        >
          <m.span
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="font-heading border-bronze bg-ivory text-bronze-deep relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border text-lg"
          >
            {i + 1}
          </m.span>
          <div className="pt-1">
            <h3 className="font-heading text-[1.5rem] leading-tight">{step.title}</h3>
            <p className="text-taupe-deep mt-1.5">{step.body}</p>
          </div>
        </m.li>
      ))}
    </ol>
  );
}
