import type { ReferenceKey } from "./images";

/**
 * Room-by-room interior scope (residential interior design). Items list the
 * kinds of work covered. No counts, prices or timelines are stated.
 */
export type ScopeItem = { title: string; items: string[]; image: ReferenceKey };

export const interiorScope: ScopeItem[] = [
  {
    title: "Modular Kitchen",
    image: "kitchen",
    items: ["Cabinets", "Countertops", "Accessories", "Appliances"],
  },
  {
    title: "Bedroom Interiors",
    image: "bedroom",
    items: ["Wardrobes", "Wardrobe accessories", "Cots & back panels", "Dressing units"],
  },
  {
    title: "Living Room",
    image: "living",
    items: ["TV units", "Designer partitions", "Feature walls"],
  },
  {
    title: "Pooja Room",
    image: "pooja",
    items: ["Modern pooja units", "Traditional pooja units"],
  },
  {
    title: "Dining",
    image: "dining",
    items: ["Crockery storage", "Dining tables & chairs"],
  },
  {
    title: "Home Improvement",
    image: "improvement",
    items: ["False ceilings", "Painting", "Lighting", "Wallpaper", "Wall d\u00e9cor"],
  },
  {
    title: "Flooring",
    image: "flooring",
    items: ["Solid wood", "Laminate", "Deck wood"],
  },
  {
    title: "Windows",
    image: "windows",
    items: ["Curtains", "Blinds", "Mosquito nets", "Curtain rods"],
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
