"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * "On this page" list that follows the reader: the section being read is
 * highlighted and a bronze marker slides to it.
 */
export function LegalToc({ sections }: { sections: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the top-most section that is currently inside the reading band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <ol className="border-line relative space-y-0.5 border-l">
      {sections.map((s, i) => {
        const isActive = s.id === active;
        return (
          <li key={s.id} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "bg-bronze-deep absolute top-0 -left-px h-full w-[2px] origin-center transition-transform duration-500 ease-(--ease-out-expo)",
                isActive ? "scale-y-100" : "scale-y-0",
              )}
            />
            <a
              href={`#${s.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "hover:text-bronze-deep flex min-h-9 items-center gap-3 py-1 pl-4 text-sm transition-[color,transform] duration-300",
                isActive ? "text-espresso translate-x-1 font-medium" : "text-taupe-deep",
              )}
            >
              <span className="text-bronze-deep text-xs tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.heading}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
