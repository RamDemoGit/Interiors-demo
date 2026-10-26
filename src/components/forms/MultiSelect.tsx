"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
};

/**
 * Dropdown that lets the visitor tick several options. Native checkboxes
 * inside a popover: keyboard (Tab / Space), Escape and outside-click aware.
 */
export function MultiSelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Select",
  invalid,
  describedBy,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const toggle = (option: string) =>
    onChange(
      value.includes(option) ? value.filter((v) => v !== option) : [...value, option],
    );

  const summary =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? value[0]
        : `${value[0]} +${value.length - 1} more`;

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation(); // do not close a surrounding modal
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        data-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "border-line bg-ivory/60 hover:border-bronze focus-visible:border-bronze-deep flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left text-base transition-[border-color,box-shadow] duration-300 outline-none focus-visible:shadow-[0_0_0_4px_rgba(176,139,97,0.18)] data-[invalid]:border-[#a63d2f]",
          open && "border-bronze-deep bg-white",
        )}
      >
        <span
          className={cn(
            "truncate",
            value.length === 0 ? "text-taupe-deep/70" : "text-espresso",
          )}
        >
          {summary}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className={cn(
            "text-bronze-deep shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <div
        id={listId}
        role="group"
        aria-label="Project types"
        hidden={!open}
        data-lenis-prevent
        className="border-line absolute top-full right-0 left-0 z-20 mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-sm border bg-white py-1.5 shadow-[0_24px_50px_-20px_rgba(53,44,39,0.45)]"
      >
        {options.map((option) => {
          const checked = value.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "hover:bg-sand flex min-h-11 cursor-pointer items-center gap-3 px-4 py-2 text-[0.9375rem] transition-colors",
                checked ? "text-espresso font-medium" : "text-taupe-deep",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option)}
                className="accent-bronze-deep h-4.5 w-4.5 shrink-0"
              />
              {option}
            </label>
          );
        })}
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-bronze-deep border-line mt-1 w-full border-t px-4 py-3 text-left text-[0.75rem] font-semibold tracking-[0.14em] uppercase"
          >
            Clear selection
          </button>
        )}
      </div>
    </div>
  );
}
