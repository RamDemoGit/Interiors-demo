import { siteConfig, verifiedContact } from "@/config/site";

/**
 * One place that decides where the Call / Book / WhatsApp actions go.
 *
 * Numbers come ONLY from `config/site.ts` (verified values). While a number is
 * unverified the action falls back to the enquiry form so no button ever
 * points at an invented number.
 */
export const ENQUIRY_ANCHOR = "/contact#enquiry";

export type ContactAction = {
  key: "call" | "book" | "whatsapp";
  label: string;
  href: string;
  /** True when href is a tel:/wa.me link (opens outside the site). */
  external: boolean;
  /** True when this action is using the form fallback (number not verified). */
  fallback: boolean;
};

export const contactActions: ContactAction[] = [
  verifiedContact.phone
    ? {
        key: "call",
        label: "Call",
        href: `tel:${verifiedContact.phone.tel}`,
        external: true,
        fallback: false,
      }
    : {
        key: "call",
        label: "Call",
        href: ENQUIRY_ANCHOR,
        external: false,
        fallback: true,
      },
  {
    key: "book",
    label: "Book Us",
    href: ENQUIRY_ANCHOR,
    external: false,
    fallback: false,
  },
  verifiedContact.whatsappUrl
    ? {
        key: "whatsapp",
        label: "WhatsApp",
        href: `${verifiedContact.whatsappUrl}?text=${encodeURIComponent(
          `Hello ${siteConfig.name}, I would like to discuss a project.`,
        )}`,
        external: true,
        fallback: false,
      }
    : {
        key: "whatsapp",
        label: "WhatsApp",
        href: ENQUIRY_ANCHOR,
        external: false,
        fallback: true,
      },
];
