"use client";

import { useLenis } from "@/components/animation/LenisProvider";

/** Smooth-scrolls back to the top of the page. */
export function BackToTop({ className }: { className?: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Back to top
      <span aria-hidden="true">&uarr;</span>
    </button>
  );
}
