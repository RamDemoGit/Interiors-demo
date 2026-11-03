import { Reveal } from "@/components/animation/Reveal";
import { Photo } from "@/components/ui/Photo";
import type { ProjectImage } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
  /** Exactly three images: one large, two stacked beside it. */
  images: readonly [ProjectImage, ProjectImage, ProjectImage];
  /** Tailwind aspect utility for the whole block. */
  ratio?: string;
  sizes?: string;
  className?: string;
};

/**
 * Three images in one block: a large frame (left, two rows) and two smaller
 * frames stacked on the right. The frames reveal one after another and each
 * zooms gently on hover. Use wherever a topic needs more than one image.
 */
export function ImageTrio({
  images,
  ratio = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 58vw, 100vw",
  className,
}: Props) {
  const [main, top, bottom] = images;
  const cell = "group relative min-h-0 overflow-hidden";

  return (
    <div
      className={cn("grid grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2", ratio, className)}
    >
      <Reveal from="scale" className={cn(cell, "col-span-2 row-span-2")}>
        <Photo
          image={main}
          ratio=""
          className="h-full"
          sizes={sizes}
          reveal={false}
          zoomOnHover
        />
      </Reveal>
      <Reveal from="scale" delay={0.12} className={cell}>
        <Photo
          image={top}
          ratio=""
          className="h-full"
          sizes="(min-width: 1024px) 20vw, 34vw"
          reveal={false}
          reference={false}
          zoomOnHover
        />
      </Reveal>
      <Reveal from="scale" delay={0.24} className={cell}>
        <Photo
          image={bottom}
          ratio=""
          className="h-full"
          sizes="(min-width: 1024px) 20vw, 34vw"
          reveal={false}
          reference={false}
          zoomOnHover
        />
      </Reveal>
    </div>
  );
}
