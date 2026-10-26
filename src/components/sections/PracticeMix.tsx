import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { CountUp } from "@/components/animation/ScrollEffects";
import { MixBar } from "@/components/sections/MixBar";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workMix } from "@/config/site";
import { referenceImages } from "@/content/images";
import { services } from "@/content/services";

const commercialServices = services.filter((s) => s.segment === "commercial");
const homeServices = services.filter(
  (s) => s.segment === "homes" || s.slug.startsWith("renovation"),
);

/**
 * Where the practice's work sits: about 75% commercial, about 25% homes.
 * Figures come from `workMix` in config/site.ts (owner-supplied, approximate).
 */
export function PracticeMix() {
  const columns = [
    {
      key: "commercial",
      share: workMix.commercial,
      eyebrow: "Commercial",
      title: "Commercial & workplace spaces",
      text: "Retail, offices, cafés and hospitality, and institutional interiors form the larger part of our work.",
      image: referenceImages.office,
      list: commercialServices,
      cta: {
        label: "Commercial interiors",
        href: "/services/commercial-retail-interior-design",
      },
      tone: "bg-bronze-deep",
    },
    {
      key: "homes",
      share: workMix.homes,
      eyebrow: "Homes",
      title: "Homes & renovation",
      text: "Residences and renovations make up the rest, designed room by room with the same care.",
      image: referenceImages.living,
      list: homeServices,
      cta: {
        label: "Residential interiors",
        href: "/services/residential-interior-design",
      },
      tone: "bg-bronze-light",
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20 md:py-28">
      <div className="container-site">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            className="lg:col-span-6"
            eyebrow="Where our work sits"
            title="Commercial first, with homes alongside."
            lead="An approximate split of the practice's work across Chennai and South India."
          />
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="mb-4 flex items-end justify-between gap-6">
              <p className="font-heading leading-none">
                <CountUp
                  to={workMix.commercial}
                  suffix="%"
                  className="text-[clamp(3.25rem,2rem+5vw,5.5rem)]"
                />
                <span className="font-body text-taupe-deep ml-2 block text-sm font-semibold tracking-[0.16em] uppercase sm:inline">
                  Commercial
                </span>
              </p>
              <p className="font-heading text-right leading-none">
                <span className="text-bronze-deep text-[clamp(2.25rem,1.5rem+3vw,3.5rem)]">
                  {workMix.homes}%
                </span>
                <span className="font-body text-taupe-deep ml-2 block text-sm font-semibold tracking-[0.16em] uppercase sm:inline">
                  Homes
                </span>
              </p>
            </div>
            <MixBar commercial={workMix.commercial} homes={workMix.homes} />
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {columns.map((col) => (
            <RevealItem
              key={col.key}
              className={col.key === "commercial" ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <article className="border-line flex h-full flex-col border bg-white">
                <div className="relative">
                  <Photo
                    image={col.image}
                    ratio={col.key === "commercial" ? "aspect-[16/9]" : "aspect-[16/10]"}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    reveal={false}
                  />
                  <span
                    className={`${col.tone} text-ivory font-heading absolute right-0 bottom-0 px-5 py-3 text-3xl leading-none`}
                    aria-hidden="true"
                  >
                    {col.share}%
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="eyebrow mb-3">{col.eyebrow}</p>
                  <h3 className="font-heading text-[1.75rem] leading-tight sm:text-[2rem]">
                    {col.title}
                  </h3>
                  <p className="text-taupe-deep mt-3">{col.text}</p>
                  <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
                    {col.list.map((s) => (
                      <li key={s.slug} className="border-line border-t">
                        <Link
                          href={`/services/${s.slug}`}
                          className="group hover:text-bronze-deep flex min-h-11 items-center justify-between gap-3 py-2 text-[0.9375rem] transition-colors"
                        >
                          {s.name}
                          <span
                            aria-hidden="true"
                            className="text-bronze-deep transition-transform duration-500 group-hover:translate-x-1"
                          >
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <ArrowLink href={col.cta.href}>{col.cta.label}</ArrowLink>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
