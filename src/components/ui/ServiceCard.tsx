import Image from "next/image";
import Link from "next/link";
import { referenceImages } from "@/content/images";
import { segmentLabel, type ServiceSummary } from "@/content/services";

/**
 * Image-led service card. Hover / keyboard focus / touch press: the photo
 * slowly zooms, the shade deepens, the title lifts and a bronze rule draws in.
 */
export function ServiceCard({
  service,
  index,
}: {
  service: ServiceSummary;
  index: number;
}) {
  const image = referenceImages[service.image];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group sheen bg-espresso relative block aspect-[4/5] touch-manipulation overflow-hidden transition-[transform,box-shadow] duration-500 ease-out outline-none focus-visible:-translate-y-1.5 focus-visible:shadow-2xl active:scale-[0.985] [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-[0_30px_60px_-28px_rgba(53,44,39,0.65)]"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-out group-focus-visible:scale-[1.08] group-active:scale-[1.06] [@media(hover:hover)]:group-hover:scale-[1.08]"
      />
      <div
        aria-hidden="true"
        className="from-espresso/90 via-espresso/25 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500 group-focus-visible:opacity-100 [@media(hover:hover)]:opacity-90 [@media(hover:hover)]:group-hover:opacity-100"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <span className="font-heading text-ivory text-[2.75rem] leading-none drop-shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="bg-ivory/90 text-espresso rounded-full px-3 py-1 text-[0.625rem] font-semibold tracking-[0.14em] uppercase backdrop-blur-sm">
          {segmentLabel[service.segment]}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="bg-bronze-light mb-4 block h-px w-10 origin-left transition-all duration-700 ease-(--ease-out-expo) group-focus-visible:w-full group-active:w-full [@media(hover:hover)]:group-hover:w-full"
        />
        <h3 className="font-heading text-ivory text-[1.55rem] leading-[1.12] transition-transform duration-500 ease-out group-focus-visible:-translate-y-1 [@media(hover:hover)]:group-hover:-translate-y-1">
          {service.name}
        </h3>
        <p className="text-ivory mt-4 flex items-center gap-3 text-[0.75rem] font-semibold tracking-[0.18em] uppercase">
          Explore
          <svg
            width="22"
            height="10"
            viewBox="0 0 22 10"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-500 ease-(--ease-out-expo) group-focus-visible:translate-x-2 [@media(hover:hover)]:group-hover:translate-x-2"
          >
            <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </p>
      </div>
    </Link>
  );
}
