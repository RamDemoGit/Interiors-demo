import { Reveal } from "@/components/animation/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, workMix } from "@/config/site";
import { referenceImages } from "@/content/images";

/** Welcome / practice introduction. Copy is fact-only until the master is applied. */
export function Welcome() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Photo
            image={referenceImages.detail}
            ratio="aspect-[4/5]"
            sizes="(min-width: 1024px) 38vw, 100vw"
            parallax
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
              {siteConfig.founder}, from a studio in {siteConfig.address.locality},{" "}
              {siteConfig.address.city}.
            </p>
            <p>
              The practice serves {siteConfig.areaServed.join(" and ")}. About{" "}
              {workMix.commercial}% of its work is commercial (workplaces, retail,
              hospitality and institutional spaces) and about {workMix.homes}% is homes.
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
