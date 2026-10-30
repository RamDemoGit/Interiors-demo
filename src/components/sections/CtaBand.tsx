import { Reveal, RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { CtaStage, EnquiryOrb } from "@/components/sections/CtaStage";
import { siteConfig } from "@/config/site";

/** Closing enquiry call-to-action. */
export function CtaBand() {
  return (
    <CtaStage>
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <RevealGroup>
            <RevealItem>
              <p className="eyebrow !text-ivory/90 mb-6">Start a conversation</p>
            </RevealItem>
            <RevealItem effect="wipe">
              <h2 className="text-ivory max-w-3xl text-[2.4rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem]">
                Planning a home, workplace or{" "}
                <em className="text-espresso italic">space?</em>
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="text-ivory/90 mt-7 max-w-xl text-[1.0625rem]">
                Tell us about your project and we will respond to your enquiry at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline text-ivory break-all"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.3} className="mt-10 flex items-center gap-5">
            <span aria-hidden="true" className="bg-ivory/60 h-px w-14" />
            <p className="text-ivory/85 text-xs font-semibold tracking-[0.22em] uppercase">
              {siteConfig.address.locality}, {siteConfig.address.city} &middot; Since{" "}
              {siteConfig.established}
            </p>
          </Reveal>
        </div>

        <Reveal from="scale" delay={0.15} className="lg:col-span-4">
          <EnquiryOrb label={siteConfig.primaryCta.label} />
        </Reveal>
      </div>
    </CtaStage>
  );
}
