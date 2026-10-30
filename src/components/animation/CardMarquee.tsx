import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A slow, endless rail of cards. CSS only (no JS), paused on hover or keyboard
 * focus, static for reduced motion. The list is rendered twice (the second copy
 * is aria-hidden and not focusable) for a seamless loop.
 */
export function CardMarquee({
  items,
  label,
  reverse = false,
  duration = 70,
  className,
}: {
  items: ReactNode[];
  label: string;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  if (items.length === 0) return null;

  // Make each half wide enough that the loop never shows a gap.
  const repeat = Math.max(1, Math.ceil(6 / items.length));
  const half = Array.from({ length: repeat }, () => items).flat();

  const style: CSSProperties = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 gap-5 pr-5"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
      {...(hidden ? { inert: true } : {})}
    >
      {half.map((card, i) => (
        <li key={i} className="flex w-[17rem] shrink-0 sm:w-[20rem]">
          {card}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]",
        className,
      )}
    >
      <div className="marquee-track" style={style}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
