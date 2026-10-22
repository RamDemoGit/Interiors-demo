import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Text link with an arrow that nudges on hover. */
export function ArrowLink({ className, children, ...rest }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group text-bronze-deep inline-flex min-h-11 items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.16em] uppercase",
        className,
      )}
      {...rest}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="bg-bronze absolute inset-x-0 -bottom-1 h-px origin-left scale-x-100 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-x-0"
        />
      </span>
      <svg
        width="22"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1.5"
      >
        <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </Link>
  );
}
