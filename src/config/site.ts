/**
 * Single source of truth for business facts and feature flags.
 *
 * RULES
 * - Only facts confirmed by the owner live in the "VERIFIED" block.
 * - Anything unconfirmed is a `TODO_VERIFY_*` constant set to `null`.
 *   Components must render NOTHING for a `null` value (use `isVerified()`).
 * - Never hard-code a phone number, address, map pin, hours or social URL
 *   anywhere else in the codebase.
 */

export const isVerified = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/* -------------------------------------------------------------------------- */
/* TODO_VERIFY_*  (render nothing until filled in)                            */
/* -------------------------------------------------------------------------- */

/** Public phone number, E.164 format e.g. "+914412345678". */
export const TODO_VERIFY_PHONE = null as string | null;
/** Human-readable phone, e.g. "+91 44 1234 5678". Required with the phone. */
export const TODO_VERIFY_PHONE_DISPLAY = null as string | null;
/** WhatsApp number, digits only with country code e.g. "919876543210". */
export const TODO_VERIFY_WHATSAPP_NUMBER = null as string | null;
/** Street line of the T. Nagar studio. */
export const TODO_VERIFY_STREET_ADDRESS = null as string | null;
/** PIN code of the T. Nagar studio. */
export const TODO_VERIFY_POSTAL_CODE = null as string | null;
/** Google Maps embed / pin URL. Not rendered until the address is verified. */
export const TODO_VERIFY_MAP_URL = null as string | null;
/** Latitude / longitude for schema.org geo. */
export const TODO_VERIFY_GEO = null as { lat: number; lng: number } | null;
/** Opening hours text, e.g. "Mon-Sat, 10:00-18:00". */
export const TODO_VERIFY_OFFICE_HOURS = null as string | null;
/** Social profile URLs. Used for footer links and schema `sameAs`. */
export const TODO_VERIFY_INSTAGRAM_URL = null as string | null;
export const TODO_VERIFY_LINKEDIN_URL = null as string | null;
export const TODO_VERIFY_FACEBOOK_URL = null as string | null;
export const TODO_VERIFY_YOUTUBE_URL = null as string | null;
/** Founder qualifications / registration. Never invent these. */
export const TODO_VERIFY_FOUNDER_QUALIFICATIONS = null as string | null;
/** Logo image path (e.g. "/logos/lahima-logo.png"). Text wordmark is used until set. */
export const TODO_VERIFY_LOGO_PATH = null as string | null;
/** Additional emails the owner has confirmed (empty until confirmed). */
export const TODO_VERIFY_ADDITIONAL_EMAILS = [] as string[];

/* -------------------------------------------------------------------------- */
/* VERIFIED                                                                   */
/* -------------------------------------------------------------------------- */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Lahima In-Des",
  legalName: "Lahima In-Des | Architects & Engineers",
  shortDescriptor: "Architects & Engineers",
  tagline: "Designing Spaces. Defining Experiences.",
  established: 1995,
  founder: "A. P. Balasubramaniam",
  url: SITE_URL,
  locale: "en_IN",
  language: "en-IN",
  /** The only confirmed public contact email. */
  email: "lahimaindes@gmail.com",
  address: {
    locality: "T. Nagar",
    city: "Chennai",
    region: "Tamil Nadu",
    country: "IN",
  },
  /** Areas served, used for LocalBusiness `areaServed`. */
  areaServed: ["Chennai", "South India"],
  primaryCta: { label: "DISCUSS YOUR PROJECT", href: "/contact" },
} as const;

/**
 * Owner-supplied approximate split of the practice's work. Shown on the site
 * as an approximate share ("about 75%"). Update here if the mix changes.
 */
export const workMix = { commercial: 75, homes: 25 } as const;

/* -------------------------------------------------------------------------- */
/* Feature flags                                                              */
/* -------------------------------------------------------------------------- */

export const featureFlags = {
  /** Client logos stay hidden until the owner supplies and approves them. */
  showClientLogos: false,
  /** Area landing pages are `noindex` until the owner approves the copy. */
  indexAreaPages: false,
  /** Testimonials are never fabricated; the quote area stays hidden. */
  showTestimonialQuotes: false,
  /**
   * Shows a "Reference image" chip on every stock/placeholder image.
   * Set to false ONLY after all stock imagery has been replaced by real work.
   */
  showReferenceBadges: true,
} as const;

/* -------------------------------------------------------------------------- */
/* Derived, render-safe contact data (null = render nothing)                  */
/* -------------------------------------------------------------------------- */

export const verifiedContact = {
  email: siteConfig.email,
  phone:
    isVerified(TODO_VERIFY_PHONE) && isVerified(TODO_VERIFY_PHONE_DISPLAY)
      ? { tel: TODO_VERIFY_PHONE, display: TODO_VERIFY_PHONE_DISPLAY }
      : null,
  whatsappUrl: isVerified(TODO_VERIFY_WHATSAPP_NUMBER)
    ? `https://wa.me/${TODO_VERIFY_WHATSAPP_NUMBER.replace(/\D/g, "")}`
    : null,
  streetAddress: isVerified(TODO_VERIFY_STREET_ADDRESS)
    ? TODO_VERIFY_STREET_ADDRESS
    : null,
  postalCode: isVerified(TODO_VERIFY_POSTAL_CODE) ? TODO_VERIFY_POSTAL_CODE : null,
  mapUrl:
    isVerified(TODO_VERIFY_MAP_URL) && isVerified(TODO_VERIFY_STREET_ADDRESS)
      ? TODO_VERIFY_MAP_URL
      : null,
  geo: TODO_VERIFY_GEO,
  officeHours: isVerified(TODO_VERIFY_OFFICE_HOURS) ? TODO_VERIFY_OFFICE_HOURS : null,
  social: {
    instagram: isVerified(TODO_VERIFY_INSTAGRAM_URL) ? TODO_VERIFY_INSTAGRAM_URL : null,
    linkedin: isVerified(TODO_VERIFY_LINKEDIN_URL) ? TODO_VERIFY_LINKEDIN_URL : null,
    facebook: isVerified(TODO_VERIFY_FACEBOOK_URL) ? TODO_VERIFY_FACEBOOK_URL : null,
    youtube: isVerified(TODO_VERIFY_YOUTUBE_URL) ? TODO_VERIFY_YOUTUBE_URL : null,
  },
} as const;

/** Non-null social URLs, for schema `sameAs` and footer links. */
export const socialLinks = Object.entries(verifiedContact.social)
  .filter((entry): entry is [string, string] => isVerified(entry[1]))
  .map(([network, url]) => ({ network, url }));
