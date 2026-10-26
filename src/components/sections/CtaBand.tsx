import { Reveal } from "@/components/animation/Reveal";
import { EnquiryButton } from "@/components/forms/EnquiryModal";
import { siteConfig } from "@/config/site";

/** Closing enquiry call-to-action. */
export function CtaBand() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-site">
        <Reveal className="bg-sand relative overflow-hidden px-6 py-16 text-center sm:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="border-bronze/40 pointer-events-none absolute inset-3 border sm:inset-5"
          />
          <p className="eyebrow relative mb-6 justify-center">Start a conversation</p>
          <h2 className="relative mx-auto max-w-3xl">
            Planning a home, workplace or space?
          </h2>
          <p className="text-taupe-deep relative mx-auto mt-6 max-w-xl text-[1.0625rem]">
            Tell us about your project and we will respond to your enquiry at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline text-espresso break-all"
            >
              {siteConfig.email}
            </a>
            .
          </p>
          <div className="relative mt-10 flex justify-center">
            <EnquiryButton>{siteConfig.primaryCta.label}</EnquiryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
