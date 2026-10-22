"use client";

import Link from "next/link";
import { useRef } from "react";
import { mainNav } from "@/content/navigation";
import { siteConfig, verifiedContact } from "@/config/site";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

type Props = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

/**
 * Full-screen mobile menu (white + beige). It sits above the header (z-60) and
 * carries its own logo + close button so keyboard focus can be trapped in one
 * container. The hidden state uses `inert` (removed from tab order and the
 * accessibility tree).
 */
export function MobileMenu({ open, pathname, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open, onClose);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      inert={!open}
      data-lenis-prevent
      className={cn(
        "nav:hidden fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white",
        "transition-[clip-path,visibility] duration-[650ms] ease-(--ease-out-expo)",
        open
          ? "visible [clip-path:inset(0_0_0_0)]"
          : "invisible [transition-delay:0s,650ms] [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div className="border-line container-site flex h-(--header-h) shrink-0 items-center justify-between border-b">
        <Logo onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="border-line text-espresso hover:border-bronze inline-flex h-11 items-center gap-2.5 rounded-sm border pr-3.5 pl-4 text-[0.75rem] font-semibold tracking-[0.18em] uppercase transition-colors max-[419px]:w-11 max-[419px]:justify-center max-[419px]:px-0"
        >
          <span className="max-[419px]:sr-only">Close</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site flex-1 py-6">
        <ul className="flex flex-col">
          {mainNav.map((item, i) => {
            const current =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="border-line overflow-hidden border-b">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={current ? "page" : undefined}
                  style={{ transitionDelay: open ? `${180 + i * 55}ms` : "0ms" }}
                  className={cn(
                    "font-heading flex min-h-14 items-center justify-between py-2.5 text-[clamp(1.75rem,1.3rem+2.2vw,2.5rem)] transition-[transform,opacity,color] duration-700 ease-(--ease-out-expo)",
                    open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                    current ? "text-bronze-deep" : "text-espresso",
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-taupe-deep font-body text-xs tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </span>
                  <span aria-hidden="true" className="text-bronze text-xl">
                    &rarr;
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="bg-sand mt-auto">
        <div className="container-site flex flex-col gap-5 py-8">
          <ButtonLink href={siteConfig.primaryCta.href} onClick={onClose}>
            {siteConfig.primaryCta.label}
          </ButtonLink>
          <div className="text-taupe-deep space-y-1 text-sm">
            <p>
              {siteConfig.address.locality}, {siteConfig.address.city} &middot; Since{" "}
              {siteConfig.established}
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="link-underline break-all">
                {siteConfig.email}
              </a>
            </p>
            {verifiedContact.phone && (
              <p>
                <a href={`tel:${verifiedContact.phone.tel}`} className="link-underline">
                  {verifiedContact.phone.display}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
