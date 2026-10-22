import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

type BuildMetadataInput = {
  /** Page title WITHOUT the site suffix (the root layout template adds it). Keep under 60 chars total. */
  title: string;
  /** Under 160 characters. */
  description: string;
  /** Path starting with "/", used for the canonical and OG url. */
  path: string;
  noindex?: boolean;
  /** Absolute or root-relative image. Falls back to the file-based OG image. */
  image?: string;
  type?: "website" | "article";
};

/**
 * Shared metadata builder so every route gets canonical, Open Graph,
 * Twitter and robots consistently. Phase 5 wires this into every route.
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  image,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}
