import { TiltCard } from "@/components/animation/TiltCard";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/content/services";

/** The 8 services as an image-led card grid. */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-ivory py-20 md:py-28 lg:py-32">
      <div className="container-site">
        {heading && (
          <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
            <SectionHeading eyebrow="Our Services" title="Eight ways we shape a space." />
            <ArrowLink href="/services" className="self-start md:self-auto">
              All services
            </ArrowLink>
          </div>
        )}
        <RevealGroup className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <RevealItem key={service.slug} effect="swing" index={i}>
              <TiltCard>
                <ServiceCard service={service} index={i} />
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
