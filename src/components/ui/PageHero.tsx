import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HeroParallax } from "@/components/animation/ScrollEffects";
import { referenceImages, type ReferenceKey } from "@/content/images";
import type { ProjectImage } from "@/content/types";

export type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  /** Interior image used as the banner background. */
  image?: ReferenceKey | ProjectImage;
  /** Alignment of the image focal point. */
  focal?: string;
  /** How the title panel enters: each page picks its own. */
  variant?: "curtain" | "slide" | "zoom" | "drop";
};

/**
 * Page banner. The photo stays sharp (only a very light shade at the bottom);
 * the title sits in a clean beige panel so text is always readable (AA).
 * The background image is decorative (alt="").
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image = "living",
  focal,
  variant = "slide",
}: Props) {
  const bg = typeof image === "string" ? referenceImages[image] : image;

  return (
    <section className="bg-espresso relative isolate overflow-hidden">
      <HeroParallax className="-z-20">
        <Image
          src={bg.src}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="kb object-cover"
          style={
            {
              objectPosition: focal ?? "center 55%",
              "--kb-s": 1.1,
              "--kb-t": "20s",
            } as CSSProperties
          }
        />
      </HeroParallax>
      <div
        aria-hidden="true"
        className="from-espresso/35 absolute inset-0 -z-10 bg-gradient-to-t via-transparent to-transparent"
      />

      <div className="container-site flex min-h-[19rem] items-end pt-24 pb-6 sm:min-h-[21rem] sm:items-center sm:py-10 lg:min-h-[24rem] lg:py-20">
        <div
          className={`panel-${variant} bg-ivory/95 border-bronze relative w-full max-w-xl border-l-4 p-5 shadow-[0_24px_50px_-28px_rgba(53,44,39,0.55)] backdrop-blur-sm sm:p-7`}
        >
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="text-taupe-deep flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
                <li>
                  <Link href="/" className="link-underline hover:text-espresso">
                    Home
                  </Link>
                </li>
                {crumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    {crumb.href && i < crumbs.length - 1 ? (
                      <Link
                        href={crumb.href}
                        className="link-underline hover:text-espresso"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-espresso">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className="eyebrow anim-rise mb-4 flex items-center gap-4">
              <span aria-hidden="true" className="anim-line bg-bronze h-px w-10" />
              {eyebrow}
            </p>
          )}
          <h1
            className="anim-rise text-[clamp(1.8rem,1.2rem+2.4vw,3rem)] leading-[1.08]"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            {title}
          </h1>
          {lead && (
            <p
              className="anim-rise text-taupe-deep mt-3 max-w-lg text-base leading-relaxed"
              style={{ "--d": "0.25s" } as CSSProperties}
            >
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
