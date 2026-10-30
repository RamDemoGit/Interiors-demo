import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig, verifiedContact } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Our T. Nagar, Chennai Studio",
  description:
    "Contact Lahima In-Des | Architects & Engineers, T. Nagar, Chennai, to discuss your home, office or commercial interior project.",
  path: "/contact",
});

/**
 * Contact. Only verified details render: email and the T. Nagar locality.
 * Phone, street address, map, hours and WhatsApp appear only when filled in
 * `config/site.ts`.
 */
export default function ContactPage() {
  const { address } = siteConfig;

  const rows = [
    {
      label: "Studio",
      content: (
        <>
          {verifiedContact.streetAddress ? `${verifiedContact.streetAddress}, ` : ""}
          {address.locality}, {address.city}
          {verifiedContact.postalCode ? ` ${verifiedContact.postalCode}` : ""}
        </>
      ),
    },
    {
      label: "Email",
      content: (
        <a
          href={`mailto:${verifiedContact.email}`}
          className="link-underline hover:text-bronze-deep break-all"
        >
          {verifiedContact.email}
        </a>
      ),
    },
    ...(verifiedContact.phone
      ? [
          {
            label: "Phone",
            content: (
              <a href={`tel:${verifiedContact.phone.tel}`} className="link-underline">
                {verifiedContact.phone.display}
              </a>
            ),
          },
        ]
      : []),
    ...(verifiedContact.officeHours
      ? [{ label: "Hours", content: <>{verifiedContact.officeHours}</> }]
      : []),
    { label: "Serving", content: <>{siteConfig.areaServed.join(" & ")}</> },
  ];

  return (
    <>
      <PageHero
        eyebrow="Discuss your project"
        title="Contact"
        lead={`Tell us about your space. The studio is in ${address.locality}, ${address.city}, and works across ${siteConfig.areaServed.join(" and ")}.`}
        crumbs={[{ label: "Contact" }]}
        image="compact"
        variant="slide"
      />

      <section className="bg-ivory py-14 sm:py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5 flex items-center gap-4">
              <span aria-hidden="true" className="bg-bronze h-px w-10" />
              The studio
            </p>
            <h2 className="text-[clamp(1.9rem,1.3rem+2vw,2.75rem)]">
              Visit or write to us.
            </h2>
            <RevealGroup className="border-line mt-8 border-t bg-white/50">
              <dl className="contents">
                {rows.map((row) => (
                  <RevealItem
                    key={row.label}
                    effect="slide"
                    className="group border-line relative border-b px-5 py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-bronze absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-500 ease-(--ease-out-expo) [@media(hover:hover)]:group-hover:scale-y-100"
                    />
                    <dt className="eyebrow mb-2">{row.label}</dt>
                    <dd className="font-heading text-[1.4rem] leading-snug sm:text-2xl">
                      {row.content}
                    </dd>
                  </RevealItem>
                ))}
              </dl>
            </RevealGroup>
          </Reveal>

          <Reveal delay={0.1} from="right" className="lg:col-span-7">
            <div
              id="enquiry"
              className="relative scroll-mt-28 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(53,44,39,0.35)] sm:p-10"
            >
              <div
                aria-hidden="true"
                className="border-bronze/40 pointer-events-none absolute inset-2 border sm:inset-3"
              />
              <div className="relative">
                <p className="eyebrow mb-4">Enquiry</p>
                <h2 className="mb-2 text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">
                  Tell us about your project.
                </h2>
                <p className="text-taupe-deep mb-8 text-[0.9375rem]">
                  {verifiedContact.whatsappUrl
                    ? "Fill in the form, then send it from your own email app or on WhatsApp. Your details are filled in for you."
                    : "Fill in the form and your email app opens with your details filled in. Just press send."}
                </p>
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
