"use client";

import Image from "next/image";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ReferenceBadge } from "@/components/ui/ReferenceBadge";
import type { ProjectImage } from "@/content/types";
import { cn } from "@/lib/utils";

type PhotoProps = {
  image: ProjectImage;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]" or "aspect-[16/10]". */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  /** Clip-path reveal when scrolled into view. */
  reveal?: boolean;
  /** Subtle parallax (max ~40px, desktop only). */
  parallax?: boolean;
  /** Mark as stock/reference imagery (shows a chip while the flag is on). */
  reference?: boolean;
  className?: string;
  imgClassName?: string;
  /** Zoom the image on hover of the closest `.group`. */
  zoomOnHover?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Photo({
  image,
  ratio = "aspect-[4/5]",
  sizes,
  priority,
  reveal = true,
  parallax = false,
  reference = true,
  className,
  imgClassName,
  zoomOnHover = false,
}: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const enableParallax = parallax && desktop && !reduce;

  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={cn(
        "absolute inset-0 h-full w-full object-cover",
        zoomOnHover &&
          "transition-transform duration-[900ms] ease-(--ease-out-expo) group-hover:scale-[1.04]",
        enableParallax && "scale-[1.12]",
        imgClassName,
      )}
    />
  );

  return (
    <m.div
      ref={ref}
      className={cn("bg-sand relative overflow-hidden", ratio, className)}
      initial={reveal ? { clipPath: "inset(0 0 100% 0)" } : false}
      whileInView={reveal ? { clipPath: "inset(0 0 0% 0)" } : undefined}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {enableParallax ? (
        <m.div style={{ y }} className="absolute inset-0">
          {img}
        </m.div>
      ) : (
        img
      )}
      {reference && <ReferenceBadge />}
    </m.div>
  );
}
