import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.name} in Chennai`,
    description: `${service.name} by Lahima In-Des | Architects & Engineers, T. Nagar, Chennai.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projects
    .filter((p) => p.relatedServices.includes(service.slug))
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={service.name}
        crumbs={[{ label: "Our Services", href: "/services" }, { label: service.name }]}
        image={service.image}
      />

      {related.length > 0 && (
        <section className="bg-ivory py-16 md:py-24">
          <div className="container-site">
            <SectionHeading
              eyebrow="Related projects"
              title="From the portfolio"
              className="mb-12"
            />
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} ratio="aspect-[4/3]" hover="color" />
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
