import type { NavItem } from "./types";
import type { ReferenceKey } from "./images";

/**
 * The services, ordered commercial-first because most of the practice's work
 * is commercial. The original eight come from the brief; furniture, elevation,
 * glass fitting, epoxy flooring and HVAC were added by the owner.
 */
export type ServiceSegment = "commercial" | "homes" | "both";

export type ServiceSummary = {
  slug: string;
  name: string;
  /** Which side of the practice the service mainly belongs to. */
  segment: ServiceSegment;
  /** Reference image used on cards until real project imagery is supplied. */
  image: ReferenceKey;
  /** Three images shown on the service page. */
  gallery: [ReferenceKey, ReferenceKey, ReferenceKey];
  /** Short plain-language description (shown on the service page). */
  summary?: string;
  /** What the service covers, shown as cards on the service page. */
  includes?: string[];
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
    gallery: ["showroom", "retail", "glassStorefront"],
  },
  {
    slug: "office-workplace-interiors",
    name: "Office & Workplace Interiors",
    segment: "commercial",
    image: "office",
    gallery: ["office", "corporateFloor", "boardroom"],
  },
  {
    slug: "hospitality-cafe-leisure-spaces",
    name: "Hospitality, Café & Leisure Spaces",
    segment: "commercial",
    image: "restaurant",
    gallery: ["restaurant", "hotelLobby", "spa"],
  },
  {
    slug: "educational-institutional-interiors",
    name: "Educational & Institutional Interiors",
    segment: "commercial",
    image: "institution",
    gallery: ["institution", "school", "instCorridor"],
  },
  {
    slug: "architectural-design-spatial-concepts",
    name: "Architectural Design & Spatial Concepts",
    segment: "both",
    image: "architectureConcept",
    gallery: ["architectureConcept", "mixedUseSalem", "residenceConcept"],
  },
  {
    slug: "residential-interior-design",
    name: "Residential Interior Design",
    segment: "homes",
    image: "residentialHome",
    gallery: ["residentialHome", "roomLiving", "roomBedroom"],
  },
  {
    slug: "renovation-interior-transformation",
    name: "Renovation & Interior Transformation",
    segment: "both",
    image: "renovation",
    gallery: ["renovation", "improvement", "flooring"],
  },
  {
    slug: "custom-interior-details-material-concepts",
    name: "Custom Interior Details & Material Concepts",
    segment: "both",
    image: "customDetails",
    gallery: ["customDetails", "poojaModern", "kitchenCabinets"],
  },
  {
    slug: "customizable-furniture",
    name: "Customizable Furniture",
    segment: "both",
    image: "furnitureCustom",
    gallery: ["furnitureCustom", "wardrobeUnit", "tvUnit"],
    summary:
      "Furniture designed and made to suit the space and the way it is used, for homes and commercial interiors.",
    includes: [
      "Wardrobes and storage units",
      "TV units and display units",
      "Study desks and workstations",
      "Kitchen and dining furniture",
      "Reception desks and counters",
      "Finish, size and layout chosen to suit you",
    ],
  },
  {
    slug: "elevation-design",
    name: "Elevation Design",
    segment: "both",
    image: "elevation",
    gallery: ["elevation", "mixedUseCochin", "villaEcr"],
    summary:
      "Front and exterior elevations for commercial buildings and homes, designed together with the interior.",
    includes: [
      "Facade concepts and massing",
      "Cladding and material options",
      "Glazing, fins and screens",
      "Entrance and canopy design",
      "Lighting for the elevation",
    ],
  },
  {
    slug: "glass-fitting",
    name: "Glass Fitting",
    segment: "commercial",
    image: "glassFitting",
    gallery: ["glassFitting", "glassStorefront", "glassRailing"],
    summary:
      "Glass for partitions, doors and glazed fronts, fitted neatly to the design of the space.",
    includes: [
      "Glass partitions",
      "Glass doors and fittings",
      "Storefront and facade glazing",
      "Frameless and framed options",
      "Railings and balustrades",
    ],
  },
  {
    slug: "epoxy-flooring",
    name: "Epoxy Flooring",
    segment: "commercial",
    image: "epoxyFloor",
    gallery: ["epoxyFloor", "epoxyWorkshop", "epoxyCorridor"],
    summary:
      "Seamless epoxy floors for showrooms, offices, workshops and other commercial spaces.",
    includes: [
      "Seamless, joint-free flooring",
      "Coloured and glossy finishes",
      "Showroom and retail floors",
      "Workshop and utility floors",
      "Floor design planned with the layout",
    ],
  },
  {
    slug: "hvac-systems",
    name: "HVAC Systems",
    segment: "commercial",
    image: "hvac",
    gallery: ["hvac", "hvacCafe", "hvacHome"],
    summary:
      "Heating, ventilation and air-conditioning planned to work with the ceiling, layout and lighting.",
    includes: [
      "Ceiling cassette and ducted systems",
      "Diffuser and grille layout",
      "Ventilation and fresh-air planning",
      "Coordination with false ceilings and lights",
      "Layouts for offices, shops and homes",
    ],
  },
];

export const serviceNavLinks: NavItem[] = services.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
