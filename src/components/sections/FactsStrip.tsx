"use client";

import { AnimatePresence, m, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { founderDisplay, siteConfig, workAreas, workCategories } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long each kind of work stays on the reel. */
const REEL_MS = 2200;

const strip: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const icons = {
  established: (
    <svg {...iconProps}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  ),
  studio: (
    <svg {...iconProps}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
  founder: (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6" />
    </svg>
  ),
  work: (
    <svg {...iconProps}>
      <path d="M3.5 20.5h17M6 20.5V6.5l6-3 6 3v14M10 20.5v-5h4v5M9.5 9.5h1M13.5 9.5h1M9.5 12.5h1M13.5 12.5h1" />
    </svg>
  ),
};

/** One cell: icon badge on the left, label above value on the right. */
function Tile({
  icon,
  label,
  first,
  children,
}: {
  icon: ReactNode;
  label: string;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <m.li
      variants={tile}
      className="border-ivory/15 group relative flex items-center gap-3.5 border-t py-5 first:border-t-0 sm:gap-4 sm:py-7 sm:nth-[2]:border-t-0 lg:gap-3 lg:border-t-0 lg:px-4 xl:gap-3.5 xl:px-5"
    >
      {!first && (
        <m.span
          aria-hidden="true"
          className="bg-ivory/25 absolute top-5 bottom-5 left-0 hidden w-px origin-top lg:block"
          variants={{
            hidden: { scaleY: 0 },
            show: { scaleY: 1, transition: { duration: 1, ease: EASE, delay: 0.4 } },
          }}
        />
      )}
      <span className="border-ivory/35 text-ivory group-hover:bg-ivory relative grid size-12 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-(--ease-out-expo) group-hover:scale-110 group-hover:rotate-[360deg] group-hover:border-transparent group-hover:text-[#17342c] sm:size-14 lg:size-10 xl:size-12">
        <span
          aria-hidden="true"
          className="border-ivory/40 absolute inset-0 animate-ping rounded-full border [animation-duration:3.2s] motion-reduce:hidden"
        />
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-ivory/75 text-[0.625rem] font-semibold tracking-[0.2em] uppercase sm:text-[0.6875rem]">
          {label}
        </p>
        <div className="font-heading text-ivory mt-1 text-[1.15rem] leading-[1.1] sm:text-[1.5rem] lg:text-[1.35rem] xl:text-[1.5rem]">
          {children}
        </div>
      </div>
    </m.li>
  );
}

/**
 * "Our work": Commercial & Residential, with a reel underneath that rolls
 * through the five kinds of work (Interior, Construction, Fabrication,
 * Landscaping, Architecture). Each word slides up through a mask while a
 * thin progress bar fills for the active one. Screen readers get the full
 * list as text; reduced-motion users see the list printed statically.
 */
function WorkReel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % workCategories.length),
      REEL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return (
      <p className="text-ivory/85 mt-2 font-sans text-[0.8125rem] leading-snug tracking-wide">
        {workCategories.join(" · ")}
      </p>
    );
  }

  return (
    <div className="mt-2.5">
      <span className="sr-only">{workCategories.join(", ")}</span>
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="bg-ivory/70 block h-px w-6 shrink-0" />
        <span className="relative block h-[1.55rem] w-36 overflow-hidden">
          <AnimatePresence initial={false}>
            <m.span
              key={workCategories[index]}
              className="text-ivory absolute top-0 left-0 block text-[1.05rem] leading-[1.55rem] font-medium tracking-[0.12em] whitespace-nowrap uppercase"
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-115%", opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {workCategories[index]}
            </m.span>
          </AnimatePresence>
        </span>
      </div>
      <div aria-hidden="true" className="mt-2.5 flex gap-1.5">
        {workCategories.map((category, i) => (
          <span
            key={category}
            className="bg-ivory/25 relative h-[2px] w-6 overflow-hidden"
          >
            {i === index && (
              <m.span
                key={`fill-${index}`}
                className="bg-ivory absolute inset-0 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: REEL_MS / 1000, ease: "linear" }}
              />
            )}
            {i < index && <span className="bg-ivory/80 absolute inset-0" />}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * The four practice facts under the hero: a deep-green band with a slowly
 * zooming glow, icon badges, and tiles that rise in on a stagger.
 */
export function FactsStrip() {
  return (
    <div className="text-ivory relative z-20 bg-gradient-to-r from-[#10261f] via-[#1b4036] to-[#2b5a49]">
      {/* Zooming glow */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <span className="facts-zoom facts-zoom-a" />
        <span className="facts-zoom facts-zoom-b" />
      </div>

      <div className="container-site relative">
        <m.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.15fr_1.2fr_1.5fr]"
          variants={strip}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        >
          <Tile first icon={icons.established} label="Established">
            Since {siteConfig.established}
          </Tile>
          <Tile icon={icons.studio} label="Studio">
            <span className="whitespace-nowrap">
              {siteConfig.address.city}
            </span>
          </Tile>
          <Tile icon={icons.founder} label="Founder">
            <span className="whitespace-nowrap">{founderDisplay}</span>
          </Tile>
          <Tile icon={icons.work} label="Our work">
            <span className="block">
              {workAreas[0]} <span className="text-ivory/70">&amp;</span> {workAreas[1]}
            </span>
            <WorkReel />
          </Tile>
        </m.ul>
      </div>
    </div>
  );
}
