import { Reveal } from "@/components/animation/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { commercialProjects, statusLabel } from "@/content/projects";
import { formatSqFt } from "@/lib/utils";
import Link from "next/link";

/**
 * Every commercial project (retail, workplaces, hospitality, institutional
 * and architectural concepts) as a photo over a solid green caption panel,
 * so the title, place, type and image status always read clearly.
 */
export function FeaturedProjects() {
  return (
    <section className="bg-ivory py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Commercial work across Chennai, Bengaluru and South India."
          />
          <ArrowLink href="/projects" className="self-start md:self-auto">
            View all projects
          </ArrowLink>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {commercialProjects.map((project, i) => {
            const image = project.images[0];
            if (!image) return null;
            return (
              <li key={project.slug}>
                <Reveal delay={(i % 3) * 0.08} from={i % 3 === 1 ? "scale" : "up"}>
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`${project.title}, ${project.location}`}
                    className="group block touch-manipulation overflow-hidden bg-[#17342c] shadow-[0_22px_45px_-30px_rgba(16,38,31,0.7)] transition-[transform,box-shadow] duration-500 ease-out [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-[0_32px_60px_-30px_rgba(16,38,31,0.85)]"
                  >
                    <Photo
                      image={image}
                      ratio="aspect-[4/3]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      zoomOnHover
                    />
                    <div className="relative bg-gradient-to-br from-[#17342c] to-[#2b5a49] p-6 text-white sm:p-7">
                      <span
                        aria-hidden="true"
                        className="bg-bronze-light absolute top-0 left-0 h-[3px] w-12 transition-[width] duration-700 ease-(--ease-out-expo) group-hover:w-full"
                      />
                      <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[#bfe3d3] uppercase">
                        {project.category} &middot; {project.location}
                      </p>
                      <h3 className="font-heading mt-3 text-[1.5rem] leading-tight text-white md:text-[1.65rem]">
                        {project.title}
                      </h3>
                      <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/25 pt-4 text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
                        <span className="text-white/90">
                          {formatSqFt(project.areaSqFt)} sq ft
                        </span>
                        <span className="flex items-center gap-2 text-white">
                          <span
                            aria-hidden="true"
                            className={
                              project.status === "photograph"
                                ? "bg-bronze-light h-1.5 w-1.5 rounded-full"
                                : "h-1.5 w-1.5 rounded-full border border-white"
                            }
                          />
                          {statusLabel[project.status]}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
