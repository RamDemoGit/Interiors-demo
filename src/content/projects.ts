import { referenceImages, type ReferenceKey } from "./images";
import type { Project, ProjectFilter, ProjectStatus } from "./types";

/**
 * 19 portfolio projects. Facts (title, location, type, area, PDF pages, image
 * status) come from the brief. `overview`, `designFocus` and `galleryCopy` are
 * filled from the content master in Phase 2 (empty strings render nothing).
 *
 * `images` currently point at reference stock imagery. Swap to
 * `/projects/<slug>/01.jpg` etc. once real exports exist.
 */
type Seed = {
  slug: string;
  title: string;
  location: string;
  category: string;
  filterTags: ProjectFilter[];
  areaSqFt: number;
  pdfPages: string;
  status: ProjectStatus;
  relatedServices: string[];
  image: ReferenceKey;
  featured?: boolean;
};

const RESIDENTIAL = ["residential-interior-design"];
const HOSPITALITY = ["hospitality-cafe-leisure-spaces"];
const OFFICE = ["office-workplace-interiors"];
const ARCHITECTURE = ["architectural-design-spatial-concepts"];

const seeds: Seed[] = [
  {
    slug: "1200-sq-ft-residence-interior",
    title: "1,200 sq ft Residence Interior",
    location: "Chennai",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 1200,
    pdfPages: "5-6",
    status: "photograph",
    relatedServices: RESIDENTIAL,
    image: "living",
    featured: true,
  },
  {
    slug: "1700-sq-ft-residence-interior",
    title: "1,700 sq ft Residence Interior",
    location: "Chennai",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 1700,
    pdfPages: "8-9",
    status: "photograph",
    relatedServices: RESIDENTIAL,
    image: "dining",
  },
  {
    slug: "2400-sq-ft-residence-interior",
    title: "2,400 sq ft Residence Interior",
    location: "Chennai",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 2400,
    pdfPages: "11-12",
    status: "photograph",
    relatedServices: RESIDENTIAL,
    image: "hero",
  },
  {
    slug: "school-interior",
    title: "School Interior",
    location: "Chennai",
    category: "Institution",
    filterTags: ["institutional"],
    areaSqFt: 5000,
    pdfPages: "14-15",
    status: "photograph",
    relatedServices: ["educational-institutional-interiors"],
    image: "school",
    featured: true,
  },
  {
    slug: "hotel-concept",
    title: "Hotel Concept",
    location: "Chennai",
    category: "Hospitality",
    filterTags: ["hospitality"],
    areaSqFt: 8000,
    pdfPages: "17-18",
    status: "visualization",
    relatedServices: HOSPITALITY,
    image: "hotel",
    featured: true,
  },
  {
    slug: "2200-sq-ft-residence-concept",
    title: "2,200 sq ft Residence Concept",
    location: "Chennai",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 2200,
    pdfPages: "20-21",
    status: "visualization",
    relatedServices: RESIDENTIAL,
    image: "villaEcr",
  },
  {
    slug: "urban-oasis-proposal",
    title: "Urban Oasis Proposal",
    location: "Chennai",
    category: "Public space",
    filterTags: ["architecture-concepts"],
    areaSqFt: 4500,
    pdfPages: "23-24",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "urbanOasis",
  },
  {
    slug: "900-sq-ft-cafe-concept",
    featured: true,
    title: "900 sq ft Café Concept",
    location: "South India",
    category: "Café",
    filterTags: ["hospitality"],
    areaSqFt: 900,
    pdfPages: "26-27",
    status: "visualization",
    relatedServices: HOSPITALITY,
    image: "cafeCoimbatore",
  },
  {
    slug: "boutique-interior",
    featured: true,
    title: "Boutique Interior",
    location: "Chennai",
    category: "Retail",
    filterTags: ["commercial-retail"],
    areaSqFt: 1200,
    pdfPages: "29-30",
    status: "visualization",
    relatedServices: ["commercial-retail-interior-design"],
    image: "retail",
  },
  {
    slug: "5000-sq-ft-residence-interior",
    title: "5,000 sq ft Residence Interior",
    location: "South India",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 5000,
    pdfPages: "32-34",
    status: "visualization",
    relatedServices: RESIDENTIAL,
    image: "bedroom",
  },
  {
    slug: "compact-residence-interior",
    title: "Compact Residence Interior",
    location: "Chennai",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 110,
    pdfPages: "36-37",
    status: "photograph",
    relatedServices: RESIDENTIAL,
    image: "compact",
  },
  {
    slug: "office-lobby-concept",
    title: "Office Lobby Concept",
    location: "Bengaluru",
    category: "Office",
    filterTags: ["workplaces"],
    areaSqFt: 1400,
    pdfPages: "39-40",
    status: "visualization",
    relatedServices: OFFICE,
    image: "officeLobby",
  },
  {
    slug: "bedroom-transformation",
    title: "Bedroom Transformation",
    location: "Chennai",
    category: "Residential / Renovation",
    filterTags: ["residential", "renovation"],
    areaSqFt: 150,
    pdfPages: "42-43",
    status: "visualization",
    relatedServices: ["renovation-interior-transformation", ...RESIDENTIAL],
    image: "roomBedroom",
  },
  {
    slug: "4000-sq-ft-mixed-use-building-concept",
    title: "4,000 sq ft Mixed-Use Building Concept",
    location: "South India",
    category: "Architecture",
    filterTags: ["architecture-concepts"],
    areaSqFt: 4000,
    pdfPages: "45",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "mixedUseCochin",
  },
  {
    slug: "2000-sq-ft-cafe-concept",
    title: "2,000 sq ft Café Concept",
    location: "Chennai",
    category: "Café",
    filterTags: ["hospitality"],
    areaSqFt: 2000,
    pdfPages: "47",
    status: "visualization",
    relatedServices: HOSPITALITY,
    image: "cafeKilpauk",
  },
  {
    slug: "spa-concept",
    title: "Spa Concept",
    location: "Chennai",
    category: "Hospitality / Spa",
    filterTags: ["hospitality"],
    areaSqFt: 1600,
    pdfPages: "49",
    status: "visualization",
    relatedServices: HOSPITALITY,
    image: "spa",
  },
  {
    slug: "office-interior",
    featured: true,
    title: "Office Interior",
    location: "Chennai",
    category: "Office",
    filterTags: ["workplaces"],
    areaSqFt: 200,
    pdfPages: "51",
    status: "visualization",
    relatedServices: OFFICE,
    image: "workspace",
  },
  {
    slug: "2500-sq-ft-mixed-use-building-concept",
    title: "2,500 sq ft Mixed-Use Building Concept",
    location: "South India",
    category: "Architecture",
    filterTags: ["architecture-concepts"],
    areaSqFt: 2500,
    pdfPages: "53",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "mixedUseSalem",
  },
  {
    slug: "10400-sq-ft-residence-concept",
    title: "10,400 sq ft Residence Concept",
    location: "Chennai",
    category: "Architecture",
    filterTags: ["architecture-concepts"],
    areaSqFt: 10400,
    pdfPages: "55",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "residenceConcept",
  },
];

/** Commercial work leads every list; purely residential projects follow. */
const isResidential = (p: { filterTags: ProjectFilter[] }) =>
  p.filterTags.includes("residential") ? 1 : 0;

/**
 * Every project shows exactly three images: its main image plus the two
 * below. Projects whose imagery is a photograph only use photographic extras.
 */
const galleryExtras: Record<string, [ReferenceKey, ReferenceKey]> = {
  "1200-sq-ft-residence-interior": ["roomLiving", "kitchen"],
  "1700-sq-ft-residence-interior": ["roomDining", "residentialHome"],
  "2400-sq-ft-residence-interior": ["pooja", "flooring"],
  "school-interior": ["institution", "windows"],
  "hotel-concept": ["hotelLobby", "ceilingHospitality"],
  "2200-sq-ft-residence-concept": ["ceilingLiving", "improvement"],
  "urban-oasis-proposal": ["architectureConcept", "elevation"],
  "900-sq-ft-cafe-concept": ["restaurant", "customDetails"],
  "boutique-interior": ["showroom", "epoxyFloor"],
  "5000-sq-ft-residence-interior": ["roomBedroom", "windows"],
  "compact-residence-interior": ["renovation", "windows"],
  "office-lobby-concept": ["ceilingOffice", "hvac"],
  "bedroom-transformation": ["renovation", "improvement"],
  "4000-sq-ft-mixed-use-building-concept": ["elevation", "glassFitting"],
  "2000-sq-ft-cafe-concept": ["ceilingHospitality", "spa"],
  "spa-concept": ["customDetails", "hotelLobby"],
  "office-interior": ["boardroom", "corporateFloor"],
  "2500-sq-ft-mixed-use-building-concept": ["architectureConcept", "urbanOasis"],
  "10400-sq-ft-residence-concept": ["villaEcr", "architectureConcept"],
};

export const projects: Project[] = seeds
  .map(({ image, ...seed }) => ({
    ...seed,
    overview: "",
    designFocus: "",
    galleryCopy: "",
    images: [image, ...(galleryExtras[seed.slug] ?? [])].map((key) => referenceImages[key]),
  }))
  .sort((a, b) => isResidential(a) - isResidential(b));

export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Every non-residential project: retail, workplaces, hospitality,
 * institutional and architectural / mixed-use concepts.
 */
export const commercialProjects = projects.filter(
  (p) => !p.filterTags.includes("residential") && !p.slug.includes("residence"),
);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectFilters: { value: ProjectFilter | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "commercial-retail", label: "Commercial & Retail" },
  { value: "workplaces", label: "Workplaces" },
  { value: "hospitality", label: "Hospitality" },
  { value: "institutional", label: "Institutional" },
  { value: "architecture-concepts", label: "Architecture & Concepts" },
  { value: "residential", label: "Residential" },
  { value: "renovation", label: "Renovation" },
];

export const statusLabel: Record<ProjectStatus, string> = {
  photograph: "Photograph",
  visualization: "Design visualization",
};
