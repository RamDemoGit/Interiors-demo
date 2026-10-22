import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workMix } from "@/config/site";
import { interiorScope } from "@/content/scope";

/** Room-by-room scope of interior work, as numbered cards. */
export function ScopeOfWork() {
  return (
    <section className="bg-ivory border-line border-y py-14 sm:py-20 md:py-28">
      <div className="container-site">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={`Homes \u00b7 about ${workMix.homes}% of our work`}
            title="For homes: room by room."
            lead="From the kitchen to the windows, every part of a home interior designed together."
          />
          <ArrowLink
            href="/services/residential-interior-design"
            className="self-start md:self-auto"
          >
            Residential interiors
          </ArrowLink>
        </div>

        <RevealGroup
          as="ul"
          className="grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {interiorScope.map((room, i) => (
            <RevealItem
              key={room.title}
              as="li"
              className="group hover:bg-sand relative bg-white p-6 transition-colors duration-500 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="bg-bronze absolute top-0 left-0 h-[3px] w-0 transition-[width] duration-700 ease-(--ease-out-expo) group-hover:w-full"
              />
              <span className="font-heading text-bronze text-4xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-5 text-[1.6rem] leading-tight">
                {room.title}
              </h3>
              <ul
                className="mt-5 flex flex-wrap gap-2"
                aria-label={`${room.title} includes`}
              >
                {room.items.map((item) => (
                  <li
                    key={item}
                    className="border-line text-taupe-deep bg-ivory rounded-full border px-3 py-1 text-[0.8125rem] transition-colors group-hover:bg-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="text-taupe-deep mt-6 text-sm">
          Scope, specifications and schedule are confirmed for each project in a written
          proposal.
        </p>
      </div>
    </section>
  );
}
