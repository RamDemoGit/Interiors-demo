import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Interior Design Projects in Chennai",
  description:
    "Residential, commercial, hospitality and institutional interior and architecture projects by Lahima In-Des, Chennai.",
  path: "/projects",
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected projects"
        lead="Each project is labelled as a photograph of completed work or a design visualization."
        crumbs={[{ label: "Projects" }]}
        image="architectureConcept"
        variant="zoom"
      />
      <section className="bg-white py-14 md:py-20">
        <div className="container-site">
          <ProjectsExplorer projects={projects} initialType={type} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
