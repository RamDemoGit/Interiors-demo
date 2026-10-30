/**
 * Owner-supplied names and logos for the two moving logo strips.
 *
 * Both lists are intentionally EMPTY. Nothing here is invented: a client may
 * only be listed with their permission, and a brand may only be listed as
 * "preferred" if the studio genuinely specifies it.
 *
 * To switch a strip on:
 *   1. Put each logo file in `public/logos/` (SVG or PNG, ideally on a
 *      transparent background, e.g. `public/logos/acme.svg`).
 *   2. Add an entry below. `logo` is optional: without it the name is shown
 *      as a clean text wordmark.
 *   3. Set `showClientLogos` / `showPreferredBrands` to true in
 *      `src/config/site.ts`.
 */
export type LogoEntry = {
  /** Brand or client name (also used as the image alt text). */
  name: string;
  /** Path under /public, e.g. "/logos/acme.svg". Optional. */
  logo?: string;
  /** Intrinsic logo size in px (any consistent ratio). Defaults to 160 x 64. */
  width?: number;
  height?: number;
  /** Optional link to the brand's own website. */
  href?: string;
};

/** Clients who have given permission to be shown (Clientele page). */
export const clientLogos: LogoEntry[] = [];

/** Interior product brands the studio prefers to specify (Home page). */
export const preferredBrands: LogoEntry[] = [];
