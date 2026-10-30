"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { HeroParallax } from "@/components/animation/ScrollEffects";
import { ReferenceBadge } from "@/components/ui/ReferenceBadge";
import { siteConfig, workMix } from "@/config/site";
import { referenceImages, type ReferenceKey } from "@/content/images";
import { cn } from "@/lib/utils";

type Slide = {
  image: ReferenceKey;
  /** Short description for assistive tech (the hero shows photos only). */
  label: string;
  focal: string;
  /** Pan direction of the zoom (x, y), so every slide moves differently. */
  pan: [string, string];
};

const slides: Slide[] = [
  {
    image: "officeLobby",
    label: "Corporate office lobby interior",
    focal: "center 55%",
    pan: ["-2%", "-1.4%"],
  },
  {
    image: "homeLiving",
    label: "Home living room interior",
    focal: "center 55%",
    pan: ["2%", "-1%"],
  },
  {
    image: "hotelLobby",
    label: "Commercial hotel lobby interior",
    focal: "center 50%",
    pan: ["-1.2%", "1.6%"],
  },
  {
    image: "homeKitchen",
    label: "Home kitchen and dining interior",
    focal: "center 55%",
    pan: ["1.6%", "1.2%"],
  },
  {
    image: "boardroom",
    label: "Corporate boardroom interior",
    focal: "center 55%",
    pan: ["-2%", "-1%"],
  },
];

const facts = [
  { label: "Established", value: `Since ${siteConfig.established}` },
  {
    label: "Studio",
    value: `${siteConfig.address.locality}, ${siteConfig.address.city}`,
  },
  { label: "Founder", value: siteConfig.founder },
  {
    label: "Our work",
    value: `${workMix.commercial}% commercial \u00b7 ${workMix.homes}% homes`,
  },
];

/** Time each photo stays on screen (one full zoom in + zoom out). */
const INTERVAL = 4000;
/** Zoom in then back out, finishing exactly as the next photo takes over. */
const ZOOM_TIME = "4s";

const controlBtn =
  "grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-espresso";

/**
 * Home hero: a full-height, film-style photo reel. Each photo zooms in
 * and out (like a camera move) and crossfades to the next. There is no text
 * box; the page title lives in a visually hidden h1. The first photo is
 * server-rendered visible (no JS wait for LCP). Autoplay never stops on
 * hover or touch; it can be paused with the Pause button and is off for
 * reduced motion.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const reduce = useReducedMotion();
  // Plays like a film: touching or hovering the photos never stops it.
  const playing = !userPaused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [playing, index]);

  const go = (n: number) => setIndex((n + slides.length) % slides.length);

  return (
    <>
      <section
        aria-roledescription="carousel"
        aria-label="Featured interiors"
        className="bg-espresso relative isolate overflow-hidden"
      >
        {/* Photo reel (crossfade + continuous zoom in / out) */}
        <HeroParallax className="-z-20">
          {slides.map((s, i) => {
            const img = referenceImages[s.image];
            return (
              <div
                key={s.image}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[700ms] ease-in-out",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  priority={i === 0}
                  quality={85}
                  sizes="100vw"
                  data-active={i === index}
                  data-paused={!playing}
                  className="kb-once object-cover"
                  style={
                    {
                      objectPosition: s.focal,
                      "--kb-x": s.pan[0],
                      "--kb-y": s.pan[1],
                      "--kb-s": 1.2,
                      "--kb-t": ZOOM_TIME,
                    } as CSSProperties
                  }
                />
              </div>
            );
          })}
        </HeroParallax>

        {/* Cinematic grading: vignette, bottom shade for the controls, drifting light */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(20_14_10/0.4)_100%)]"
        />
        <div
          aria-hidden="true"
          className="from-espresso/60 absolute inset-0 -z-10 bg-gradient-to-t via-transparent via-40% to-transparent"
        />
        <div
          aria-hidden="true"
          className="light-drift pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [&>span]:right-3 [&>span]:left-auto"
        >
          <ReferenceBadge />
        </div>

        <div className="relative flex h-[min(76svh,44rem)] min-h-[26rem] flex-col justify-end sm:h-[min(82svh,50rem)] lg:h-[min(calc(100svh-var(--header-h)),54rem)]">
          <h1 className="sr-only">
            {siteConfig.name}: Designing Spaces. Defining Experiences.
          </h1>
          <p className="sr-only" aria-live={playing ? "off" : "polite"}>
            {slides[index]?.label}
          </p>

          {/* Controls */}
          <div className="container-site flex items-center justify-between gap-4 pb-6 sm:pb-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className={controlBtn}
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className={controlBtn}
              >
                <Arrow />
              </button>
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                  className={cn(controlBtn, "max-sm:hidden")}
                >
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {userPaused ? (
                      <path d="M0 0l12 7-12 7z" />
                    ) : (
                      <path d="M0 0h4v14H0zM8 0h4v14H8z" />
                    )}
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <p
                className="text-sm font-semibold text-white tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
                <span className="text-white/60">
                  {" "}
                  / {String(slides.length).padStart(2, "0")}
                </span>
              </p>
              <ul className="flex items-center">
                {slides.map((s, i) => (
                  <li key={s.image}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === index}
                      className="grid h-11 w-9 place-items-center"
                    >
                      <span
                        className={cn(
                          "relative block h-[3px] overflow-hidden rounded-full bg-white/35 transition-all duration-500",
                          i === index ? "w-12" : "w-6",
                        )}
                      >
                        {i === index && (
                          <span
                            key={`fill-${index}-${playing}`}
                            className={cn(
                              "absolute inset-0 block bg-white",
                              !reduce && "seg-fill",
                            )}
                            style={{
                              animationDuration: `${INTERVAL}ms`,
                              animationPlayState: playing ? "running" : "paused",
                            }}
                          />
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Facts: open, ruled columns (no cards) */}
      <div className="border-line border-b bg-white">
        <RevealGroup
          as="ul"
          className="container-site grid grid-cols-2 gap-x-6 gap-y-9 py-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-12 lg:py-14"
        >
          {facts.map((fact, index) => (
            <RevealItem key={fact.label} as="li" className="group relative">
              <div className="border-line relative border-t pt-5">
                <span
                  aria-hidden="true"
                  className="bg-bronze absolute -top-px left-0 h-[2px] w-12 transition-[width] duration-700 ease-(--ease-out-expo) [@media(hover:hover)]:group-hover:w-full"
                />
                <span
                  aria-hidden="true"
                  className="text-bronze-deep text-[0.6875rem] font-semibold tracking-[0.2em] tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dl className="mt-3">
                  <dt className="text-taupe-deep text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
                    {fact.label}
                  </dt>
                  <dd className="font-heading mt-2 text-[1.4rem] leading-[1.15] text-balance sm:text-[1.75rem] lg:text-[2rem]">
                    {fact.value}
                  </dd>
                </dl>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>{" "}
    </>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
