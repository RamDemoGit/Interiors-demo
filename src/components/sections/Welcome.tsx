import { Reveal } from "@/components/animation/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageTrio } from "@/components/ui/ImageTrio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { founderDisplay, siteConfig } from "@/config/site";
import { referenceImages } from "@/content/images";

/** Welcome / practice introduction. Copy is fact-only until the master is applied. */
export function Welcome() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ImageTrio
            images={[
              referenceImages.officeLobby,
              referenceImages.showroom,
              referenceImages.spa,
            ]}
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 38vw, 100vw"
          />
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <SectionHeading
            eyebrow="Welcome"
            title={
              <>
                A Chennai practice in architecture and interiors, since{" "}
                {siteConfig.established}.
              </>
            }
          />
          <Reveal
            delay={0.1}
            className="text-taupe-deep mt-8 max-w-xl space-y-5 text-[1.0625rem]"
          >
            <p>
              Lahima In-Des | Architects &amp; Engineers is led by its founder,{" "}
              {founderDisplay}, from a studio in {siteConfig.address.city}.
            </p>
            <p>
              The practice serves {siteConfig.areaServed.join(" and ")}. Its work spans
              commercial spaces (workplaces, retail, hospitality and institutional
              interiors) and residential interiors.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <ArrowLink href="/about">About Us</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
