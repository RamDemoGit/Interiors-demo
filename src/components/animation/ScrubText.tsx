"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block">
      {word}
      {"\u00a0"}
    </m.span>
  );
}

/**
 * Scroll-scrubbed statement: words light up one by one as the reader scrolls.
 * The full sentence stays in the DOM for assistive tech and reduced motion
 * (words are simply fully visible then).
 */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]}
          />
        ))}
      </span>
    </p>
  );
}
