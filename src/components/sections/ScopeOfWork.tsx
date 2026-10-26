import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workMix } from "@/config/site";
import { referenceImages } from "@/content/images";
import { interiorScope } from "@/content/scope";

/** Homes: the room-by-room scope, as image cards. */
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
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {interiorScope.map((room, i) => {
            const image = referenceImages[room.image];
            return (
              <RevealItem key={room.title} as="li" className="flex">
                <article className="group border-line relative flex w-full touch-manipulation flex-col overflow-hidden border bg-white transition-[transform,box-shadow,border-color] duration-500 ease-out active:scale-[0.985] [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:border-[var(--bronze)] [@media(hover:hover)]:hover:shadow-[0_28px_55px_-30px_rgba(53,44,39,0.55)]">
                  <div className="sheen bg-sand relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-active:scale-[1.05] [@media(hover:hover)]:group-hover:scale-[1.07]"
                    />
                    <span className="bg-ivory/95 font-heading text-bronze-deep absolute top-0 left-0 px-4 py-2 text-xl leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-bronze absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-(--ease-out-expo) group-active:scale-x-100 [@media(hover:hover)]:group-hover:scale-x-100"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-heading text-[1.5rem] leading-tight">
                      {room.title}
                    </h3>
                    <ul
                      className="mt-4 flex flex-wrap gap-2"
                      aria-label={`${room.title} includes`}
                    >
                      {room.items.map((item) => (
                        <li
                          key={item}
                          className="border-line text-taupe-deep bg-ivory rounded-full border px-3 py-1 text-[0.8125rem] transition-colors duration-300 group-active:bg-white [@media(hover:hover)]:group-hover:bg-white"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
