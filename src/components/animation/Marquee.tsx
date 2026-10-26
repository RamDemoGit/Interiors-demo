import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  items: ReactNode[];
  label: string;
  /** Run right-to-left instead of left-to-right. */
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  itemClassName?: string;
  dotClassName?: string;
};

/**
 * Slow CSS marquee. Paused on hover/focus, static for reduced motion.
 * The list is rendered twice (second copy is aria-hidden) for a seamless loop.
 */
export function Marquee({
  items,
  label,
  reverse = false,
  duration = 60,
  itemClassName,
  dotClassName,
}: Props) {
  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span
            className={cn(
              "font-heading px-8 text-2xl whitespace-nowrap md:px-12 md:text-3xl",
              itemClassName,
            )}
          >
            {item}
          </span>
          <span
            aria-hidden="true"
            className={cn("bg-bronze h-1.5 w-1.5 rotate-45", dotClassName)}
          />
        </li>
      ))}
    </ul>
  );

  const style: CSSProperties = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track" style={style}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
