"use client";

import { m, type Variants } from "motion/react";
import { CountUp } from "@/components/animation/ScrollEffects";
import { achievements, siteConfig, workAreas } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const row: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const cell: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

const numberClass =
  "font-heading text-bronze-deep block leading-[0.95] text-[clamp(2.1rem,0.9rem+5.2vw,5.25rem)]";
const labelClass =
  "text-taupe-deep mt-2 block text-[0.625rem] leading-snug font-semibold tracking-[0.14em] uppercase sm:mt-3 sm:text-[0.75rem] sm:tracking-[0.2em]";

/**
 * The practice figures on one straight row: projects completed, years of
 * experience, and the two sides of the work. Figures come from
 * `achievements` in config/site.ts (owner-supplied).
 *
 * Animation: the top and bottom rules draw across, each cell rises and
 * scales in on a stagger, the numbers count up, and the dividers grow
 * downward between them.
 */
export function Achievements() {
  return (
    <section
      aria-label="The practice in numbers"
      className="bg-sand relative overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="achievements-glow pointer-events-none absolute top-1/2 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      <m.span
        aria-hidden="true"
        className="bg-bronze absolute inset-x-0 top-0 h-px origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <m.span
        aria-hidden="true"
        className="bg-bronze absolute inset-x-0 bottom-0 h-px origin-right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />

      <div className="container-site relative">
        <m.ul
          className="grid grid-cols-3 items-stretch"
          variants={row}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <m.li variants={cell} className="py-9 pr-2 sm:py-14 sm:pr-6 lg:py-16">
            <CountUp
              to={achievements.projectsCompleted}
              suffix="+"
              duration={2.6}
              className={numberClass}
            />
            <span className={labelClass}>Projects completed</span>
          </m.li>

          <m.li
            variants={cell}
            className="relative px-2 py-9 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
          >
            <Divider />
            <CountUp
              to={achievements.yearsOfExperience}
              suffix="+"
              duration={2}
              className={numberClass}
            />
            <span className={labelClass}>
              Years of experience
              <span className="hidden sm:inline">
                {" "}
                &middot; since {siteConfig.established}
              </span>
            </span>
          </m.li>

          <m.li
            variants={cell}
            className="relative py-9 pl-2 sm:py-14 sm:pl-6 lg:py-16 lg:pl-10"
          >
            <Divider />
            <span className="font-heading text-espresso block text-[clamp(1.2rem,0.6rem+2.6vw,2.9rem)] leading-[1.05]">
              {workAreas[0]}
              <span className="text-bronze-deep block italic">&amp; {workAreas[1]}</span>
            </span>
            <span className={labelClass}>
              <span className="sm:hidden">Offices &amp; homes</span>
              <span className="hidden sm:inline">
                Workplaces, retail, hospitality &amp; homes
              </span>
            </span>
          </m.li>
        </m.ul>
      </div>
    </section>
  );
}

/** Vertical rule between cells that grows downward when revealed. */
function Divider() {
  return (
    <m.span
      aria-hidden="true"
      className="bg-bronze/60 absolute top-6 bottom-6 left-0 w-px origin-top"
      variants={{
        hidden: { scaleY: 0 },
        show: { scaleY: 1, transition: { duration: 1.1, ease: EASE, delay: 0.3 } },
      }}
    />
  );
}
