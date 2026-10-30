"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { referenceImages } from "@/content/images";
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
  const image = referenceImages[room.image];
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
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
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
            {room.items.map((item) => (
              <li
                key={item}
                className="border-line text-taupe-deep bg-ivory rounded-full border px-3.5 py-1.5 text-[0.8125rem] sm:text-[0.875rem]"
              >
                {item}
              </li>
            ))}
          </ul>
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
