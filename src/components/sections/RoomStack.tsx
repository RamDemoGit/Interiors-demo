"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { ScopeItem } from "@/content/scope";
import { cn } from "@/lib/utils";

function StackCard({
  room,
  index,
  total,
  progress,
  reduce,
}: {
  room: ScopeItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const [active, setActive] = useState(0);
  const current = room.items[active] ?? room.items[0];
  const flip = index % 2 === 1;
  // Each card shrinks slightly as the next one slides over it.
  const target = 1 - (total - index) * 0.025;
  const scale = useTransform(progress, [index / total, 1], [1, reduce ? 1 : target]);

  return (
    <li
      className="sticky pb-5 sm:pb-8"
      style={{ top: `calc(var(--header-h) + 0.75rem + ${index * 0.6}rem)` }}
    >
      <m.article
        style={{ scale, transformOrigin: "50% 0%" }}
        className="border-line grid overflow-hidden border bg-white shadow-[0_30px_60px_-40px_rgba(53,44,39,0.5)] md:min-h-[24rem] md:grid-cols-2"
      >
        <div
          className={cn(
            "bg-sand relative aspect-[16/9] md:aspect-auto",
            flip && "md:order-2",
          )}
        >
          {room.items.map((item, i) => (
            <Image
              key={item.label}
              src={item.image.src}
              alt={i === active ? item.image.alt : ""}
              aria-hidden={i !== active}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={cn(
                "object-cover transition-[opacity,transform] duration-700 ease-out",
                i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
              )}
            />
          ))}
          <p
            key={current?.label}
            className="text-ivory absolute bottom-3 left-3 bg-[#10261f]/85 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase backdrop-blur-sm"
          >
            {current?.label} &middot; Design visualization
          </p>
        </div>
        <div className="relative flex flex-col justify-center p-6 sm:p-9 lg:p-12">
          <span
            aria-hidden="true"
            className="font-heading text-outline pointer-events-none absolute top-3 right-5 text-[4.5rem] leading-none select-none sm:text-[6.5rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="eyebrow mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="bg-bronze h-px w-8" />
            Room {index + 1} of {total}
          </p>
          <h3 className="font-heading relative text-[clamp(1.8rem,1.3rem+1.8vw,2.9rem)] leading-[1.05]">
            {room.title}
          </h3>
          <span aria-hidden="true" className="bg-bronze mt-5 block h-px w-16" />
          <ul
            className="relative mt-5 flex flex-wrap gap-2"
            aria-label={`${room.title} includes`}
          >
            {room.items.map((item, i) => (
              <li key={item.label}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-300 sm:text-[0.875rem]",
                    i === active
                      ? "text-ivory border-[#17342c] bg-[#17342c]"
                      : "border-line text-taupe-deep bg-ivory hover:border-[#2b5a49] hover:text-[#17342c]",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-taupe-deep relative mt-4 text-[0.75rem] tracking-[0.12em] uppercase">
            Tap a badge to see it
          </p>
        </div>
      </m.article>
    </li>
  );
}

/**
 * Room-by-room cards that stack: each room pins under the header and the next
 * one slides over it, while the pinned card eases back slightly. Pure CSS
 * sticky plus one scroll value; stays a normal list on reduced motion.
 */
export function RoomStack({ rooms }: { rooms: ScopeItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ol ref={ref} className="relative">
      {rooms.map((room, i) => (
        <StackCard
          key={room.title}
          room={room}
          index={i}
          total={rooms.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </ol>
  );
}
