import Image from "next/image";
import Link from "next/link";
import { siteConfig, socialLinks, verifiedContact } from "@/config/site";
import { footerExploreLinks, legalLinks, serviceLinks } from "@/content/navigation";
import { BackToTop } from "./BackToTop";
import { CookieSettingsButton } from "./ConsentManager";

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
};

const linkClass =
  "text-ivory/75 hover:text-bronze-light inline-flex min-h-8 items-center text-sm transition-colors";

const headingClass =
  "font-body text-bronze-light mb-2 text-[0.6875rem] font-semibold tracking-[0.2em] uppercase";

/**
 * Compact footer: brand, the pages, the services and the contact details in
 * one short block, then the legal line. Links to every page (internal-linking
 * requirement). Phone, full address, hours and socials render only when
 * verified in `config/site.ts`.
 */
export function Footer() {
  const { address } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-ivory border-ivory/10 relative isolate overflow-hidden border-t">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/reference/footer-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="kb object-cover"
          style={
            {
              "--kb-s": 1.12,
              "--kb-x": "-2%",
              "--kb-y": "0%",
              "--kb-t": "26s",
            } as React.CSSProperties
          }
        />
        <span className="from-espresso/90 via-espresso/55 to-espresso/80 absolute inset-0 bg-gradient-to-b" />
        <span className="footer-glow footer-glow-a" />
        <span className="footer-glow footer-glow-b" />
        <span className="footer-sweep" />
      </div>
      <div className="container-site grid gap-8 pt-10 pb-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link
            href="/"
            aria-label={`${siteConfig.legalName} - Home`}
            className="font-heading text-ivory inline-block text-[1.25rem] font-semibold tracking-[0.14em] uppercase"
          >
            Lahima <span className="text-bronze-light">In-Des</span>
          </Link>
          <p className="text-ivory/70 mt-2 max-w-xs text-sm">
            {siteConfig.shortDescriptor}. Founded by {siteConfig.founder}, established{" "}
            {siteConfig.established}.
          </p>
        </div>

        <nav aria-label="Footer pages" className="lg:col-span-2">
          <h2 className={headingClass}>Explore</h2>
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
          <h2 className={headingClass}>Services</h2>
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
          <h2 className={headingClass}>Contact</h2>
          <address className="text-ivory/75 space-y-1.5 text-sm not-italic">
            <p>
              {verifiedContact.streetAddress ? `${verifiedContact.streetAddress}, ` : ""}
              {address.locality}, {address.city}
              {verifiedContact.postalCode ? ` ${verifiedContact.postalCode}` : ""}
            </p>
            <p>
              <a
                href={`mailto:${verifiedContact.email}`}
                className="hover:text-bronze-light break-all underline decoration-[var(--bronze-light)]/50 underline-offset-4 transition-colors"
              >
                {verifiedContact.email}
              </a>
            </p>
            {verifiedContact.phone && (
              <p>
                <a
                  href={`tel:${verifiedContact.phone.tel}`}
                  className="hover:text-bronze-light transition-colors"
                >
                  {verifiedContact.phone.display}
                </a>
              </p>
            )}
            {verifiedContact.officeHours && <p>{verifiedContact.officeHours}</p>}
          </address>
          {socialLinks.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {socialLinks.map(({ network, url }) => (
                <li key={network}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-ivory/30 hover:bg-ivory hover:text-espresso inline-flex min-h-8 items-center border px-3 text-sm transition-colors"
                  >
                    {SOCIAL_LABELS[network] ?? network}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-ivory/15 border-t">
        <div className="container-site text-ivory/65 flex flex-col gap-2 pt-4 pb-24 text-[0.8125rem] lg:flex-row lg:items-center lg:justify-between lg:pb-4">
          <p>
            &copy; {year} {siteConfig.legalName}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-0.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-bronze-light inline-flex min-h-8 items-center transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="hover:text-bronze-light inline-flex min-h-8 items-center transition-colors" />
              </li>
            </ul>
          </nav>
          <BackToTop className="hover:text-bronze-light inline-flex min-h-8 items-center gap-2 transition-colors" />
        </div>
      </div>
    </footer>
  );
}
