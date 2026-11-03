"use client";

import { useRef, type ReactNode } from "react";
import { useEnquiry } from "@/components/forms/EnquiryModal";

/**
 * Closing stage on a deep green field. A soft light follows the pointer and a faint sheen drifts
 * across.
 */
export function CtaStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      aria-label="Start a conversation"
      className="cta-stage text-ivory relative isolate overflow-hidden bg-gradient-to-br from-[#10261f] via-[#1b4036] to-[#2b5a49] py-20 md:py-32"
      onPointerMove={(event) => {
        const el = ref.current;
        if (!el || event.pointerType === "touch") return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      <div
        aria-hidden="true"
        className="cta-spot pointer-events-none absolute inset-0 -z-10"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="footer-sweep" />
      </div>
      {children}
    </section>
  );
}

/**
 * Round call-to-action: lettering rings around a button that leans toward
 * the pointer. Opens the enquiry modal.
 */
export function EnquiryOrb({ label }: { label: string }) {
  const { open } = useEnquiry();
  const zone = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const lean = (x: number, y: number) => {
    const el = button.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <div
      ref={zone}
      className="relative mx-auto flex size-[15rem] items-center justify-center sm:size-[18rem]"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = zone.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        lean(dx * 0.22, dy * 0.22);
      }}
      onPointerLeave={() => lean(0, 0)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="text-ivory absolute inset-0 size-full"
      >
        <defs>
          <path
            id="orb-path"
            d="M100 100 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0"
          />
        </defs>
        <text fill="currentColor" fontSize="11.5" fontWeight="600" letterSpacing="3.4">
          <textPath href="#orb-path" textLength="534" lengthAdjust="spacing">
            {`${label} \u2022 ${label} \u2022 `}
          </textPath>
        </text>
      </svg>

      <span
        aria-hidden="true"
        className="border-ivory/40 absolute inset-[3.2rem] rounded-full border sm:inset-[3.8rem]"
      />

      <button
        ref={button}
        type="button"
        onClick={open}
        aria-label={label}
        className="orb group border-ivory/50 text-ivory relative flex size-[7.5rem] items-center justify-center overflow-hidden rounded-full border bg-[#0b1d17] transition-[transform,color,box-shadow] duration-300 ease-out hover:text-[#10261f] focus-visible:text-[#10261f] sm:size-[8.5rem]"
      >
        <span
          aria-hidden="true"
          className="bg-ivory absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="orb-arrow relative"
        >
          <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
    </div>
  );
}
