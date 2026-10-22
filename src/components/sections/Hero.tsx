"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ReferenceBadge } from "@/components/ui/ReferenceBadge";
import { siteConfig, workMix } from "@/config/site";
import { referenceImages, type ReferenceKey } from "@/content/images";
import { cn } from "@/lib/utils";

type Slide = {
  image: ReferenceKey;
  eyebrow: string;
  title: string[];
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  focal: string;
};

const slides: Slide[] = [
  {
    image: "living",
    eyebrow: `${siteConfig.address.city} \u00b7 Since ${siteConfig.established}`,
    title: ["Designing Spaces.", "Defining Experiences."],
    text: `Commercial, workplace and home interiors from our ${siteConfig.address.locality} studio in ${siteConfig.address.city}, serving ${siteConfig.areaServed.join(" and ")}.`,
    primary: siteConfig.primaryCta,
    secondary: { label: "View Projects", href: "/projects" },
    focal: "center 60%",
  },
  {
    image: "office",
    eyebrow: `Commercial \u00b7 about ${workMix.commercial}% of our work`,
    title: ["Workplaces, retail", "and hospitality, designed."],
    text: "Offices, shops, cafés, hotels and institutions: commercial spaces planned to work as well as they look.",
    primary: {
      label: "Commercial Interiors",
      href: "/services/commercial-retail-interior-design",
    },
    secondary: { label: "Enquire Now", href: "/contact#enquiry" },
    focal: "center 50%",
  },
  {
    image: "dining",
    eyebrow: `Homes \u00b7 about ${workMix.homes}% of our work`,
    title: ["Rooms shaped around", "the way you live."],
    text: "Kitchens, bedrooms, living and dining rooms, pooja rooms and more, designed room by room.",
    primary: {
      label: "Residential Interiors",
      href: "/services/residential-interior-design",
    },
    secondary: { label: siteConfig.primaryCta.label, href: siteConfig.primaryCta.href },
    focal: "center 55%",
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

const INTERVAL = 7000;

/**
 * Home hero slider. The first slide is server-rendered visible (no JS wait for
 * LCP). Autoplay pauses on hover, focus and via the Pause button, and is off
 * for reduced motion.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduce = useReducedMotion();
  const playing = !userPaused && !hovered && !reduce;

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
        aria-label="Featured"
        className="bg-ivory relative isolate overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* Image layer (crossfade) */}
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          {slides.map((s, i) => {
            const img = referenceImages[s.image];
            return (
              <div
                key={s.image}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={cn(
                    "object-cover transition-transform duration-[9000ms] ease-out",
                    i === index ? "scale-105" : "scale-100",
                  )}
                  style={{ objectPosition: s.focal }}
                />
              </div>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(245,241,234,0.96)_0%,rgba(245,241,234,0.88)_40%,rgba(245,241,234,0.2)_100%)] max-md:bg-[linear-gradient(180deg,rgba(245,241,234,0.93)_0%,rgba(245,241,234,0.8)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [&>span]:right-3 [&>span]:left-auto"
        >
          <ReferenceBadge />
        </div>

        <div className="container-site relative flex min-h-[34rem] flex-col justify-between gap-10 py-12 sm:min-h-[38rem] sm:py-16 lg:min-h-[calc(100svh-var(--header-h)-9rem)] lg:py-20">
          {/* Slide copy stacked in one grid cell so height = tallest slide */}
          <div
            className="grid flex-1 content-center"
            aria-live={playing ? "off" : "polite"}
          >
            {slides.map((s, i) => {
              const active = i === index;
              const Title = i === 0 ? "h1" : "p";
              const rise = (d: number): CSSProperties => ({
                transitionDelay: active ? `${d}s` : "0s",
              });
              const item = cn(
                "transition-[opacity,transform] duration-700 ease-out",
                active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
              );
              return (
                <div
                  key={s.title.join(" ")}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}`}
                  aria-hidden={!active}
                  inert={!active}
                  className={cn(
                    "col-start-1 row-start-1 max-w-3xl",
                    !active &&
                      "pointer-events-none invisible transition-[visibility] delay-700",
                  )}
                >
                  <p
                    className={cn(item, "eyebrow mb-6 flex items-center gap-4")}
                    style={rise(0.1)}
                  >
                    <span aria-hidden="true" className="bg-bronze h-px w-10" />
                    {s.eyebrow}
                  </p>
                  <Title
                    className={cn(
                      item,
                      "font-heading text-[clamp(2.5rem,1.1rem+5.2vw,4.75rem)] leading-[1.03] font-medium tracking-[-0.015em]",
                    )}
                    style={rise(0.2)}
                  >
                    {s.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </Title>
                  <p
                    className={cn(
                      item,
                      "text-espresso/85 mt-7 max-w-lg text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)]",
                    )}
                    style={rise(0.35)}
                  >
                    {s.text}
                  </p>
                  <div
                    className={cn(item, "mt-9 flex flex-col gap-4 sm:flex-row")}
                    style={rise(0.5)}
                  >
                    <ButtonLink href={s.primary.href}>{s.primary.label}</ButtonLink>
                    <ButtonLink href={s.secondary.href} variant="secondary">
                      {s.secondary.label}
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="border-espresso/60 text-espresso hover:bg-espresso hover:text-ivory grid h-11 w-11 place-items-center rounded-full border bg-white/70 backdrop-blur-sm transition-colors"
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="border-espresso/60 text-espresso hover:bg-espresso hover:text-ivory grid h-11 w-11 place-items-center rounded-full border bg-white/70 backdrop-blur-sm transition-colors"
              >
                <Arrow />
              </button>
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                  className="border-espresso/60 text-espresso hover:bg-espresso hover:text-ivory grid h-11 w-11 place-items-center rounded-full border bg-white/70 backdrop-blur-sm transition-colors max-sm:hidden"
                >
                  {userPaused ? (
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M0 0l12 7-12 7z" />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M0 0h4v14H0zM8 0h4v14H8z" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <p
                className="text-espresso text-sm font-semibold tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
                <span className="text-taupe-deep">
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
                      className="grid h-11 w-8 place-items-center"
                    >
                      <span
                        className={cn(
                          "block h-[3px] rounded-full transition-all duration-500",
                          i === index ? "bg-bronze-deep w-8" : "bg-espresso/35 w-4",
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <div className="border-line border-y bg-white">
        <dl className="container-site grid grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border-line border-b px-4 py-5 odd:pl-0 max-lg:nth-[n+3]:border-b-0 max-sm:last:col-span-2 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="text-taupe-deep text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
                {fact.label}
              </dt>
              <dd className="font-heading mt-1 text-xl leading-tight sm:text-2xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
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
