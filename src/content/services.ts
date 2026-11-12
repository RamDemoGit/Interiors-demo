import type { NavItem } from "./types";
import type { ReferenceKey } from "./images";

/**
 * Services list (no duplicates). Commercial interiors first, then homes /
 * concepts, then specialty and trade services.
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
    slug: "elevation-works",
    name: "Elevation Works",
    segment: "both",
    image: "elevationWorksFacade",
    gallery: ["elevationWorksFacade", "elevationWorksStreet", "elevationWorksVilla"],
    summary:
      "Exterior elevation design and works for buildings and homes, from facade concepts to cladding, plaster and glazing.",
    includes: [
      "Facade concepts and massing",
      "Cladding, plaster and texture finishes",
      "Stone, tile and panel work",
      "Glazing, fins and screens",
      "Entrance, canopy and lighting coordination",
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
  {
    slug: "painting",
    name: "Painting Works",
    segment: "both",
    image: "paintingRoom",
    gallery: ["paintingRoom", "paintingWallpaper", "paintingDecor"],
    summary:
      "Interior and exterior painting planned with the finishes of the space, for homes and commercial interiors.",
    includes: [
      "Wall and ceiling painting",
      "Primer and putty preparation",
      "Emulsion, enamel and specialty finishes",
      "Feature walls and colour schemes",
      "Touch-up and final coat finishing",
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing Works",
    segment: "both",
    image: "plumbingBath",
    gallery: ["plumbingBath", "plumbingKitchen", "plumbingUtility"],
    summary:
      "Plumbing for bathrooms, kitchens and utility areas, coordinated with the interior layout.",
    includes: [
      "Bathroom and toilet plumbing",
      "Kitchen sink and utility lines",
      "Concealed and exposed pipework",
      "Fixtures and fittings coordination",
      "Testing before finishing work",
    ],
  },
  {
    slug: "electricals",
    name: "Electrical Works",
    segment: "both",
    image: "electricalBoard",
    gallery: ["electricalBoard", "electricalSwitches", "electricalLighting"],
    summary:
      "Electrical planning and fitting for points, boards and lighting, aligned with the interior design.",
    includes: [
      "Switchboards and distribution",
      "Points for lights, fans and sockets",
      "Conduit and wiring runs",
      "Coordination with false ceilings",
      "Layouts for homes and commercial spaces",
    ],
  },
  {
    slug: "civil-works",
    name: "Civil Works",
    segment: "both",
    image: "civilStructure",
    gallery: ["civilStructure", "civilMasonry", "civilSite"],
    summary:
      "Civil and structural finishing works that prepare the shell for interiors and elevations.",
    includes: [
      "Masonry and block work",
      "Plastering and levelling",
      "Flooring base preparation",
      "Minor alterations and openings",
      "Coordination with interiors and services",
    ],
  },
  {
    slug: "ceiling",
    name: "Ceiling Works",
    segment: "both",
    image: "ceilingTradeLiving",
    gallery: ["ceilingTradeLiving", "ceilingTradeOffice", "ceilingTradeHospitality"],
    summary:
      "False ceilings and ceiling finishes designed with lighting, air-conditioning and the room layout.",
    includes: [
      "Gypsum and grid false ceilings",
      "Cove and drop ceiling forms",
      "Timber and baffle ceilings",
      "Cut-outs for lights and HVAC",
      "Ceilings for homes, offices and hospitality",
    ],
  },
  {
    slug: "led-works",
    name: "LED Works",
    segment: "both",
    image: "ledFeature",
    gallery: ["ledCove", "ledLinear", "ledFeature"],
    summary:
      "LED lighting planned with the ceiling and interiors, for cove, linear and feature light.",
    includes: [
      "Cove and profile LED strips",
      "Linear and recessed LED fittings",
      "Feature and accent lighting",
      "Warm and cool light options",
      "Coordination with false ceilings and switches",
    ],
  },
];

export const serviceNavLinks: NavItem[] = services.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
