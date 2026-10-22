import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Inline text link with the underline-grow hover (bronze on ivory). */
export function TextLink({ className, ...rest }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn("link-underline text-bronze-deep font-medium", className)}
      {...rest}
    />
  );
}
