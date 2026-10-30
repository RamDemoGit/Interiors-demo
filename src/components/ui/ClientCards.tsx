import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { statusLabel } from "@/content/projects";
import type { Project } from "@/content/types";
import type { ClientReview } from "@/content/reviews";
import { formatSqFt } from "@/lib/utils";

/** A client's project, shown as a card (real portfolio data only). */
export function ClientProjectCard({ project }: { project: Project }) {
  const image = project.images[0];
  if (!image) return null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group border-line [@media(hover:hover)]:hover:border-bronze flex w-full flex-col border bg-white transition-[transform,box-shadow,border-color] duration-500 ease-out active:scale-[0.99] [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:shadow-[0_28px_55px_-28px_rgba(53,44,39,0.5)]"
    >
      <Photo
        image={image}
        ratio="aspect-[4/3]"
        sizes="320px"
        reveal={false}
        zoomOnHover
        reference={false}
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-bronze-deep text-[0.6875rem] font-semibold tracking-[0.18em] uppercase">
          {project.category}
        </p>
        <h3 className="font-heading mt-2 text-[1.35rem] leading-tight">
          {project.title}
        </h3>
        <p className="text-taupe-deep mt-2 text-sm">
          {project.location} &middot; {formatSqFt(project.areaSqFt)} sq ft
        </p>
        <p className="text-taupe-deep mt-auto pt-4 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
          {statusLabel[project.status]}
        </p>
      </div>
    </Link>
  );
}

/** A real client review (rendered only when the owner supplies reviews). */
export function ReviewCard({ review }: { review: ClientReview }) {
  return (
    <figure className="border-line bg-ivory flex w-full flex-col justify-between border p-6 sm:p-7">
      <span
        aria-hidden="true"
        className="font-heading text-bronze text-6xl leading-none select-none"
      >
        &ldquo;
      </span>
      <blockquote className="font-heading mt-2 text-[1.2rem] leading-snug">
        {review.quote}
      </blockquote>
      <figcaption className="mt-6">
        <span className="block text-sm font-semibold">{review.name}</span>
        {review.project && (
          <span className="text-taupe-deep block text-sm">{review.project}</span>
        )}
      </figcaption>
    </figure>
  );
}
