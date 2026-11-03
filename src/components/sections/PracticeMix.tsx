import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { ImageTrio } from "@/components/ui/ImageTrio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { referenceImages } from "@/content/images";
import { services } from "@/content/services";

const commercialServices = services.filter((s) => s.segment === "commercial");
const homeServices = services.filter(
  (s) => s.segment === "homes" || s.slug.startsWith("renovation"),
);

/** Where the practice's work sits: a commercial side and a residential side. */
export function PracticeMix() {
  const columns = [
    {
      key: "commercial",
      eyebrow: "Commercial",
      title: "Commercial & workplace spaces",
      text: "Retail, offices, cafés and hospitality, and institutional interiors form the larger part of our work.",
      images: [
        referenceImages.corporateFloor,
        referenceImages.hotelLobby,
        referenceImages.showroom,
      ] as const,
      list: commercialServices,
      cta: {
        label: "Commercial interiors",
        href: "/services/commercial-retail-interior-design",
      },
    },
    {
      key: "homes",
      eyebrow: "Residential",
      title: "Homes & renovation",
      text: "Residences and renovations, designed room by room with the same care.",
      images: [
        referenceImages.homeLiving,
        referenceImages.homeKitchen,
        referenceImages.roomBedroom,
      ] as const,
      list: homeServices,
      cta: {
        label: "Residential interiors",
        href: "/services/residential-interior-design",
      },
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Where our work sits"
          title="Commercial and residential, under one studio."
          lead="Across Chennai and South India, from workplaces and retail to homes."
          className="max-w-3xl"
        />
        <RevealGroup className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {columns.map((col) => (
            <RevealItem
              key={col.key}
              className={col.key === "commercial" ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <article className="border-line flex h-full flex-col border bg-white">
                <div className="relative">
                  <ImageTrio
                    images={col.images}
                    ratio={col.key === "commercial" ? "aspect-[16/9]" : "aspect-[16/10]"}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="eyebrow mb-3">{col.eyebrow}</p>
                  <h3 className="font-heading text-[1.75rem] leading-tight sm:text-[2rem]">
                    {col.title}
                  </h3>
                  <p className="text-taupe-deep mt-3">{col.text}</p>
                  <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
                    {col.list.map((s) => (
                      <li key={s.slug} className="border-line border-t">
                        <Link
                          href={`/services/${s.slug}`}
                          className="group hover:text-bronze-deep flex min-h-11 items-center justify-between gap-3 py-2 text-[0.9375rem] transition-colors"
                        >
                          {s.name}
                          <span
                            aria-hidden="true"
                            className="text-bronze-deep transition-transform duration-500 group-hover:translate-x-1"
                          >
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link
                      href={col.cta.href}
                      className="group inline-flex min-h-12 items-center gap-3 bg-gradient-to-r from-[#10261f] to-[#2b5a49] px-6 text-[0.8125rem] font-semibold tracking-[0.16em] text-white uppercase transition-[filter,box-shadow] duration-500 hover:shadow-[0_14px_30px_-14px_rgba(16,38,31,0.8)] hover:brightness-125"
                    >
                      {col.cta.label}
                      <span
                        aria-hidden="true"
                        className="text-[#bfe3d3] transition-transform duration-500 group-hover:translate-x-1.5"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
