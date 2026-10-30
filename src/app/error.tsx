"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";

/** Shown if a page fails while rendering, instead of a blank or broken screen. */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-site">
      <div className="py-24 md:py-36">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 max-w-3xl">This page could not be loaded.</h1>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="bg-bronze-deep inline-flex min-h-12 items-center px-7 text-[0.8125rem] font-semibold tracking-[0.16em] text-white uppercase"
          >
            Try again
          </button>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
