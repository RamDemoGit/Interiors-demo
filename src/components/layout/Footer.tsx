import Link from "next/link";
import { footerExploreLinks, legalLinks, serviceLinks } from "@/content/navigation";
import { CookieSettingsButton } from "./ConsentManager";
import { siteConfig, socialLinks, verifiedContact } from "@/config/site";
import { Logo } from "./Logo";

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
};

const linkClass =
  "link-underline text-taupe-deep hover:text-espresso inline-flex min-h-9 items-center text-[0.9375rem] transition-colors";

/**
 * Footer links to every page (internal-linking requirement). Phone, full
 * address, hours and socials render only when verified in `config/site.ts`.
 * Final footer copy is applied from the content master in Phase 2/3.
 */
export function Footer() {
  const { address } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sand">
      <div className="container-site grid gap-12 py-14 sm:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="font-heading mt-6 max-w-xs text-2xl leading-snug">
            {siteConfig.tagline}
          </p>
          <p className="text-taupe-deep mt-3 text-sm">
            Founded by {siteConfig.founder} &middot; Established {siteConfig.established}
          </p>
        </div>

        <nav aria-label="Footer pages" className="lg:col-span-2">
          <h2 className="eyebrow font-body mb-4 !text-xs">Explore</h2>
          <ul>
            {footerExploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services" className="lg:col-span-3">
          <h2 className="eyebrow font-body mb-4 !text-xs">Services</h2>
          <ul>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow font-body mb-4 !text-xs">Contact</h2>
          <address className="text-taupe-deep space-y-2 text-[0.9375rem] not-italic">
            <p>
              {verifiedContact.streetAddress ? `${verifiedContact.streetAddress}, ` : ""}
              {address.locality}, {address.city}
              {verifiedContact.postalCode ? ` ${verifiedContact.postalCode}` : ""}
            </p>
            <p>
              <a
                href={`mailto:${verifiedContact.email}`}
                className="link-underline hover:text-espresso break-all"
              >
                {verifiedContact.email}
              </a>
            </p>
            {verifiedContact.phone && (
              <p>
                <a href={`tel:${verifiedContact.phone.tel}`} className="link-underline">
                  {verifiedContact.phone.display}
                </a>
              </p>
            )}
            {verifiedContact.officeHours && <p>{verifiedContact.officeHours}</p>}
          </address>
          {socialLinks.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
              {socialLinks.map(({ network, url }) => (
                <li key={network}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-taupe-deep text-sm"
                  >
                    {SOCIAL_LABELS[network] ?? network}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-line border-t">
        <div className="container-site text-taupe-deep flex flex-col gap-4 pt-6 pb-24 text-sm lg:flex-row lg:items-center lg:justify-between lg:pb-6">
          <p>
            &copy; {year} {siteConfig.legalName}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline hover:text-espresso inline-flex min-h-9 items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="link-underline hover:text-espresso inline-flex min-h-9 items-center" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
