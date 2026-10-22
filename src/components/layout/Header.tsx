"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/config/site";
import { useLenis } from "@/components/animation/LenisProvider";
import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const DESKTOP_QUERY = "(min-width: 74rem)";

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  // Menu is "open" only for the path it was opened on, so navigating closes it
  // without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const menuOpen = openAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      root.style.overflow = previous;
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  // Close the menu if the viewport grows to the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpenAt(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-500",
          scrolled
            ? "border-line shadow-[0_8px_24px_-18px_rgba(53,44,39,0.35)]"
            : "border-transparent",
        )}
      >
        <div
          className={cn(
            "container-wide flex items-center justify-between gap-3 transition-[height] duration-500 ease-out sm:gap-6",
            scrolled ? "nav:h-[4.25rem] h-16" : "h-(--header-h)",
          )}
        >
          <Logo />

          <nav
            aria-label="Primary"
            className="nav:flex hidden min-w-0 flex-1 justify-center"
          >
            <ul className="flex items-center gap-0.5 min-[1280px]:gap-1.5">
              {mainNav.map((item) => {
                const current =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] leading-none font-semibold tracking-[0.01em] whitespace-nowrap transition-colors",
                        current
                          ? "text-bronze-deep"
                          : "text-espresso hover:text-bronze-deep",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "bg-bronze absolute inset-x-3 bottom-2 h-px origin-left transition-transform duration-500 ease-(--ease-out-expo)",
                          current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={siteConfig.primaryCta.href}
              className="max-cta:hidden whitespace-nowrap"
            >
              {siteConfig.primaryCta.label}
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpenAt(pathname)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="border-line text-espresso hover:border-bronze nav:hidden inline-flex h-11 items-center gap-2.5 rounded-sm border pr-3.5 pl-4 text-[0.75rem] font-semibold tracking-[0.18em] uppercase transition-colors max-[419px]:w-11 max-[419px]:justify-center max-[419px]:px-0"
            >
              <span className="max-[419px]:sr-only">Menu</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <ScrollProgress />
      </header>

      {/* Sibling of <header> on purpose: backdrop-filter would otherwise become
          the containing block for this fixed overlay. */}
      <MobileMenu open={menuOpen} pathname={pathname} onClose={() => setOpenAt(null)} />
    </>
  );
}
