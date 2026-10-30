import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { statusLabel } from "@/content/projects";
import type { Project } from "@/content/types";
import { cn, formatSqFt } from "@/lib/utils";

type Props = {
  project: Project;
  ratio?: string;
  sizes?: string;
  className?: string;
  reveal?: boolean;
  /**
   * Hover personality, so every page's cards feel different:
   * zoom (home), frame (projects), color (services), caption (testimonials),
   * lift (project pages).
   */
  hover?: "zoom" | "frame" | "color" | "caption" | "lift";
};

/**
 * Project card. Hover (pointer devices only): image zoom 1.04, bronze underline
 * draws in, "View project" label slides up. Touch has no hover dependency.
 */
export function ProjectCard({
  project,
  ratio = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
  reveal = true,
  hover = "zoom",
}: Props) {
  const image = project.images[0];
  if (!image) return null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block touch-manipulation",
        hover === "lift" &&
          "transition-[transform,box-shadow] duration-500 ease-out [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:shadow-[0_30px_55px_-30px_rgba(53,44,39,0.5)]",
        className,
      )}
      aria-label={`${project.title}, ${project.location}`}
    >
      <div className="relative overflow-hidden">
        <Photo
          image={image}
          ratio={ratio}
          sizes={sizes}
          zoomOnHover={hover === "zoom" || hover === "frame"}
          reveal={reveal}
          imgClassName={cn(
            hover === "color" &&
              "grayscale-[0.75] transition-[filter,transform] duration-700 [@media(hover:hover)]:group-hover:scale-[1.03] [@media(hover:hover)]:group-hover:grayscale-0",
          )}
        />
        {hover === "frame" && (
          <span
            aria-hidden="true"
            className="border-ivory/80 pointer-events-none absolute inset-4 scale-[0.93] border opacity-0 transition-[transform,opacity] duration-700 ease-(--ease-out-expo) [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}
        {hover === "caption" && (
          <span
            aria-hidden="true"
            className="from-espresso/85 pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-end bg-gradient-to-t to-transparent p-5 pt-16 text-[0.75rem] font-semibold tracking-[0.2em] text-white uppercase transition-transform duration-500 ease-(--ease-out-expo) [@media(hover:hover)]:group-hover:translate-y-0"
          >
            View project &rarr;
          </span>
        )}
      </div>{" "}
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-[1.5rem] leading-tight md:text-[1.75rem]">
            {project.title}
          </h3>
          <span
            aria-hidden="true"
            className="text-bronze-deep mt-1 hidden text-[0.6875rem] font-semibold tracking-[0.18em] whitespace-nowrap uppercase [@media(hover:hover)]:block [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-[transform,opacity] [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100"
          >
            View project
          </span>
        </div>
        <p className="text-taupe-deep mt-1.5 text-sm">
          {project.location} &middot; {project.category} &middot;{" "}
          {formatSqFt(project.areaSqFt)} sq ft
        </p>
        <p className="mt-3 flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
          <span
            aria-hidden="true"
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              project.status === "photograph" ? "bg-bronze-deep" : "border-taupe border",
            )}
          />
          <span
            className={
              project.status === "photograph" ? "text-bronze-deep" : "text-taupe-deep"
            }
          >
            {statusLabel[project.status]}
          </span>
        </p>
        <span
          aria-hidden="true"
          className="bg-bronze mt-4 block h-px origin-left scale-x-0 transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100"
        />
      </div>
    </Link>
  );
}
