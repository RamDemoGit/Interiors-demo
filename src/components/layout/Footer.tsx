import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { EnquiryButton } from "@/components/forms/EnquiryModal";
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
  "text-ivory/80 hover:text-bronze-light group/link inline-flex min-h-9 items-center gap-0 text-[0.9375rem] transition-all duration-300 hover:gap-2";

const headingClass =
  "font-body text-bronze-light mb-5 text-xs font-semibold tracking-[0.22em] uppercase";

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className={linkClass}>
      <span
        aria-hidden="true"
        className="bg-bronze-light h-px w-0 transition-all duration-300 group-hover/link:w-4"
      />
      {children}
    </Link>
  );
}

/**
 * Footer links to every page (internal-linking requirement). Phone, full
 * address, hours and socials render only when verified in `config/site.ts`.
 */
export function Footer() {
  const { address } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-ivory relative overflow-hidden">
      {/* Enquiry band */}
      <div className="border-ivory/15 border-b">
        <div className="container-site flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow !text-bronze-light mb-4">Start a conversation</p>
            <p className="font-heading text-ivory text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.12]">
              Planning a home, workplace or space?
            </p>
          </div>
          <EnquiryButton tone="light" className="shrink-0 self-start md:self-auto">
            {siteConfig.primaryCta.label}
          </EnquiryButton>
        </div>
      </div>

      <div className="container-site grid gap-12 py-14 sm:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link
            href="/"
            aria-label={`${siteConfig.legalName} - Home`}
            className="group inline-flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="font-heading border-bronze-light text-bronze-light group-hover:bg-bronze-light group-hover:text-espresso grid h-11 w-11 place-items-center border text-[1.6rem] leading-none font-semibold transition-colors duration-500"
            >
              L
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-ivory text-[1.35rem] font-semibold tracking-[0.14em] uppercase">
                Lahima <span className="text-bronze-light">In-Des</span>
              </span>
              <span className="text-ivory/70 mt-1.5 text-[0.5625rem] font-semibold tracking-[0.3em] uppercase">
                {siteConfig.shortDescriptor}
              </span>
            </span>
          </Link>
          <p className="font-heading text-ivory mt-8 max-w-xs text-2xl leading-snug">
            {siteConfig.tagline}
          </p>
          <p className="text-ivory/70 mt-4 text-sm">
            Founded by {siteConfig.founder} &middot; Established {siteConfig.established}
          </p>
        </div>

        <nav aria-label="Footer pages" className="lg:col-span-2">
          <h2 className={headingClass}>Explore</h2>
          <ul>
            {footerExploreLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services" className="lg:col-span-3">
          <h2 className={headingClass}>Services</h2>
          <ul>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headingClass}>Contact</h2>
          <address className="text-ivory/80 space-y-3 text-[0.9375rem] not-italic">
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
            <ul className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map(({ network, url }) => (
                <li key={network}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-ivory/30 hover:bg-ivory hover:text-espresso inline-flex min-h-9 items-center border px-4 text-sm transition-colors"
                  >
                    {SOCIAL_LABELS[network] ?? network}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Reveal y={40} className="container-site overflow-hidden pb-6 lg:pb-10">
        <p
          aria-hidden="true"
          className="font-heading text-center text-[clamp(2.4rem,10.5vw,9.5rem)] leading-none font-semibold tracking-[0.06em] whitespace-nowrap text-transparent uppercase select-none [-webkit-text-stroke:1px_rgba(245,241,234,0.3)]"
        >
          Lahima In-Des
        </p>
      </Reveal>

      <div className="border-ivory/15 border-t">
        <div className="container-site text-ivory/70 flex flex-col gap-4 pt-6 pb-24 text-sm lg:flex-row lg:items-center lg:justify-between lg:pb-6">
          <p>
            &copy; {year} {siteConfig.legalName}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-bronze-light inline-flex min-h-9 items-center transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="hover:text-bronze-light inline-flex min-h-9 items-center transition-colors" />
              </li>
            </ul>
          </nav>
          <BackToTop className="hover:text-bronze-light inline-flex min-h-9 items-center gap-2 transition-colors" />
        </div>
      </div>
    </footer>
  );
}
