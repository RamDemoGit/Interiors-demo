"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig, verifiedContact } from "@/config/site";
import {
  CONSENT_TEXT,
  PROJECT_TYPES,
  enquirySchema,
  type EnquiryData,
  type EnquiryInput,
} from "@/lib/validators";
import { cn } from "@/lib/utils";

const field =
  "border-line focus:border-bronze-deep w-full rounded-sm border bg-white px-4 py-3 text-base text-espresso placeholder:text-taupe-deep/70 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bronze-deep)] aria-[invalid=true]:border-[#a63d2f]";

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="text-bronze-deep">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#a63d2f]">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Enquiry form. Validated with Zod. No server or email service is involved:
 * "Send by email" opens the visitor's own mail app with the enquiry filled in,
 * addressed to the studio (with a Gmail web fallback link). "Send on WhatsApp"
 * appears only when the WhatsApp number is verified in config/site.ts.
 * A honeypot field silently drops bot submissions.
 */
export function EnquiryForm() {
  const [sent, setSent] = useState<{ gmail: string } | null>(null);
  const whatsappUrl = verifiedContact.whatsappUrl;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, EnquiryData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      projectType: undefined,
      location: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const send = (data: EnquiryData, via: "email" | "whatsapp") => {
    if (data.website) return; // honeypot

    const lines = [
      `Hello ${siteConfig.name}, I would like to discuss a project.`,
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      `Project type: ${data.projectType}`,
      data.location ? `Location: ${data.location}` : null,
      "",
      data.message,
    ].filter((l): l is string => l !== null);
    const text = lines.join("\n");

    if (via === "whatsapp" && whatsappUrl) {
      window.open(
        `${whatsappUrl}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setSent(null);
      return;
    }

    const subject = `Project enquiry: ${data.projectType}`;
    const to = siteConfig.email;
    setSent({
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
    });
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  const describedBy = (name: keyof EnquiryInput) =>
    errors[name] ? `${String(name)}-error` : undefined;

  return (
    <form
      id="enquiry-form"
      onSubmit={handleSubmit((d) => send(d, "email"))}
      noValidate
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={field}
            {...register("name")}
          />
        </Field>
        <Field id="phone" label="Phone number" required error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={field}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="email" label="Email (optional)" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={field}
            {...register("email")}
          />
        </Field>
        <Field id="location" label="Project location" error={errors.location?.message}>
          <input
            id="location"
            type="text"
            autoComplete="off"
            placeholder="e.g. Velachery, Chennai"
            aria-invalid={!!errors.location}
            aria-describedby={describedBy("location")}
            className={field}
            {...register("location")}
          />
        </Field>
      </div>

      <Field
        id="projectType"
        label="Project type"
        required
        error={errors.projectType?.message}
      >
        <select
          id="projectType"
          defaultValue=""
          aria-invalid={!!errors.projectType}
          aria-describedby={describedBy("projectType")}
          className={cn(
            field,
            "appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%2385643D' stroke-width='1.5'%3E%3Cpath d='m1 1 5 5 5-5'/%3E%3C/svg%3E\")",
          }}
          {...register("projectType")}
        >
          <option value="" disabled>
            Select a project type
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label="About your project"
        required
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about the space, its size and what you would like to create."
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          className={cn(field, "resize-y")}
          {...register("message")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="accent-bronze-deep mt-1 h-5 w-5 shrink-0"
            {...register("consent")}
          />
          <label htmlFor="consent" className="text-taupe-deep text-sm leading-relaxed">
            {CONSENT_TEXT}{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-bronze-deep font-medium"
            >
              Read the Privacy Policy
            </a>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-sm text-[#a63d2f]">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-bronze-deep hover:bg-bronze-deeper inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm px-7 py-3.5 text-[0.8125rem] font-semibold tracking-[0.16em] text-white uppercase transition-colors disabled:opacity-60 sm:w-auto"
        >
          <MailIcon width={20} height={20} />
          Send by email
        </button>
        {whatsappUrl && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit((d) => send(d, "whatsapp"))}
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm bg-[#17794c] px-7 py-3.5 text-[0.8125rem] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#10603b] disabled:opacity-60 sm:w-auto"
          >
            <WhatsAppIcon width={20} height={20} />
            Send on WhatsApp
          </button>
        )}
      </div>

      <div role="status" aria-live="polite">
        {sent && (
          <p className="text-taupe-deep text-sm">
            Your email app should now open with your enquiry filled in. Just press send.
            No email app?{" "}
            <a
              href={sent.gmail}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-bronze-deep font-medium"
            >
              Open it in Gmail
            </a>{" "}
            or write to {siteConfig.email}.
          </p>
        )}
      </div>
    </form>
  );
}
