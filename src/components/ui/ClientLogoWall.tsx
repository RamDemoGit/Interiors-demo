"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type WallItem = { src: string; name: string };

const EASE = [0.22, 1, 0.36, 1] as const;

function Tile({
  item,
  onOpen,
  hidden,
}: {
  item: WallItem;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hidden?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      tabIndex={hidden ? -1 : 0}
      aria-haspopup="dialog"
      aria-label={`View ${item.name}`}
      className="logo-tile border-line group/tile hover:border-bronze relative mx-2.5 flex h-28 w-52 shrink-0 cursor-zoom-in items-center justify-center border bg-white p-5 transition-[transform,box-shadow,border-color] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:shadow-[0_22px_40px_-24px_rgba(53,44,39,0.55)] focus-visible:-translate-y-1 md:h-32 md:w-60 md:p-6"
    >
      <span className="relative block h-full w-full">
        <Image
          src={item.src}
          alt={item.name}
          fill
          sizes="240px"
          quality={90}
          unoptimized={item.src.toLowerCase().endsWith(".svg")}
          className="object-contain"
        />
      </span>
    </button>
  );
}

function Row({
  items,
  offset,
  reverse,
  duration,
  label,
  onOpen,
}: {
  items: WallItem[];
  offset: number;
  reverse?: boolean;
  duration: number;
  label: string;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
}) {
  // Each half is at least ~10 tiles wide so the loop never shows a gap.
  const repeat = Math.max(1, Math.ceil(10 / items.length));
  const half = Array.from({ length: repeat }, () => items).flat();
  const style: CSSProperties = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  const list = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
    >
      {half.map((item, i) => (
        <li key={`${item.src}-${i}`} className="flex">
          <Tile
            item={item}
            hidden={hidden}
            onOpen={(event) => onOpen(offset + (i % items.length), event.currentTarget)}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_2%,#000_98%,transparent)] py-3">
      <div className="marquee-track" style={style}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

/**
 * Moving wall of client logos (two rows, opposite directions, paused on
 * hover or focus). Clicking a logo opens it full size in a viewer with
 * previous / next, keyboard and swipe support.
 */
export function ClientLogoWall({ items }: { items: WallItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const split = Math.ceil(items.length / 2);
  const rowA = items.slice(0, split);
  const rowB = items.slice(split);

  const open = useCallback((index: number, el: HTMLButtonElement) => {
    trigger.current = el;
    setDirection(1);
    setActive(index);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    trigger.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setDirection(delta);
      setActive((current) =>
        current === null ? current : (current + delta + items.length) % items.length,
      );
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [active, close, step]);

  if (items.length === 0) return null;
  const current = active === null ? null : items[active];

  return (
    <>
      <div className="space-y-3">
        <Row
          items={rowA}
          offset={0}
          duration={Math.max(52, rowA.length * 5.5)}
          label="Our clients"
          onOpen={open}
        />
        {rowB.length > 0 && (
          <Row
            items={rowB}
            offset={split}
            reverse
            duration={Math.max(58, rowB.length * 6)}
            label="More of our clients"
            onOpen={open}
          />
        )}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {current && active !== null && (
              <m.div
                key="viewer"
                role="dialog"
                aria-modal="true"
                aria-label={`${current.name}, image ${active + 1} of ${items.length}`}
                data-lenis-prevent
                className="fixed inset-0 z-[90] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  aria-label="Close viewer"
                  tabIndex={-1}
                  onClick={close}
                  className="bg-espresso/85 absolute inset-0 cursor-default backdrop-blur-md"
                />

                <m.div
                  className="relative w-full max-w-4xl"
                  initial={{ opacity: 0, scale: 0.6, y: 70 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 320,
                      damping: 13,
                      mass: 0.9,
                      opacity: { duration: 0.25 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.94,
                    y: 12,
                    transition: { duration: 0.3, ease: EASE },
                  }}
                  onTouchStart={(event) => {
                    touchX.current = event.touches[0]?.clientX ?? null;
                  }}
                  onTouchEnd={(event) => {
                    const start = touchX.current;
                    touchX.current = null;
                    const end = event.changedTouches[0]?.clientX;
                    if (start === null || end === undefined) return;
                    if (Math.abs(end - start) > 50) step(end < start ? 1 : -1);
                  }}
                >
                  <div className="relative h-[min(62svh,34rem)] overflow-hidden bg-white">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                      <m.div
                        key={current.src}
                        custom={direction}
                        className="absolute inset-0 p-5 sm:p-10"
                        initial={{ opacity: 0, x: direction * 90, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 14,
                            opacity: { duration: 0.25 },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: direction * -80,
                          scale: 0.92,
                          transition: { duration: 0.3, ease: EASE },
                        }}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src={current.src}
                            alt={current.name}
                            fill
                            sizes="(min-width: 1024px) 56rem, 92vw"
                            quality={90}
                            unoptimized={current.src.toLowerCase().endsWith(".svg")}
                            className="object-contain"
                          />
                        </div>
                      </m.div>
                    </AnimatePresence>
                    <span
                      aria-hidden="true"
                      className="bg-bronze absolute inset-x-0 top-0 h-1"
                    />
                  </div>

                  <div className="bg-espresso text-ivory flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="text-bronze-light text-[0.6875rem] font-semibold tracking-[0.2em] tabular-nums">
                        {String(active + 1).padStart(2, "0")} /{" "}
                        {String(items.length).padStart(2, "0")}
                      </p>
                      <p className="font-heading truncate text-[1.35rem] leading-tight">
                        {current.name}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <NavButton label="Previous" onClick={() => step(-1)} flip />
                      <NavButton label="Next" onClick={() => step(1)} />
                      <button
                        ref={closeBtn}
                        type="button"
                        onClick={close}
                        aria-label="Close"
                        className="border-ivory/40 hover:bg-ivory hover:text-espresso ml-1 grid size-11 place-items-center rounded-full border transition-colors"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 1l10 10M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function NavButton({
  label,
  onClick,
  flip,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-ivory/40 hover:bg-ivory hover:text-espresso grid size-11 place-items-center rounded-full border transition-colors"
    >
      <svg
        width="18"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
        aria-hidden="true"
        className={cn(flip && "rotate-180")}
      >
        <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}
