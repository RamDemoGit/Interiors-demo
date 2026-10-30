import type { NavItem } from "./types";
import type { ReferenceKey } from "./images";

/**
 * The 8 services (fixed by the brief), ordered commercial-first because about
 * 75% of the practice's work is commercial and about 25% is homes.
 */
export type ServiceSegment = "commercial" | "homes" | "both";

export type ServiceSummary = {
  slug: string;
  name: string;
  /** Which side of the practice the service mainly belongs to. */
  segment: ServiceSegment;
  /** Reference image used on cards until real project imagery is supplied. */
  image: ReferenceKey;
};

export const segmentLabel: Record<ServiceSegment, string> = {
  commercial: "Commercial",
  homes: "Homes",
  both: "Commercial & Homes",
};

export const services: ServiceSummary[] = [
  {
    slug: "commercial-retail-interior-design",
    name: "Commercial & Retail Interior Design",
    segment: "commercial",
    image: "showroom",
  },
  {
    slug: "office-workplace-interiors",
    name: "Office & Workplace Interiors",
    segment: "commercial",
    image: "office",
  },
  {
    slug: "hospitality-cafe-leisure-spaces",
    name: "Hospitality, Café & Leisure Spaces",
    segment: "commercial",
    image: "restaurant",
  },
  {
    slug: "educational-institutional-interiors",
    name: "Educational & Institutional Interiors",
    segment: "commercial",
    image: "institution",
  },
  {
    slug: "architectural-design-spatial-concepts",
    name: "Architectural Design & Spatial Concepts",
    segment: "both",
    image: "architectureConcept",
  },
  {
    slug: "residential-interior-design",
    name: "Residential Interior Design",
    segment: "homes",
    image: "residentialHome",
  },
  {
    slug: "renovation-interior-transformation",
    name: "Renovation & Interior Transformation",
    segment: "both",
    image: "renovation",
  },
  {
    slug: "custom-interior-details-material-concepts",
    name: "Custom Interior Details & Material Concepts",
    segment: "both",
    image: "customDetails",
  },
];

export const serviceNavLinks: NavItem[] = services.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
