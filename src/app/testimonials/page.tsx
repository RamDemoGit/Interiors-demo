import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { referenceImages } from "@/content/images";
import { featuredProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials: Share Your Experience",
  description:
    "Worked with Lahima In-Des, interior designers and architects in Chennai? Share your experience with us.",
  path: "/testimonials",
});

const subject = encodeURIComponent("My experience with Lahima In-Des");

const steps = [
  {
    title: "Write to us",
    body: `Send a short message to ${siteConfig.email}, or use the enquiry form.`,
  },
  {
    title: "Name your project",
    body: "Mention the project name or location so we can find your file.",
  },
  {
    title: "Tell us how it went",
    body: "Share what the experience of working with the studio was like, in your own words.",
  },
];

/**
 * Testimonials. No quotes, ratings or review counts are shown: only the
 * "Share your experience" invitation. The quote area stays hidden until real,
 * written-consent testimonials exist (`featureFlags.showTestimonialQuotes`).
 */
export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client voices"
        title="Testimonials"
        lead="Your experience of working with the studio matters to us."
        crumbs={[{ label: "Testimonials" }]}
        image="living"
      />

      <section className="bg-white py-14 sm:py-20 md:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <Photo
              image={referenceImages.dining}
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              parallax
            />
            <div className="bg-sand border-ivory absolute -right-2 -bottom-8 w-[78%] border-[6px] p-5 sm:-right-6 sm:p-7">
              <p className="eyebrow mb-2">Share your experience</p>
              <p className="font-heading text-xl leading-snug sm:text-2xl">
                Worked with {siteConfig.name}?
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <SectionHeading
              eyebrow="How to share"
              title="Three simple steps."
              lead={`If you have worked with ${siteConfig.name}, we would be glad to hear how it went.`}
            />
            <RevealGroup
              as="ol"
              className="border-line mt-10 divide-y divide-[var(--line)] border-y"
            >
              {steps.map((step, i) => (
                <RevealItem key={step.title} as="li" className="flex gap-6 py-6">
                  <span className="font-heading text-bronze text-4xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.5rem] leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-taupe-deep mt-1.5">{step.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={`mailto:${siteConfig.email}?subject=${subject}`}>
                Share your experience
              </ButtonLink>
              <ButtonLink href="/contact#enquiry" variant="secondary">
                Open enquiry form
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory border-line border-t py-14 sm:py-20 md:py-28">
        <div className="container-site">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The work"
              title="See the projects behind the conversation."
            />
            <ArrowLink href="/projects" className="self-start md:self-auto">
              All projects
            </ArrowLink>
          </div>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} ratio="aspect-[4/3]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
