import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
/** `light` is for use on espresso / image backgrounds. */
type Tone = "default" | "light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-7 py-3 text-center text-[0.8125rem] leading-snug font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ease-out";

const styles: Record<Variant, Record<Tone, string>> = {
  primary: {
    default: "bg-bronze-deep text-ivory hover:bg-bronze-deeper",
    light: "bg-bronze-deep text-ivory hover:bg-ivory hover:text-espresso",
  },
  secondary: {
    default: "border border-espresso text-espresso hover:bg-espresso hover:text-ivory",
    light: "border border-ivory text-ivory hover:bg-ivory hover:text-espresso",
  },
};

export function buttonClasses(
  variant: Variant = "primary",
  tone: Tone = "default",
  className?: string,
) {
  return cn(base, styles[variant][tone], className);
}

type StyleProps = { variant?: Variant; tone?: Tone };

/** Link rendered as a button (navigation). */
export function ButtonLink({
  variant,
  tone,
  className,
  ...rest
}: StyleProps & ComponentProps<typeof Link>) {
  return <Link className={buttonClasses(variant, tone, className)} {...rest} />;
}

/** Real <button> (actions, form submit). */
export function Button({
  variant,
  tone,
  className,
  type = "button",
  ...rest
}: StyleProps & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClasses(variant, tone, className)} {...rest} />
  );
}
