import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ImageTrio } from "@/components/ui/ImageTrio";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { referenceImages } from "@/content/images";
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
    description: `${service.name} by Lahima In-Des | Architects & Engineers, Chennai.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const [g1, g2, g3] = service.gallery.map((key) => referenceImages[key]);
  const trio = g1 && g2 && g3 ? ([g1, g2, g3] as const) : null;

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

      {service.summary && service.includes && (
        <section className="bg-white py-16 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What it covers"
                title={service.name}
                lead={service.summary}
              />
            </div>
            <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {service.includes.map((item, i) => (
                <RevealItem
                  key={item}
                  as="li"
                  effect="zoom"
                  className="group relative overflow-hidden bg-gradient-to-br from-[#17342c] to-[#2b5a49] p-6 text-white"
                >
                  <span
                    aria-hidden="true"
                    className="bg-bronze-light absolute top-0 left-0 h-[3px] w-10 transition-[width] duration-700 ease-(--ease-out-expo) group-hover:w-full"
                  />
                  <span className="font-heading block text-3xl leading-none text-[#bfe3d3]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-heading mt-4 text-[1.3rem] leading-snug">{item}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
      {trio && (
        <section className="bg-ivory py-16 md:py-24">
          <div className="container-site">
            <SectionHeading
              eyebrow="Gallery"
              title={`${service.name}, in pictures.`}
              lead="Illustrative imagery: design visualizations and reference photographs, not completed projects."
              className="mb-10"
            />
            <ImageTrio
              images={trio}
              ratio="aspect-[4/3] sm:aspect-[16/9]"
              sizes="(min-width: 1280px) 800px, 100vw"
            />
          </div>
        </section>
      )}
      {related.length > 0 && (
        <section className="bg-white py-16 md:py-24">
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
