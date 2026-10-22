"use client";

import { useState } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projectFilters } from "@/content/projects";
import type { Project, ProjectFilter } from "@/content/types";
import { cn } from "@/lib/utils";

type FilterValue = ProjectFilter | "all";

const isFilter = (value: string | undefined): value is FilterValue =>
  !!value && projectFilters.some((f) => f.value === value);

/**
 * Filterable project grid. Filter chips are real links (`?type=`) so filtered
 * views are crawlable/shareable; clicking filters instantly on the client and
 * updates the URL without a reload.
 */
export function ProjectsExplorer({
  projects,
  initialType,
}: {
  projects: Project[];
  initialType?: string;
}) {
  const [type, setType] = useState<FilterValue>(
    isFilter(initialType) ? initialType : "all",
  );

  const visible =
    type === "all" ? projects : projects.filter((p) => p.filterTags.includes(type));

  return (
    <div>
      <nav aria-label="Filter projects" className="mb-12">
        <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {projectFilters.map((filter) => {
            const active = filter.value === type;
            return (
              <li key={filter.value} className="shrink-0">
                <a
                  href={
                    filter.value === "all"
                      ? "/projects"
                      : `/projects?type=${filter.value}`
                  }
                  aria-current={active ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setType(filter.value);
                    window.history.replaceState(
                      null,
                      "",
                      filter.value === "all"
                        ? "/projects"
                        : `/projects?type=${filter.value}`,
                    );
                  }}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-sm border px-5 text-[0.75rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300",
                    active
                      ? "border-bronze-deep bg-bronze-deep text-white"
                      : "border-line text-espresso hover:border-bronze-deep hover:text-bronze-deep",
                  )}
                >
                  {filter.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <RevealGroup
        key={type}
        as="ul"
        className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project) => (
          <RevealItem key={project.slug} as="li">
            <ProjectCard project={project} ratio="aspect-[4/3]" reveal={false} />
          </RevealItem>
        ))}
      </RevealGroup>

      {visible.length === 0 && (
        <p className="text-taupe-deep">No projects in this category yet.</p>
      )}
    </div>
  );
}
