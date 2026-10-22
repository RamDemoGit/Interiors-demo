import type { ReactNode } from "react";

/**
 * Slow CSS marquee. Paused on hover/focus, static for reduced motion.
 * The list is rendered twice (second copy is aria-hidden) for a seamless loop.
 */
export function Marquee({ items, label }: { items: ReactNode[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="font-heading px-8 text-2xl whitespace-nowrap md:px-12 md:text-3xl">
            {item}
          </span>
          <span aria-hidden="true" className="bg-bronze h-1.5 w-1.5 rotate-45" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
