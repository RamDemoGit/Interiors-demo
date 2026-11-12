"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { serviceLinks } from "@/content/navigation";
import { cn } from "@/lib/utils";

type Props = {
  pathname: string;
  triggerClassName: (current: boolean) => string;
};

/**
 * Desktop "Our Services" nav item: click opens a panel of every service page.
 */
export function ServicesDropdown({ pathname, triggerClassName }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const listId = useId();
  const current = pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(triggerClassName(current), "gap-1.5")}
      >
        Our Services
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={cn(
            "transition-transform duration-300 ease-(--ease-out-expo)",
            open && "rotate-180",
          )}
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          aria-hidden="true"
          className={cn(
            "bg-bronze absolute inset-x-3 bottom-2 h-px origin-left transition-transform duration-500 ease-(--ease-out-expo)",
            current || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </button>

      <div
        id={listId}
        role="region"
        aria-label="Our services"
        hidden={!open}
        className={cn(
          "border-line absolute top-[calc(100%+0.35rem)] left-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-sm border bg-white shadow-[0_18px_40px_-24px_rgba(53,44,39,0.45)]",
          open ? "visible" : "invisible",
        )}
        data-lenis-prevent
      >
        <div className="border-line flex items-center justify-between gap-3 border-b px-4 py-3">
          <p className="text-taupe-deep text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
            Browse services
          </p>
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="text-bronze-deep hover:text-espresso text-[0.75rem] font-semibold tracking-[0.08em] uppercase transition-colors"
          >
            View all
          </Link>
        </div>
        <ul className="grid max-h-[min(70vh,28rem)] grid-cols-1 gap-x-2 overflow-y-auto p-2 sm:grid-cols-2">
          {serviceLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-sm px-3 py-2.5 text-[0.875rem] leading-snug font-medium transition-colors",
                    active
                      ? "bg-sand text-bronze-deep"
                      : "text-espresso hover:bg-sand/70 hover:text-bronze-deep",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
