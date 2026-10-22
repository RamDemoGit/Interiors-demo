import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/clientele",
    "/testimonials",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
    "/disclaimer",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified,
      priority: 0.6,
    })),
  ];
}
