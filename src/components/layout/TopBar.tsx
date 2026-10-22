import { siteConfig, verifiedContact } from "@/config/site";

/** Slim information strip above the header (desktop only). */
export function TopBar() {
  return (
    <div className="bg-sand text-taupe-deep border-line border-b max-md:hidden">
      <div className="container-site flex h-9 items-center justify-between text-xs tracking-wide">
        <p>
          Architects &amp; Interior Designers &middot; {siteConfig.address.locality},{" "}
          {siteConfig.address.city} &middot; Since {siteConfig.established}
        </p>
        <div className="flex items-center gap-6">
          {verifiedContact.phone && (
            <a href={`tel:${verifiedContact.phone.tel}`} className="link-underline">
              {verifiedContact.phone.display}
            </a>
          )}
          <a href={`mailto:${verifiedContact.email}`} className="link-underline">
            {verifiedContact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
