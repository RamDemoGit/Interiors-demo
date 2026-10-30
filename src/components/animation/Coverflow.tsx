"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { ProjectImage } from "@/content/types";
import { cn } from "@/lib/utils";

export type CoverflowItem = {
  slug: string;
  title: string;
  category: string;
  location: string;
  status: string;
  image: ProjectImage;
};

type Props = {
  items: CoverflowItem[];
  /** Milliseconds between automatic turns. */
  interval?: number;
  className?: string;
};

/**
 * 3D coverflow carousel: the active project faces forward and neighbours
 * swing away in perspective. Auto-turns; pauses on hover, focus or when
 * the user has asked for reduced motion. Swipe, arrows, dots and the
 * keyboard all work.
 */
export function Coverflow({ items, interval = 3600, className }: Props) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [reduced, setReduced] = useState(false);
  const drag = useRef<{ x: number; id: number } | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (step: number) => setActive((current) => (current + step + count) % count),
    [count],
  );

  useEffect(() => {
    if (hold || reduced || count < 2) return;
    const timer = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(timer);
  }, [hold, reduced, count, interval, go, active]);

  if (count === 0) return null;
  const current = items[active] ?? items[0];
  if (!current) return null;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client projects"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      <div
        className="relative mx-auto h-[26rem] touch-pan-y select-none [perspective:1400px] sm:h-[32rem] lg:h-[36rem]"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, id: event.pointerId };
        }}
        onPointerUp={(event) => {
          const start = drag.current;
          drag.current = null;
          if (!start) return;
          const delta = event.clientX - start.x;
          if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <ul className="absolute inset-0 [transform-style:preserve-3d]">
          {items.map((item, index) => {
            let offset = index - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const distance = Math.abs(offset);
            const visible = distance <= 2;
            const isActive = offset === 0;
            return (
              <li
                key={item.slug}
                className="absolute top-1/2 left-1/2 w-[62%] max-w-[22rem] transition-[transform,opacity,filter] duration-[800ms] ease-(--ease-out-expo) will-change-transform sm:w-[44%] lg:w-[26%]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 58}%) translateZ(${-distance * 120}px) rotateY(${offset * -34}deg) scale(${isActive ? 1 : 0.92})`,
                  opacity: visible ? (isActive ? 1 : 0.55 - distance * 0.12) : 0,
                  filter: isActive ? "none" : "saturate(0.7)",
                  zIndex: 10 - distance,
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <button
                  type="button"
                  tabIndex={isActive ? -1 : 0}
                  aria-label={`Show ${item.title}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "border-line block w-full cursor-pointer border bg-white p-2 text-left shadow-[0_30px_60px_-30px_rgba(53,44,39,0.55)]",
                    isActive && "pointer-events-none",
                  )}
                >
                  <Photo
                    image={item.image}
                    ratio="aspect-[4/5]"
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 44vw, 62vw"
                    reveal={false}
                    reference={false}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 flex flex-col items-center text-center" aria-live="polite">
        <p className="text-bronze-deep text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
          {current.category} &middot; {current.status}
        </p>
        <h3 className="font-heading mt-2 text-[1.75rem] leading-tight md:text-[2.1rem]">
          {current.title}
        </h3>
        <p className="text-taupe-deep mt-1 text-sm">{current.location}</p>
        <Link
          href={`/projects/${current.slug}`}
          className="text-bronze-deep hover:text-espresso mt-4 inline-flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.16em] uppercase transition-colors"
        >
          View project
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
            <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="border-line hover:bg-espresso hover:text-ivory hover:border-espresso flex size-11 items-center justify-center rounded-full border bg-white transition-colors"
        >
          <svg width="18" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
            <path d="M22 5H2M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
        <ul className="flex items-center gap-1.5" aria-label="Choose a project">
          {items.map((item, index) => (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.title}`}
                aria-current={index === active}
                className="group flex h-6 items-center"
              >
                <span
                  className={cn(
                    "block h-[3px] transition-all duration-500",
                    index === active
                      ? "bg-bronze w-8"
                      : "bg-line group-hover:bg-bronze-light w-3",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="border-line hover:bg-espresso hover:text-ivory hover:border-espresso flex size-11 items-center justify-center rounded-full border bg-white transition-colors"
        >
          <svg width="18" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
            <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
