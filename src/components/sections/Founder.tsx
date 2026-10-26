import { Reveal } from "@/components/animation/Reveal";
import { CountUp, Drift } from "@/components/animation/ScrollEffects";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { siteConfig } from "@/config/site";

/** Founder band. Name and year only: no invented bio, quotes or credentials. */
export function Founder() {
  return (
    <section className="bg-ivory relative overflow-hidden py-20 md:py-28">
      <Drift
        from={-50}
        to={50}
        className="pointer-events-none absolute -top-6 -right-4 select-none"
      >
        <span
          aria-hidden="true"
          className="font-heading text-bronze/15 block text-[clamp(8rem,28vw,22rem)] leading-none font-semibold"
        >
          <CountUp from={1900} to={siteConfig.established} duration={2.4} />
        </span>
      </Drift>
      <div className="container-site relative grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow mb-5 flex items-center gap-4">
            <span aria-hidden="true" className="bg-bronze h-px w-10" />
            Founder
          </p>
          <h2>{siteConfig.founder}</h2>
          <p className="text-taupe-deep mt-6 max-w-xl text-[1.0625rem]">
            Founder of {siteConfig.name}, an architecture and interior design practice
            established in {siteConfig.established} and based in{" "}
            {siteConfig.address.locality}, {siteConfig.address.city}.
          </p>
          <div className="mt-8">
            <ArrowLink href="/about">Read about the practice</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
