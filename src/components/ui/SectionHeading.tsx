"use client";

import { m, type Variants } from "motion/react";
import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/** Plain text of a node if it only contains text / fragments, else null. */
function plainText(node: ReactNode): string | null {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (node == null || typeof node === "boolean") return "";
  if (Array.isArray(node)) {
    const parts = node.map(plainText);
    return parts.some((p) => p === null) ? null : parts.join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node) && node.type === Fragment) {
    return plainText(Children.toArray(node.props.children));
  }
  return null;
}

const words: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};
const word: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

/** Heading whose words rise out of a mask, one after another. */
function WordRise({ text }: { text: string }) {
  return (
    <>
      <m.span
        className="block"
        variants={words}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      >
        {text
          .trim()
          .split(/\s+/)
          .map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
            >
              <m.span className="inline-block" variants={word}>
                {w}
                {"\u00a0"}
              </m.span>
            </span>
          ))}
      </m.span>
    </>
  );
}

/** Eyebrow (with a drawn rule) + masked word-rise heading + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className,
}: Props) {
  const text = plainText(title);
  return (
    <div
      className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-5 flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <m.span
            aria-hidden="true"
            className="bg-bronze h-px w-10 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <Reveal as="span" y={10}>
            {eyebrow}
          </Reveal>
        </p>
      )}
      <Tag>{text !== null ? <WordRise text={text} /> : title}</Tag>
      {lead && (
        <Reveal delay={0.15} y={18}>
          <p className="text-taupe-deep mt-6 max-w-2xl text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)]">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
