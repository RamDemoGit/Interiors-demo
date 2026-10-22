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
}: Props) {
  const image = project.images[0];
  if (!image) return null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
      aria-label={`${project.title}, ${project.location}`}
    >
      <Photo image={image} ratio={ratio} sizes={sizes} zoomOnHover reveal={reveal} />
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
