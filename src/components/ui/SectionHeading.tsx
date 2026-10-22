import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/** Eyebrow + serif heading + optional lead, with a drawn bronze rule. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-5 flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden="true" className="bg-bronze h-px w-10" />
          {eyebrow}
        </p>
      )}
      <Tag>{title}</Tag>
      {lead && (
        <p className="text-taupe-deep mt-6 max-w-2xl text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)]">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
