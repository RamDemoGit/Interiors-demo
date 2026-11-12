import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Large flower mark sits on top of the last word (In-Des). */
export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.legalName} - Home`}
      className={cn("group inline-flex shrink-0 flex-col leading-none", className)}
    >
      <span className="inline-flex items-end gap-2 whitespace-nowrap min-[400px]:gap-2.5">
        <span className="font-heading text-[1.05rem] font-semibold tracking-[0.1em] uppercase min-[400px]:text-[1.25rem] min-[400px]:tracking-[0.14em] sm:text-[1.45rem]">
          Lahima
        </span>
        <span className="inline-flex flex-col items-end">
          <Image
            src="/logos/lahima-mark.png"
            alt=""
            aria-hidden="true"
            width={700}
            height={713}
            priority
            sizes="40px"
            className="-mb-0.5 h-7 w-auto shrink-0 transition-transform duration-700 ease-(--ease-out-expo) group-hover:rotate-[90deg] min-[400px]:h-8 sm:h-9"
          />
          <span className="font-heading text-bronze-deep text-[1.05rem] font-semibold tracking-[0.1em] uppercase min-[400px]:text-[1.25rem] min-[400px]:tracking-[0.14em] sm:text-[1.45rem]">
            In-Des
          </span>
        </span>
      </span>
    </Link>
  );
}
