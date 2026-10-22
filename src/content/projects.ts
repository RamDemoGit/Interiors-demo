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
    slug: "saidapet-residence-interior",
    title: "Saidapet Residence Interior",
    location: "Saidapet",
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
    slug: "velachery-residence-interior",
    title: "Velachery Residence Interior",
    location: "Velachery",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 1700,
    pdfPages: "8-9",
    status: "photograph",
    relatedServices: RESIDENTIAL,
    image: "dining",
    featured: true,
  },
  {
    slug: "urapakkam-residence-interior",
    title: "Urapakkam Residence Interior",
    location: "Urapakkam",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 2400,
    pdfPages: "11-12",
    status: "photograph",
    relatedServices: RESIDENTIAL,
    image: "hero",
    featured: true,
  },
  {
    slug: "perumbakkam-school-interior",
    title: "Perumbakkam School Interior",
    location: "Perumbakkam",
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
    slug: "omr-navalur-hotel-concept",
    title: "OMR-Navalur Hotel Concept",
    location: "OMR-Navalur",
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
    slug: "ecr-residence-concept",
    title: "ECR Residence Concept",
    location: "ECR",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 2200,
    pdfPages: "20-21",
    status: "visualization",
    relatedServices: RESIDENTIAL,
    image: "compact",
  },
  {
    slug: "t-nagar-urban-oasis-proposal",
    title: "T. Nagar Urban Oasis Proposal",
    location: "T. Nagar",
    category: "Public space",
    filterTags: ["architecture-concepts"],
    areaSqFt: 4500,
    pdfPages: "23-24",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "compact",
  },
  {
    slug: "coimbatore-cafe-concept",
    title: "Coimbatore Café Concept",
    location: "Coimbatore",
    category: "Café",
    filterTags: ["hospitality"],
    areaSqFt: 900,
    pdfPages: "26-27",
    status: "visualization",
    relatedServices: HOSPITALITY,
    image: "dining",
  },
  {
    slug: "rk-salai-boutique-interior",
    title: "R. K. Salai Boutique Interior",
    location: "R. K. Salai",
    category: "Retail",
    filterTags: ["commercial-retail"],
    areaSqFt: 1200,
    pdfPages: "29-30",
    status: "visualization",
    relatedServices: ["commercial-retail-interior-design"],
    image: "retail",
  },
  {
    slug: "trichy-residence-interior",
    title: "Trichy Residence Interior",
    location: "Trichy",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 5000,
    pdfPages: "32-34",
    status: "visualization",
    relatedServices: RESIDENTIAL,
    image: "bedroom",
  },
  {
    slug: "alandur-compact-residence-interior",
    title: "Alandur Compact Residence Interior",
    location: "Alandur",
    category: "Residential",
    filterTags: ["residential"],
    areaSqFt: 110,
    pdfPages: "36-37",
    status: "photograph",
    relatedServices: RESIDENTIAL,
    image: "detail",
    featured: true,
  },
  {
    slug: "bengaluru-office-lobby-concept",
    title: "Bengaluru Office Lobby Concept",
    location: "Bengaluru",
    category: "Office",
    filterTags: ["workplaces"],
    areaSqFt: 1400,
    pdfPages: "39-40",
    status: "visualization",
    relatedServices: OFFICE,
    image: "office",
  },
  {
    slug: "t-nagar-bedroom-transformation",
    title: "T. Nagar Bedroom Transformation",
    location: "T. Nagar",
    category: "Residential / Renovation",
    filterTags: ["residential", "renovation"],
    areaSqFt: 150,
    pdfPages: "42-43",
    status: "visualization",
    relatedServices: ["renovation-interior-transformation", ...RESIDENTIAL],
    image: "bedroom",
  },
  {
    slug: "cochin-mixed-use-building-concept",
    title: "Cochin Mixed-Use Building Concept",
    location: "Cochin",
    category: "Architecture",
    filterTags: ["architecture-concepts"],
    areaSqFt: 4000,
    pdfPages: "45",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "compact",
  },
  {
    slug: "kilpauk-cafe-concept",
    title: "Kilpauk Café Concept",
    location: "Kilpauk",
    category: "Café",
    filterTags: ["hospitality"],
    areaSqFt: 2000,
    pdfPages: "47",
    status: "visualization",
    relatedServices: HOSPITALITY,
    image: "hero",
  },
  {
    slug: "tambaram-spa-concept",
    title: "Tambaram Spa Concept",
    location: "Tambaram",
    category: "Hospitality / Spa",
    filterTags: ["hospitality"],
    areaSqFt: 1600,
    pdfPages: "49",
    status: "visualization",
    relatedServices: HOSPITALITY,
    image: "hotel",
  },
  {
    slug: "adambakkam-office-interior",
    title: "Adambakkam Office Interior",
    location: "Adambakkam",
    category: "Office",
    filterTags: ["workplaces"],
    areaSqFt: 200,
    pdfPages: "51",
    status: "visualization",
    relatedServices: OFFICE,
    image: "office",
  },
  {
    slug: "salem-mixed-use-building-concept",
    title: "Salem Mixed-Use Building Concept",
    location: "Salem",
    category: "Architecture",
    filterTags: ["architecture-concepts"],
    areaSqFt: 2500,
    pdfPages: "53",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "hotel",
  },
  {
    slug: "pallikaranai-residence-concept",
    title: "Pallikaranai Residence Concept",
    location: "Pallikaranai",
    category: "Architecture",
    filterTags: ["architecture-concepts"],
    areaSqFt: 10400,
    pdfPages: "55",
    status: "visualization",
    relatedServices: ARCHITECTURE,
    image: "living",
  },
];

export const projects: Project[] = seeds.map(({ image, ...seed }) => ({
  ...seed,
  overview: "",
  designFocus: "",
  galleryCopy: "",
  images: [referenceImages[image]],
}));

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectFilters: { value: ProjectFilter | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial-retail", label: "Commercial & Retail" },
  { value: "workplaces", label: "Workplaces" },
  { value: "hospitality", label: "Hospitality" },
  { value: "institutional", label: "Institutional" },
  { value: "architecture-concepts", label: "Architecture & Concepts" },
  { value: "renovation", label: "Renovation" },
];

export const statusLabel: Record<ProjectStatus, string> = {
  photograph: "Photograph",
  visualization: "Design visualization",
};
