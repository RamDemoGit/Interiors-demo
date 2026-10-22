import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { referenceImages, type ReferenceKey } from "@/content/images";
import type { ProjectImage } from "@/content/types";

export type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  /** Interior reference image used as the banner background. */
  image?: ReferenceKey | ProjectImage;
  /** Alignment of the image focal point. */
  focal?: string;
};

/**
 * Page banner: interior photo background with a soft beige wash so the dark
 * text stays readable (WCAG AA), breadcrumb, serif H1 and a CSS-only entrance.
 * The background image is decorative (alt="").
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image = "living",
  focal,
}: Props) {
  const bg = typeof image === "string" ? referenceImages[image] : image;

  return (
    <section className="border-line bg-ivory relative isolate overflow-hidden border-b">
      <Image
        src={bg.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="anim-settle -z-20 object-cover"
        style={{ objectPosition: focal ?? "center 55%" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(245,241,234,0.97)_0%,rgba(245,241,234,0.9)_42%,rgba(245,241,234,0.35)_100%)] max-md:bg-[linear-gradient(180deg,rgba(245,241,234,0.9)_0%,rgba(245,241,234,0.72)_100%)]"
      />
      <div className="container-site py-14 sm:py-20 lg:py-28">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
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
          <p className="eyebrow anim-rise mb-5 flex items-center gap-4">
            <span aria-hidden="true" className="anim-line bg-bronze h-px w-10" />
            {eyebrow}
          </p>
        )}
        <h1
          className="anim-rise max-w-4xl text-[clamp(2.4rem,1.2rem+4.4vw,4.75rem)]"
          style={{ "--d": "0.1s" } as CSSProperties}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="anim-rise text-espresso/85 mt-6 max-w-2xl text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)]"
            style={{ "--d": "0.25s" } as CSSProperties}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
