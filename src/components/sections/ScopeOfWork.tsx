import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workMix } from "@/config/site";
import { interiorScope } from "@/content/scope";
import { RoomStack } from "./RoomStack";

/** Homes: the room-by-room scope, as cards that stack as you scroll. */
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

        <RoomStack rooms={interiorScope} />
      </div>
    </section>
  );
}
