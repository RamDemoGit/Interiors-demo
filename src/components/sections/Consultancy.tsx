import { Reveal } from "@/components/animation/Reveal";
import { EnquiryButton } from "@/components/forms/EnquiryModal";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { referenceImages } from "@/content/images";
import { ConsultancyList } from "./ConsultancyList";

/** Interior design consultancy: what the studio advises on. */
export function Consultancy() {
  return (
    <section className="bg-sand py-14 sm:py-20 md:py-28">
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
          <ConsultancyList />
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <EnquiryButton>Discuss your project</EnquiryButton>
            <ButtonLink href="/services" variant="secondary">
              All services
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
