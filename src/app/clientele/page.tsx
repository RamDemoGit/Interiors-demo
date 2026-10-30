import type { Metadata } from "next";
import { Marquee } from "@/components/animation/Marquee";
import { CardMarquee } from "@/components/animation/CardMarquee";
import { Coverflow, type CoverflowItem } from "@/components/animation/Coverflow";
import { ReviewCard } from "@/components/ui/ClientCards";
import { clientReviews } from "@/content/reviews";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { clientLogos } from "@/content/brands";
import { Reveal, RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featureFlags, siteConfig, workMix } from "@/config/site";
import { projectFilters, projects, statusLabel } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Clientele, Interior Designers Chennai",
  description:
    "The kinds of homes, workplaces, hospitality and institutional spaces designed by Lahima In-Des, interior designers and architects in Chennai.",
  path: "/clientele",
});

// Category cards built from the real portfolio data (no logos, no named clients).
const groups = projectFilters
  .filter((f) => f.value !== "all")
  .map((f) => {
    const inGroup = projects.filter((p) => p.filterTags.includes(f.value as never));
    return {
      label: f.label,
      value: f.value,
      count: inGroup.length,
      image: inGroup[0]?.images[0],
      places: Array.from(new Set(inGroup.map((p) => p.location))),
    };
  })
  .filter((g) => g.places.length > 0);

// Gallery: every project whose picture is not already a category card below,
// so no photograph repeats on this page.
const coverSlugs = new Set(
  projectFilters
    .filter((f) => f.value !== "all")
    .map((f) => projects.find((p) => p.filterTags.includes(f.value as never))?.slug),
);
const coverflowItems: CoverflowItem[] = projects
  .filter((p) => !coverSlugs.has(p.slug) && p.images[0])
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    location: p.location,
    status: statusLabel[p.status],
    image: p.images[0]!,
  }));

const allPlaces = Array.from(new Set(projects.map((p) => p.location)));

/**
 * Clientele. Paragraph copy only: client logos stay hidden until
 * `featureFlags.showClientLogos` is enabled with owner-approved assets.
 */
export default function ClientelePage() {
  return (
    <>
      <PageHero
        eyebrow="Who we work with"
        title="Clientele"
        lead="Homeowners, businesses and institutions across Chennai and South India."
        crumbs={[{ label: "Clientele" }]}
        image="office"
        variant="drop"
      />

      <section className="bg-white py-14 sm:py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="The people behind the spaces"
            title="Every space starts with a different brief."
          />
          <Reveal
            delay={0.1}
            className="text-taupe-deep max-w-xl space-y-5 text-[1.0625rem] lg:col-span-7"
          >
            <p>
              {siteConfig.name} designs for families moving into a new home, owners
              renovating a room, businesses fitting out an office or shop, and
              institutions shaping places to learn and gather.
            </p>
            <p>
              About {workMix.commercial}% of the practice&rsquo;s work is commercial and
              about {workMix.homes}% is homes. The portfolio reflects that range:
              residences, a school, offices, cafés, a boutique, a spa, a hotel concept and
              mixed-use building proposals, in Chennai and in other cities of South India.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Spaces and places we have worked in"
        className="bg-espresso overflow-hidden py-10 md:py-14"
      >
        <p className="eyebrow !text-bronze-light container-site mb-8">
          Spaces and places, always on the move
        </p>
        <div className="text-ivory space-y-6 md:space-y-8">
          <Marquee
            label="Kinds of spaces we design"
            items={groups.map((g) => g.label)}
            duration={45}
            itemClassName="text-ivory"
            dotClassName="bg-bronze-light"
          />
          <Marquee
            label="Locations of our projects"
            items={allPlaces}
            reverse
            duration={55}
            itemClassName="text-bronze-light italic"
            dotClassName="bg-ivory/60"
          />
        </div>
      </section>

      <section
        aria-label="Our clients and their spaces"
        className="relative overflow-hidden bg-white py-14 sm:py-20 md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[28rem] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(176,139,97,0.16),transparent)]"
        />
        <div className="container-site relative">
          <SectionHeading
            align="center"
            eyebrow="Our clients"
            title="The people and the spaces."
            lead="Homes, workplaces and institutions designed for our clients. Swipe, use the arrows, or let the gallery turn on its own."
            className="mx-auto mb-10 md:mb-14"
          />
          <Coverflow items={coverflowItems} />
        </div>
      </section>
      {featureFlags.showTestimonialQuotes && clientReviews.length > 0 && (
        <section
          aria-label="What our clients say"
          className="overflow-hidden bg-white py-14 sm:py-20 md:py-24"
        >
          <div className="container-site">
            <SectionHeading
              eyebrow="What our clients say"
              title="In their own words."
              className="mb-10 md:mb-12"
            />
          </div>
          <CardMarquee
            label="Client reviews"
            duration={70}
            items={clientReviews.map((r) => (
              <ReviewCard key={r.name + r.quote.slice(0, 12)} review={r} />
            ))}
          />
        </section>
      )}

      <section className="bg-ivory border-line border-y py-14 sm:py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Spaces we design"
            title="From homes to institutions."
            className="mb-10 sm:mb-12"
          />
          <RevealGroup
            as="ul"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {groups.map((g, index) => (
              <RevealItem
                key={g.value}
                as="li"
                className="flex"
                effect="swing"
                index={index}
              >
                <Link
                  href={`/projects?type=${g.value}`}
                  className="group shake border-line [@media(hover:hover)]:hover:border-bronze relative flex w-full touch-manipulation flex-col border bg-white transition-[box-shadow,border-color] duration-500 ease-out [@media(hover:hover)]:hover:shadow-[0_28px_55px_-28px_rgba(53,44,39,0.5)]"
                >
                  {g.image && (
                    <Photo
                      image={g.image}
                      ratio="aspect-[16/10]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      zoomOnHover
                      reveal={false}
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-heading text-[1.65rem] leading-tight">
                        {g.label}
                      </h3>
                      <span className="text-bronze-deep text-xs font-semibold tracking-[0.14em] whitespace-nowrap uppercase">
                        {g.count} {g.count === 1 ? "project" : "projects"}
                      </span>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Locations">
                      {g.places.map((place) => (
                        <li
                          key={place}
                          className="border-line text-taupe-deep bg-ivory rounded-full border px-3 py-1 text-[0.8125rem]"
                        >
                          {place}
                        </li>
                      ))}
                    </ul>
                    <span
                      aria-hidden="true"
                      className="bg-bronze mt-6 block h-px w-10 transition-all duration-700 ease-(--ease-out-expo) group-active:w-24 [@media(hover:hover)]:group-hover:w-24"
                    />
                    <span className="text-bronze-deep mt-auto inline-flex items-center gap-3 pt-5 text-[0.8125rem] font-semibold tracking-[0.16em] uppercase">
                      View projects
                      <svg
                        width="22"
                        height="10"
                        viewBox="0 0 22 10"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:translate-x-1.5"
                      >
                        <path
                          d="M0 5h20M16 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {featureFlags.showClientLogos && clientLogos.length > 0 && (
        <section aria-label="Our clients" className="bg-white py-16 sm:py-20 md:py-24">
          <div className="container-site">
            <SectionHeading
              eyebrow="Our clients"
              title="Names behind the spaces."
              lead="Clients who have agreed to be listed."
              className="mb-10 md:mb-12"
            />
          </div>
          <Reveal className="space-y-2">
            <LogoMarquee
              items={clientLogos.slice(0, Math.ceil(clientLogos.length / 2))}
              label="Our clients"
              duration={45}
            />
            {clientLogos.length > 1 && (
              <LogoMarquee
                items={clientLogos.slice(Math.ceil(clientLogos.length / 2))}
                label="More of our clients"
                duration={52}
                reverse
              />
            )}
          </Reveal>
        </section>
      )}
      <CtaBand />
    </>
  );
}
