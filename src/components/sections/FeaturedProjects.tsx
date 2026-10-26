import { Reveal } from "@/components/animation/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/content/projects";

/**
 * Six featured projects in an editorial staggered grid (vertical stack on
 * mobile). The GSAP pinned horizontal scroll is added in the animation phase.
 */
export function FeaturedProjects() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Selected work across Chennai and beyond."
          />
          <ArrowLink href="/projects" className="self-start md:self-auto">
            View all projects
          </ArrowLink>
        </div>

        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
          {featuredProjects.map((project, i) => (
            <li
              key={project.slug}
              className={i % 3 === 1 ? "lg:mt-16" : i % 3 === 2 ? "lg:mt-32" : undefined}
            >
              <Reveal
                delay={(i % 3) * 0.08}
                from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "scale"}
              >
                <ProjectCard
                  project={project}
                  ratio={i % 2 === 0 ? "aspect-[4/5]" : "aspect-[16/10]"}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
