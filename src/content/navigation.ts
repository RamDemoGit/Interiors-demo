import { serviceNavLinks } from "./services";
import type { NavItem } from "./types";

/** Primary navigation, in the order required by the brief. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Clientele", href: "/clientele" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

/** Service links for the footer (derived from `services.ts`). */
export const serviceLinks: NavItem[] = serviceNavLinks;

export const footerExploreLinks: NavItem[] = [...mainNav, { label: "FAQ", href: "/faq" }];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];
