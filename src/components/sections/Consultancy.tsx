import { Reveal, RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { referenceImages } from "@/content/images";
import { consultancyPoints } from "@/content/scope";

/** Interior design consultancy: what the studio advises on. */
export function Consultancy() {
  return (
    <section className="bg-white py-14 sm:py-20 md:py-28">
      <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading
            eyebrow="Design consultancy"
            title="Interior design consultancy in Chennai."
            lead={`Guidance from first idea to a clear plan, for homes and spaces across ${siteConfig.areaServed.join(" and ")}.`}
          />
          <Reveal delay={0.1} className="mt-10 hidden lg:block">
            <Photo
              image={referenceImages.compact}
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              parallax
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <RevealGroup
            as="ol"
            className="border-line divide-y divide-[var(--line)] border-y"
          >
            {consultancyPoints.map((point, i) => (
              <RevealItem
                key={point.title}
                as="li"
                className="flex gap-5 py-5 sm:gap-8 sm:py-6"
              >
                <span className="font-heading text-bronze w-10 shrink-0 text-3xl leading-none sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-[1.4rem] leading-tight sm:text-[1.6rem]">
                    {point.title}
                  </h3>
                  <p className="text-taupe-deep mt-1.5">{point.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contact#enquiry">Discuss your project</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              All services
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
