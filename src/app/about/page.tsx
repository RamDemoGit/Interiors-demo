import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PracticeMix } from "@/components/sections/PracticeMix";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, workMix } from "@/config/site";
import { referenceImages } from "@/content/images";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us, Architects in Chennai",
  description: `${siteConfig.legalName}: architecture and interior design practice in ${siteConfig.address.locality}, Chennai, established in ${siteConfig.established}.`,
  path: "/about",
});

const milestones = [
  { label: "Established", value: `${siteConfig.established}` },
  {
    label: "Studio",
    value: `${siteConfig.address.locality}, ${siteConfig.address.city}`,
  },
  { label: "Serving", value: siteConfig.areaServed.join(" & ") },
  { label: "Our work", value: `${workMix.commercial}% commercial` },
];

// Unique project locations straight from the portfolio data.
const locations = Array.from(new Set(projects.map((p) => p.location))).sort((a, b) =>
  a.localeCompare(b),
);

const smallest = Math.min(...projects.map((p) => p.areaSqFt));
const largest = Math.max(...projects.map((p) => p.areaSqFt));
const fmt = new Intl.NumberFormat("en-IN");

/**
 * About. Written only from verified facts (year, founder, studio, services,
 * portfolio data). Replace with the master-document story in Phase 2/3.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The practice"
        title="About Us"
        lead={`Established in ${siteConfig.established} by ${siteConfig.founder}, with a studio in ${siteConfig.address.locality}, ${siteConfig.address.city}.`}
        crumbs={[{ label: "About Us" }]}
        image="dining"
      />

      {/* Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Photo
              image={referenceImages.dining}
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 38vw, 100vw"
              parallax
            />
          </div>
          <div className="lg:col-span-7 lg:pl-6">
            <SectionHeading
              eyebrow="Our story"
              title="A Chennai studio, built on design that lasts."
            />
            <Reveal
              delay={0.1}
              className="text-taupe-deep mt-8 max-w-xl space-y-5 text-[1.0625rem]"
            >
              <p>
                {siteConfig.legalName} is an architecture and interior design practice
                based in {siteConfig.address.locality}, {siteConfig.address.city}. It was
                established in {siteConfig.established} by {siteConfig.founder}.
              </p>
              <p>
                From the {siteConfig.address.locality} studio, the practice works across{" "}
                {siteConfig.areaServed.join(" and ")} on commercial spaces, homes,
                workplaces, retail and hospitality, institutional interiors and
                architectural concepts. About {workMix.commercial}% of its work is
                commercial and about {workMix.homes}% is homes.
              </p>
              <p>
                The portfolio runs from a compact residence of {fmt.format(smallest)} sq
                ft to a residential concept of {fmt.format(largest)} sq ft, so each brief
                is approached on its own scale and its own terms.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Heritage facts (static text, no counters) */}
      <section className="bg-ivory border-line border-y py-16 md:py-20">
        <div className="container-site">
          <RevealGroup as="div" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <RevealItem key={m.label}>
                <p className="eyebrow mb-3">{m.label}</p>
                <p className="font-heading text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-tight">
                  {m.value}
                </p>
                <span aria-hidden="true" className="bg-bronze mt-5 block h-px w-14" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <PracticeMix />

      {/* Founder */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5 flex items-center gap-4">
              <span aria-hidden="true" className="bg-bronze h-px w-10" />
              Founder
            </p>
            <h2>{siteConfig.founder}</h2>
          </Reveal>
          <Reveal
            delay={0.1}
            className="text-taupe-deep max-w-xl space-y-5 text-[1.0625rem] lg:col-span-7"
          >
            <p>
              {siteConfig.founder} founded {siteConfig.name} in {siteConfig.established}{" "}
              and the practice continues from its {siteConfig.address.locality} studio in{" "}
              {siteConfig.address.city}.
            </p>
            <ArrowLink href="/contact">Speak with the studio</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* What we design */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we design"
            title="Eight services, one studio."
            className="mb-12"
          />
          <RevealGroup as="ul" className="border-line grid border-t sm:grid-cols-2">
            {services.map((s, i) => (
              <RevealItem
                key={s.slug}
                as="li"
                className="border-line border-b sm:odd:border-r"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex min-h-20 items-center justify-between gap-6 px-2 py-5 transition-colors hover:bg-white/60 sm:px-6"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="text-bronze-deep text-xs font-semibold tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-[1.35rem] leading-snug md:text-[1.5rem]">
                      {s.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-bronze-deep transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Where we have worked */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Where we work"
            title="Projects across Chennai and South India."
            lead="Locations from the portfolio, each project labelled as a photograph or a design visualization."
          />
          <RevealGroup as="ul" className="mt-10 flex flex-wrap gap-3">
            {locations.map((place) => (
              <RevealItem key={place} as="li">
                <span className="border-line text-espresso inline-flex min-h-11 items-center rounded-sm border px-5 text-sm font-medium">
                  {place}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10">
            <ArrowLink href="/projects">View projects</ArrowLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
