"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "lahima-cookie-consent";
const OPEN_EVENT = "lahima:cookie-settings";
type Choice = "granted" | "denied" | null;

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Footer button that reopens the cookie notice. Renders only if analytics is configured. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}

/**
 * Analytics consent. Nothing is loaded or stored until the visitor accepts.
 * If `NEXT_PUBLIC_GA_ID` is not set, no banner is shown and no analytics run.
 */
export function ConsentManager() {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading localStorage is only possible after mount.
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "granted" || saved === "denied") setChoice(saved);
      else setOpen(true);
    } catch {
      setOpen(true);
    }
    setReady(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!GA_ID || !ready) return null;

  const decide = (value: Exclude<Choice, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable: the choice applies for this visit only */
    }
    setChoice(value);
    setOpen(false);
  };

  return (
    <>
      {choice === "granted" && <GoogleAnalytics gaId={GA_ID} />}
      {open && (
        <section
          role="dialog"
          aria-label="Cookie notice"
          className="border-line fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 border bg-white p-5 shadow-[0_20px_50px_-20px_rgba(53,44,39,0.5)] sm:right-auto sm:max-w-md lg:bottom-6 lg:left-6"
        >
          <p className="font-heading text-xl leading-snug">Cookies</p>
          <p className="text-taupe-deep mt-2 text-sm">
            We use analytics cookies only if you allow them, to understand how the website
            is used. Read our{" "}
            <Link href="/cookie-policy" className="link-underline text-espresso">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <Button className="flex-1 px-4" onClick={() => decide("granted")}>
              Accept
            </Button>
            <Button
              variant="secondary"
              className="flex-1 px-4"
              onClick={() => decide("denied")}
            >
              Decline
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
