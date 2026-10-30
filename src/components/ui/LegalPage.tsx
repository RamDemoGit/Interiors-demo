import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { LegalToc } from "@/components/ui/LegalToc";
import { PageHero } from "@/components/ui/PageHero";
import { LEGAL_LAST_UPDATED, legalDocs, type LegalDoc } from "@/content/legal";
import { cn } from "@/lib/utils";

/** Shared layout for Privacy, Terms, Cookie and Disclaimer pages. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        lead={`Last updated ${LEGAL_LAST_UPDATED}`}
        crumbs={[{ label: doc.title }]}
        image="office"
      />

      <section className="bg-white py-14 sm:py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4">On this page</p>
              <nav aria-label="On this page">
                <LegalToc sections={doc.sections} />
              </nav>

              <p className="eyebrow mt-10 mb-4">Related</p>
              <ul className="space-y-1">
                {legalDocs
                  .filter((d) => d.slug !== doc.slug)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/${d.slug}`}
                        className="link-underline text-bronze-deep inline-flex min-h-9 items-center text-sm font-medium"
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)]">
                {doc.intro}
              </p>
            </Reveal>

            <div className="mt-12 space-y-12">
              {doc.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="border-line border-t pt-8">
                  <h2 className="font-heading text-[clamp(1.5rem,1.2rem+1.1vw,2rem)] leading-tight">
                    <span className="text-bronze-deep font-body mr-3 align-middle text-xs tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  <div className={cn("text-taupe-deep mt-5 space-y-4 text-[1.0625rem]")}>
                    {s.paragraphs?.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {s.list && (
                      <ul className="space-y-3">
                        {s.list.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="bg-bronze mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
