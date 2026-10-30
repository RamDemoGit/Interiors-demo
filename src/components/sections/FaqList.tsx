"use client";

import { useId, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

/**
 * Accordion with smooth height animation (grid-rows trick, no layout JS).
 * One item open at a time; the first starts open. Buttons carry
 * aria-expanded / aria-controls and the answers stay in the DOM for SEO.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <RevealGroup as="ul" className="border-line border-t">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <RevealItem key={f.question} as="li" className="border-line border-b">
            <h2>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group relative flex min-h-16 w-full items-center gap-4 py-5 text-left sm:gap-6"
              >
                <span className="text-bronze-deep w-8 shrink-0 text-xs font-semibold tracking-[0.2em] sm:w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-heading flex-1 text-[1.2rem] leading-snug transition-[color,transform] duration-500 sm:text-[1.5rem]",
                    isOpen
                      ? "text-bronze-deep translate-x-1"
                      : "[@media(hover:hover)]:group-hover:translate-x-1",
                  )}
                >
                  {f.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "border-bronze text-bronze-deep relative h-9 w-9 shrink-0 rounded-full border transition-[background-color,color,transform] duration-500",
                    isOpen && "bg-bronze-deep text-ivory rotate-180",
                  )}
                >
                  <span className="absolute top-1/2 left-1/2 h-px w-3.5 -translate-x-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute top-1/2 left-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-500",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "bg-bronze absolute bottom-0 left-0 h-px origin-left transition-all duration-700 ease-(--ease-out-expo)",
                    isOpen ? "w-full" : "w-0",
                  )}
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out-expo)",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-taupe-deep max-w-3xl pr-4 pb-7 pl-12 text-[1.0625rem] sm:pl-16">
                  {f.answer}
                </p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
