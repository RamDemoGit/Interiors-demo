import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { referenceImages } from "@/content/images";
import { segmentLabel, type ServiceSummary } from "@/content/services";

export function ServiceCard({
  service,
  index,
}: {
  service: ServiceSummary;
  index: number;
}) {
  return (
    <Link href={`/services/${service.slug}`} className="group block bg-white">
      <Photo
        image={referenceImages[service.image]}
        ratio="aspect-[4/3]"
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        zoomOnHover
        reveal={false}
      />
      <div className="relative p-6">
        <p className="flex items-center justify-between gap-3 text-xs font-semibold tracking-[0.2em]">
          <span className="text-bronze-deep">{String(index + 1).padStart(2, "0")}</span>
          <span className="bg-ivory text-taupe-deep rounded-full px-3 py-1 text-[0.625rem] tracking-[0.14em] uppercase">
            {segmentLabel[service.segment]}
          </span>
        </p>
        <h3 className="font-heading mt-3 min-h-[3.5rem] text-[1.5rem] leading-[1.15]">
          {service.name}
        </h3>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-taupe-deep text-xs font-semibold tracking-[0.16em] uppercase">
            Explore
          </span>
          <svg
            width="22"
            height="10"
            viewBox="0 0 22 10"
            fill="none"
            aria-hidden="true"
            className="text-bronze-deep transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1.5"
          >
            <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
        <span
          aria-hidden="true"
          className="bg-bronze absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100"
        />
      </div>
    </Link>
  );
}
