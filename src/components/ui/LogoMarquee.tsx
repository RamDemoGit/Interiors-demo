import Image from "next/image";
import type { CSSProperties } from "react";
import type { LogoEntry } from "@/content/brands";
import { cn } from "@/lib/utils";

function Tile({ entry }: { entry: LogoEntry }) {
  const { name, logo, href, width = 160, height = 64 } = entry;

  const inner = logo ? (
    <Image
      src={logo}
      alt={name}
      width={width}
      height={height}
      unoptimized={logo.endsWith(".svg")}
      className="h-9 w-auto max-w-[9rem] object-contain md:h-11 md:max-w-[11rem]"
    />
  ) : (
    <span className="font-heading text-espresso/75 text-xl tracking-wide whitespace-nowrap uppercase md:text-2xl">
      {name}
    </span>
  );

  const tile =
    "logo-tile flex h-20 min-w-[9.5rem] items-center justify-center px-6 md:h-24 md:min-w-[12rem] md:px-8";

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(tile, "hover:text-bronze-deep")}
      aria-label={`${name} (opens in a new tab)`}
    >
      {inner}
    </a>
  ) : (
    <span className={tile}>{inner}</span>
  );
}

/**
 * One row of moving logos. CSS-only (no JS), paused on hover or focus, static
 * for reduced motion. The list is repeated so the loop is seamless even when
 * there are only a few entries.
 */
export function LogoMarquee({
  items,
  label,
  reverse = false,
  duration = 40,
  className,
}: {
  items: LogoEntry[];
  label: string;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  if (items.length === 0) return null;

  // Make each half at least ~8 tiles wide so the loop never shows a gap.
  const repeat = Math.max(1, Math.ceil(8 / items.length));
  const half = Array.from({ length: repeat }, () => items).flat();

  const style: CSSProperties = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
    >
      {half.map((entry, i) => (
        <li key={`${entry.name}-${i}`} className="flex">
          <Tile entry={entry} />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
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
