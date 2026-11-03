import { TiltCard } from "@/components/animation/TiltCard";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { EnquiryButton } from "@/components/forms/EnquiryModal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/content/services";

/** Every service as an image-led card, closed by a wide enquiry card. */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-ivory py-20 md:py-28 lg:py-32">
      <div className="container-site">
        {heading && (
          <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our Services"
              title={`${services.length} ways we shape a space.`}
            />
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
          <RevealItem
            effect="zoom"
            className="flex flex-col justify-center bg-gradient-to-br from-[#10261f] via-[#17342c] to-[#2b5a49] p-8 text-white sm:p-10 xl:col-span-3"
          >
            <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[#bfe3d3] uppercase">
              Not sure which one fits?
            </p>
            <p className="font-heading mt-3 max-w-xl text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] leading-tight">
              Tell us about your space and we will point you to the right service.
            </p>
            <div className="mt-8">
              <EnquiryButton tone="light">Discuss your project</EnquiryButton>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
