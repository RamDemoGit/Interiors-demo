/**
 * Content types. Data lives in typed TS files today; the shapes are kept
 * CMS-friendly (plain serialisable objects, slugs as ids, references by slug)
 * so a CMS can replace the files later without touching components.
 */

export type ProjectStatus = "photograph" | "visualization";

export type ProjectFilter =
  | "residential"
  | "commercial-retail"
  | "workplaces"
  | "hospitality"
  | "institutional"
  | "architecture-concepts"
  | "renovation";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  filterTags: ProjectFilter[];
  areaSqFt: number;
  pdfPages: string;
  status: ProjectStatus;
  overview: string;
  designFocus: string;
  galleryCopy: string;
  images: ProjectImage[];
  /** Service slugs. */
  relatedServices: string[];
  featured?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  whoFor: string[];
  designConsiderations: string[];
  /** Project slugs, from the master document's portfolio references. */
  relatedProjects: string[];
  /** FAQ ids. */
  relatedFaqs: string[];
};

export type NavItem = { label: string; href: string };
