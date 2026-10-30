import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CenterReveal } from "@/components/animation/ImageFrames";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProject, projects, statusLabel } from "@/content/projects";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { formatSqFt } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title}, ${project.location}`,
    description: `${project.title} in ${project.location}: ${project.category.toLowerCase()} project by Lahima In-Des, Chennai (${statusLabel[project.status].toLowerCase()}).`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const image = project.images[0];
  const service = project.relatedServices.map(getService).find(Boolean);
  const nearby = projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        p.filterTags.some((t) => project.filterTags.includes(t)),
    )
    .slice(0, 3);

  const facts = [
    { label: "Location", value: project.location },
    { label: "Type", value: project.category },
    { label: "Area", value: `${formatSqFt(project.areaSqFt)} sq ft` },
    { label: "Imagery", value: statusLabel[project.status] },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
        image={project.images[0] ?? "hero"}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site">
          {image && (
            <CenterReveal>
              <Photo
                image={image}
                ratio="aspect-[16/10]"
                sizes="(min-width: 1280px) 1200px, 100vw"
                parallax
                reveal={false}
              />
            </CenterReveal>
          )}

          <RevealGroup className="border-line mt-10 grid gap-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <RevealItem key={fact.label} effect="flip">
                <p className="text-taupe-deep text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
                  {fact.label}
                </p>
                <p className="font-heading mt-1.5 text-2xl">{fact.value}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {service && (
            <p className="mt-10">
              Service:{" "}
              <Link
                href={`/services/${service.slug}`}
                className="link-underline text-bronze-deep font-medium"
              >
                {service.name}
              </Link>
            </p>
          )}
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="bg-ivory py-16 md:py-24">
          <div className="container-site">
            <SectionHeading
              eyebrow="More projects"
              title="Related work"
              className="mb-12"
            />
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} ratio="aspect-[4/3]" hover="lift" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
