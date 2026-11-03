import type { ProjectImage } from "./types";

/**
 * Room-by-room interior scope (residential interior design). Each room lists
 * the kinds of work covered; every item has its own illustrative image, shown
 * when its badge is chosen. No counts, prices or timelines are stated.
 * All of these are AI-generated design visualizations, not completed projects.
 */
export type ScopeEntry = { label: string; image: ProjectImage };
export type ScopeItem = { title: string; items: ScopeEntry[] };

const pic = (file: string, alt: string): ProjectImage => ({
  src: `/reference/scope/${file}.jpg`,
  alt: `${alt} (design visualization)`,
  width: 1024,
  height: 768,
});

export const interiorScope: ScopeItem[] = [
  {
    title: "Modular Kitchen",
    items: [
      {
        label: "Cabinets",
        image: pic(
          "scope-kitchen-cabinets",
          "Modular kitchen cabinets in matte ivory and walnut with an open niche and under-cabinet lighting",
        ),
      },
      {
        label: "Countertops",
        image: pic(
          "scope-kitchen-countertops",
          "White veined quartz kitchen countertop with an undermount sink and brushed steel tap",
        ),
      },
      {
        label: "Accessories",
        image: pic(
          "scope-kitchen-accessories",
          "Kitchen accessories: cutlery tray, pull-out pantry shelves, corner carousel and organised drawers",
        ),
      },
      {
        label: "Appliances",
        image: pic(
          "scope-kitchen-appliances",
          "Built-in oven, microwave, induction hob and chimney hood set into kitchen cabinetry",
        ),
      },
    ],
  },
  {
    title: "Bedroom Interiors",
    items: [
      {
        label: "Wardrobes",
        image: pic(
          "scope-bedroom-wardrobes",
          "Full-height bedroom wardrobe with fluted walnut and ivory sliding doors",
        ),
      },
      {
        label: "Wardrobe accessories",
        image: pic(
          "scope-bedroom-wardrobe-accessories",
          "Wardrobe interior with tie and belt racks, shoe shelves, hanging rails and lined jewellery drawers",
        ),
      },
      {
        label: "Cots & back panels",
        image: pic(
          "scope-bedroom-cot",
          "Storage cot with a tall channel-stitched upholstered back panel and timber wall panelling",
        ),
      },
      {
        label: "Dressing units",
        image: pic(
          "scope-bedroom-dressing",
          "Wall-mounted dressing unit with a backlit mirror, drawers and a cushioned stool",
        ),
      },
    ],
  },
  {
    title: "Living Room",
    items: [
      {
        label: "TV units",
        image: pic(
          "scope-living-tv",
          "Floating walnut TV unit with a wall-mounted screen and backlit open shelves",
        ),
      },
      {
        label: "Designer partitions",
        image: pic(
          "scope-living-partition",
          "Slatted timber and brass partition screen dividing living and dining areas",
        ),
      },
      {
        label: "Feature walls",
        image: pic(
          "scope-living-feature-wall",
          "Living room feature wall in textured stone and fluted timber with wall-wash lighting",
        ),
      },
    ],
  },
  {
    title: "Pooja Room",
    items: [
      {
        label: "Modern pooja units",
        image: pic(
          "scope-pooja-modern",
          "Modern wall-mounted pooja unit in white and light wood with a backlit panel and brass lamp",
        ),
      },
      {
        label: "Traditional pooja units",
        image: pic(
          "scope-pooja-traditional",
          "Traditional carved teak pooja unit with an ornate arch, pillars and brass lamps",
        ),
      },
    ],
  },
  {
    title: "Dining",
    items: [
      {
        label: "Crockery storage",
        image: pic(
          "scope-dining-crockery",
          "Glass-fronted crockery unit with internal lighting and neatly arranged tableware",
        ),
      },
      {
        label: "Dining tables & chairs",
        image: pic(
          "scope-dining-table",
          "Solid wood dining table with upholstered chairs under a pendant light",
        ),
      },
    ],
  },
  {
    title: "Home Improvement",
    items: [
      {
        label: "False ceilings",
        image: pic(
          "scope-improve-false-ceiling",
          "Layered false ceiling with cove lighting and recessed spotlights",
        ),
      },
      {
        label: "Painting",
        image: pic(
          "scope-improve-painting",
          "Two-tone sage green and ivory painted wall with a roller and paint tin",
        ),
      },
      {
        label: "Lighting",
        image: pic(
          "scope-improve-lighting",
          "Living room lit by a brass pendant, wall sconces and table lamps",
        ),
      },
      {
        label: "Wallpaper",
        image: pic(
          "scope-improve-wallpaper",
          "Botanical wallpaper feature wall behind an upholstered bed",
        ),
      },
      {
        label: "Wall d\u00e9cor",
        image: pic(
          "scope-improve-wall-decor",
          "Gallery wall of framed prints and a round brass mirror above a console table",
        ),
      },
    ],
  },
  {
    title: "Flooring",
    items: [
      {
        label: "Solid wood",
        image: pic(
          "scope-floor-solid-wood",
          "Wide-plank solid wood flooring in a living room",
        ),
      },
      {
        label: "Laminate",
        image: pic(
          "scope-floor-laminate",
          "Grey-beige laminate plank flooring in a bedroom",
        ),
      },
      {
        label: "Deck wood",
        image: pic(
          "scope-floor-deck-wood",
          "Teak-coloured deck wood flooring on a balcony terrace",
        ),
      },
    ],
  },
  {
    title: "Windows",
    items: [
      {
        label: "Curtains",
        image: pic(
          "scope-window-curtains",
          "Full-length ivory linen curtains over a sheer layer at a living room window",
        ),
      },
      {
        label: "Blinds",
        image: pic(
          "scope-window-blinds",
          "Roller blind and wooden venetian blind on two windows",
        ),
      },
      {
        label: "Mosquito nets",
        image: pic(
          "scope-window-mosquito-net",
          "Fine mesh mosquito net fitted in a window frame",
        ),
      },
      {
        label: "Curtain rods",
        image: pic(
          "scope-window-curtain-rods",
          "Brushed brass curtain rod with finials and rings holding linen curtains",
        ),
      },
    ],
  },
];
export const consultancyPoints: { title: string; body: string }[] = [
  { title: "Space planning", body: "Layouts that fit how you use each room." },
  { title: "3D design visualization", body: "See the design before work begins." },
  {
    title: "Flooring & ceiling options",
    body: "Finishes compared for look, feel and upkeep.",
  },
  {
    title: "Paint, wallpaper & curtains",
    body: "Colour and material ideas that work together.",
  },
  {
    title: "Furniture design",
    body: "Kitchens, bedrooms, dining and TV units designed to suit.",
  },
  { title: "Budget guidance", body: "Advice on where to invest and where to save." },
  { title: "Bill of quantities", body: "A clear itemised list of what a project needs." },
];
