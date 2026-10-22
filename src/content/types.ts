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

export type Faq = {
  id: string;
  question: string;
  answer: string;
  /** Service slugs this FAQ belongs to, for related-FAQ blocks. */
  services?: string[];
};

export type AreaPage = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Unique, area-specific body sections (min. 450 words in total). */
  sections: { heading: string; body: string[] }[];
  /** Project slugs from the nearby locations. */
  relatedProjects: string[];
  relatedServices: string[];
  faqs: { question: string; answer: string }[];
};

export type NavItem = { label: string; href: string };

/** Enquiry lead as persisted by a `LeadStore` (implemented in Phase 6). */
export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  location?: string;
  message: string;
  consent: { given: boolean; text: string; timestamp: string };
  meta: { ip: string; userAgent?: string; sourcePath?: string };
};
