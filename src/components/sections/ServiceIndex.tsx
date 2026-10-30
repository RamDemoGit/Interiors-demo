"use client";

import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { referenceImages } from "@/content/images";
import { segmentLabel, services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Services as a large editorial index. On desktop a photo floats beside the
 * cursor and swaps as you move down the list; each row also fills with colour
 * on hover. On touch screens every row shows a small thumbnail instead.
 */
export function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    // Keep the preview inside the viewport.
    const w = 288;
    const h = 360;
    const left = Math.min(e.clientX + 28, window.innerWidth - w - 16);
    const top = Math.min(Math.max(e.clientY - h / 2, 88), window.innerHeight - h - 16);
    x.set(left);
    y.set(top);
  };

  return (
    <section className="bg-ivory py-16 sm:py-20 md:py-28">
      <div className="container-site">
        <div onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
          <RevealGroup as="ul" className="border-line border-t">
            {services.map((service, i) => {
              const image = referenceImages[service.image];
              return (
                <RevealItem key={service.slug} as="li" className="border-line border-b">
                  <Link
                    href={`/services/${service.slug}`}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="group relative isolate flex min-h-24 items-center gap-4 overflow-hidden px-3 py-5 outline-none sm:gap-8 sm:px-6 md:min-h-28"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-espresso absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-[600ms] ease-(--ease-out-expo) group-focus-visible:scale-x-100 [@media(hover:hover)]:group-hover:scale-x-100"
                    />
                    <span className="text-bronze-deep group-focus-visible:text-bronze-light [@media(hover:hover)]:group-hover:text-bronze-light w-8 shrink-0 text-xs font-semibold tracking-[0.2em] transition-colors duration-500 sm:w-12">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading group-focus-visible:text-ivory [@media(hover:hover)]:group-hover:text-ivory min-w-0 flex-1 text-[clamp(1.3rem,1rem+1.6vw,2.4rem)] leading-tight transition-[color,transform] duration-500 [@media(hover:hover)]:group-hover:translate-x-3">
                      {service.name}
                    </span>
                    <span className="group-focus-visible:text-ivory/80 [@media(hover:hover)]:group-hover:text-ivory/80 text-taupe-deep hidden shrink-0 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-500 md:block">
                      {segmentLabel[service.segment]}
                    </span>
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden md:hidden">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-bronze-deep group-focus-visible:text-ivory [@media(hover:hover)]:group-hover:text-ivory shrink-0 text-xl transition-[color,transform] duration-500 [@media(hover:hover)]:group-hover:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>

      {/* Floating preview (mouse only) */}
      <m.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-[22.5rem] w-72 [@media(hover:hover)]:block"
      >
        <AnimatePresence>
          {active !== null && (
            <m.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, clipPath: "inset(12% 12% 12% 12%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={cn("absolute inset-0 overflow-hidden shadow-2xl")}
            >
              <Image
                src={referenceImages[services[active]?.image ?? "living"].src}
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </section>
  );
}
