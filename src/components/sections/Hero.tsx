"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { EnquiryButton } from "@/components/forms/EnquiryModal";
import { ReferenceBadge } from "@/components/ui/ReferenceBadge";
import { siteConfig, workMix } from "@/config/site";
import { referenceImages, type ReferenceKey } from "@/content/images";
import { cn } from "@/lib/utils";

type SlideAction = { label: string; href: string } | { label: string; enquiry: true };

const enquire: SlideAction = { label: siteConfig.primaryCta.label, enquiry: true };

function SlideButton({
  action,
  variant,
}: {
  action: SlideAction;
  variant?: "primary" | "secondary";
}) {
  if ("enquiry" in action) {
    return <EnquiryButton variant={variant}>{action.label}</EnquiryButton>;
  }
  return (
    <ButtonLink href={action.href} variant={variant}>
      {action.label}
    </ButtonLink>
  );
}

type Slide = {
  image: ReferenceKey;
  eyebrow: string;
  title: string[];
  text: string;
  primary: SlideAction;
  secondary: SlideAction;
  focal: string;
};

const slides: Slide[] = [
  {
    image: "living",
    eyebrow: `${siteConfig.address.city} \u00b7 Since ${siteConfig.established}`,
    title: ["Designing Spaces.", "Defining Experiences."],
    text: `Commercial, workplace and home interiors from our ${siteConfig.address.locality} studio in ${siteConfig.address.city}, serving ${siteConfig.areaServed.join(" and ")}.`,
    primary: enquire,
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
    secondary: enquire,
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
    secondary: enquire,
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
          className="from-espresso/35 absolute inset-0 -z-10 bg-gradient-to-t via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [&>span]:right-3 [&>span]:left-auto"
        >
          <ReferenceBadge />
        </div>

        <div className="container-site relative flex min-h-[27rem] flex-col justify-between gap-6 py-8 sm:min-h-[30rem] sm:py-10 lg:min-h-[33rem] lg:py-12">
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
                    "bg-ivory/92 border-bronze col-start-1 row-start-1 max-w-md self-center border-l-4 p-5 shadow-[0_24px_50px_-28px_rgba(53,44,39,0.55)] backdrop-blur-sm sm:max-w-lg sm:p-7",
                    !active &&
                      "pointer-events-none invisible transition-[visibility] delay-700",
                  )}
                >
                  <p
                    className={cn(
                      item,
                      "eyebrow mb-3 flex items-center gap-3 !text-[0.6875rem]",
                    )}
                    style={rise(0.1)}
                  >
                    <span aria-hidden="true" className="bg-bronze h-px w-10" />
                    {s.eyebrow}
                  </p>
                  <Title
                    className={cn(
                      item,
                      "font-heading text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.01em]",
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
                      "text-espresso/85 mt-4 max-w-md text-[0.9375rem] leading-relaxed",
                    )}
                    style={rise(0.35)}
                  >
                    {s.text}
                  </p>
                  <div
                    className={cn(
                      item,
                      "mt-5 flex flex-col gap-3 sm:flex-row [&_a]:min-h-10 [&_a]:px-5 [&_a]:py-2.5 [&_a]:text-[0.75rem] [&_button]:min-h-10 [&_button]:px-5 [&_button]:py-2.5 [&_button]:text-[0.75rem]",
                    )}
                    style={rise(0.5)}
                  >
                    <SlideButton action={s.primary} />
                    <SlideButton action={s.secondary} variant="secondary" />
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
      <div className="bg-sand border-line border-b">
        <RevealGroup className="container-site grid grid-cols-2 gap-3 py-6 sm:gap-4 lg:grid-cols-4 lg:gap-6 lg:py-9">
          {facts.map((fact) => (
            <RevealItem key={fact.label} className="flex">
              <div
                tabIndex={0}
                className="group border-line relative isolate flex min-h-[6.25rem] w-full touch-manipulation flex-col items-center justify-center overflow-hidden border bg-white px-3 py-5 text-center transition-[transform,box-shadow,border-color] duration-500 ease-out outline-none focus-visible:scale-[1.04] focus-visible:shadow-xl active:scale-[1.04] active:shadow-xl sm:px-5 sm:py-6 [@media(hover:hover)]:hover:scale-[1.04] [@media(hover:hover)]:hover:border-[var(--bronze-deep)] [@media(hover:hover)]:hover:shadow-xl"
              >
                <span
                  aria-hidden="true"
                  className="bg-espresso absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-[650ms] ease-(--ease-out-expo) group-focus-visible:scale-y-100 group-active:scale-y-100 [@media(hover:hover)]:group-hover:scale-y-100"
                />
                <span
                  aria-hidden="true"
                  className="bg-bronze absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform delay-300 duration-500 group-focus-visible:scale-x-100 group-active:scale-x-100 [@media(hover:hover)]:group-hover:scale-x-100"
                />
                <dl className="flex flex-col items-center">
                  <dt className="text-taupe-deep group-focus-visible:text-bronze-light group-active:text-bronze-light [@media(hover:hover)]:group-hover:text-bronze-light text-[0.6875rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-500">
                    {fact.label}
                  </dt>
                  <dd className="font-heading group-focus-visible:text-ivory group-active:text-ivory [@media(hover:hover)]:group-hover:text-ivory mt-2 text-[1.2rem] leading-tight text-balance transition-colors duration-500 sm:text-2xl">
                    {fact.value}
                  </dd>
                </dl>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
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
