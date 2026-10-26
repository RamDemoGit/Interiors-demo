"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { useFocusTrap } from "@/lib/use-focus-trap";

type Ctx = { open: () => void; close: () => void };
const EnquiryContext = createContext<Ctx>({ open: () => {}, close: () => {} });

/** Open / close the enquiry modal from anywhere. */
export const useEnquiry = () => useContext(EnquiryContext);

const EASE = [0.22, 1, 0.36, 1] as const;

/** Form code (react-hook-form + zod) is only downloaded when the modal opens. */
const EnquiryForm = dynamic(
  () => import("@/components/forms/EnquiryForm").then((mod) => mod.EnquiryForm),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="text-taupe-deep py-10 text-sm">
        Loading form&hellip;
      </p>
    ),
  },
);

const steps = [
  "Fill in the form",
  "Your email app opens with the details filled in",
  "Press send and we will respond to your enquiry",
];

/**
 * Site-wide enquiry modal. Locks page scroll, traps focus, closes on Escape,
 * backdrop click or the close button, and returns focus to the trigger.
 */
export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  useFocusTrap(panelRef, isOpen, close);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const image = { src: "/reference/modal-studio.jpg" };

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="enquiry-modal"
            className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              aria-label="Close enquiry form"
              tabIndex={-1}
              onClick={close}
              className="bg-espresso/75 absolute inset-0 cursor-default backdrop-blur-sm"
            />
            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-modal-title"
              className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] sm:max-h-[90vh] md:grid md:min-h-[34rem] md:grid-cols-[2fr_3fr] md:grid-rows-[minmax(0,1fr)]"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {/* Image side (a slim banner on mobile) */}
              <aside className="bg-espresso text-ivory relative h-28 shrink-0 overflow-hidden sm:h-36 md:h-auto">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  quality={85}
                  className="object-cover object-[30%_60%] md:object-center"
                />
                <div
                  aria-hidden="true"
                  className="from-espresso/90 via-espresso/35 absolute inset-0 bg-gradient-to-t to-transparent md:via-transparent"
                />
                <div className="relative flex h-full flex-col justify-end p-5 md:p-9">
                  <p className="eyebrow !text-bronze-light mb-2 md:mb-4">Enquiry</p>
                  <p className="font-heading text-ivory text-[1.5rem] leading-[1.1] md:text-[2.2rem]">
                    Let&rsquo;s talk about your space.
                  </p>
                  <ol className="mt-8 hidden space-y-4 md:block">
                    {steps.map((step, i) => (
                      <li key={step} className="flex gap-4 text-[0.9375rem]">
                        <span className="font-heading text-bronze-light text-2xl leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-ivory pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-ivory/90 border-ivory/25 mt-8 hidden border-t pt-5 text-sm md:block">
                    {siteConfig.address.locality}, {siteConfig.address.city}
                    <br />
                    {siteConfig.email}
                  </p>
                </div>
              </aside>

              {/* Form side */}
              <div
                data-lenis-prevent
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 lg:p-10"
              >
                <h2
                  id="enquiry-modal-title"
                  className="mb-1.5 text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight"
                >
                  Tell us about your project.
                </h2>
                <p className="text-taupe-deep mb-6 text-[0.9375rem]">
                  Fill in the form and your email app opens with your details filled in.
                </p>
                <EnquiryForm idPrefix="modal-" />
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="border-ivory/40 bg-espresso/60 text-ivory hover:bg-bronze-deep md:border-line md:text-espresso md:hover:text-ivory md:hover:bg-espresso absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full border backdrop-blur-sm transition-colors md:bg-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M1 1l12 12M13 1 1 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                  />
                </svg>
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </EnquiryContext.Provider>
  );
}

/** A button styled like `ButtonLink` that opens the enquiry modal. */
export function EnquiryButton({
  children,
  variant,
  tone,
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  tone?: "default" | "light";
  className?: string;
}) {
  const { open } = useEnquiry();
  return (
    <button
      type="button"
      onClick={open}
      className={buttonClasses(variant, tone, className)}
    >
      {children}
    </button>
  );
}

/** Unstyled trigger (for custom-styled buttons such as the contact dock). */
export function EnquiryTrigger({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={open} aria-label={ariaLabel} className={className}>
      {children}
    </button>
  );
}
