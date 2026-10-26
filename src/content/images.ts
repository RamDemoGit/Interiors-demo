import type { ProjectImage } from "./types";

/**
 * Reference interior imagery (royalty-free stock, public/reference/).
 *
 * These are NOT Lahima In-Des projects. They exist so the layout can be
 * reviewed with realistic imagery. Replace with real portfolio exports
 * (see public/projects/<slug>/README.md) before launch. While
 * `featureFlags.showReferenceBadges` is true every such image carries a
 * visible "Reference image" chip so it can never pass as a completed project.
 */
export type ReferenceKey =
  | "living"
  | "hero"
  | "dining"
  | "detail"
  | "bedroom"
  | "compact"
  | "hotel"
  | "office"
  | "school"
  | "retail"
  | "kitchen"
  | "pooja"
  | "flooring"
  | "windows"
  | "improvement";

export const referenceImages: Record<ReferenceKey, ProjectImage> = {
  living: {
    src: "/reference/living.jpg",
    alt: "Bright living room with a tan leather sofa, white lounge chairs and a framed photo wall",
    width: 1800,
    height: 1350,
  },
  hero: {
    src: "/reference/hero.jpg",
    alt: "Wide living space with a grey sofa, timber coffee table and tall windows",
    width: 1800,
    height: 949,
  },
  dining: {
    src: "/reference/dining.jpg",
    alt: "Dining area with green velvet chairs, a round mirror and a pendant light",
    width: 1800,
    height: 1013,
  },
  detail: {
    src: "/reference/detail.jpg",
    alt: "Entry nook with a timber plank ceiling, round mirror, rattan sideboard and herringbone floor",
    width: 1800,
    height: 3200,
  },
  bedroom: {
    src: "/reference/bedroom.jpg",
    alt: "Bedroom with a channelled upholstered bed, brass pendant light and floor-length curtains",
    width: 1800,
    height: 1800,
  },
  compact: {
    src: "/reference/compact.jpg",
    alt: "Open-plan apartment interior with corner windows, armchairs and a dining area",
    width: 1800,
    height: 1200,
  },
  hotel: {
    src: "/reference/hotel.jpg",
    alt: "Timber resort building with a pool deck and cushioned loungers at dusk",
    width: 1800,
    height: 1200,
  },
  office: {
    src: "/reference/office.jpg",
    alt: "Open office floor with glazed partitions, a timber shelving unit and pendant lights",
    width: 1800,
    height: 1202,
  },
  school: {
    src: "/reference/school.jpg",
    alt: "Classroom with timber and metal desks, chairs and a green board",
    width: 1800,
    height: 1013,
  },
  retail: {
    src: "/reference/retail.jpg",
    alt: "Minimal boutique interior with oak display shelves, a clothing rail and track lighting",
    width: 1024,
    height: 768,
  },
  kitchen: {
    src: "/reference/room-kitchen.jpg",
    alt: "Modular kitchen with ivory and walnut cabinets, quartz counters and glass pendant lights",
    width: 1024,
    height: 768,
  },
  pooja: {
    src: "/reference/room-pooja.jpg",
    alt: "Carved teak pooja unit with brass lamps and a backlit marble panel",
    width: 1024,
    height: 768,
  },
  flooring: {
    src: "/reference/room-flooring.jpg",
    alt: "Living room with wide plank natural oak flooring and tall windows",
    width: 1024,
    height: 768,
  },
  windows: {
    src: "/reference/room-windows.jpg",
    alt: "Window dressed with layered sheer and linen curtains beside an armchair",
    width: 1024,
    height: 768,
  },
  improvement: {
    src: "/reference/room-improvement.jpg",
    alt: "Living room with a false ceiling, cove lighting, chandelier and textured feature wall",
    width: 1024,
    height: 768,
  },
};
