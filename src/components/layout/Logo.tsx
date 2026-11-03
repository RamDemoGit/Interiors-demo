import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Four-petal mark (public/logos/lahima-mark.png) beside the text wordmark. */
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
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap min-[400px]:gap-3",
        className,
      )}
    >
      <Image
        src="/logos/lahima-mark.png"
        alt=""
        aria-hidden="true"
        width={700}
        height={713}
        priority
        sizes="48px"
        className="h-9 w-auto shrink-0 transition-transform duration-700 ease-(--ease-out-expo) group-hover:rotate-[90deg] min-[400px]:h-10 sm:h-12"
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.05rem] font-semibold tracking-[0.1em] uppercase min-[400px]:text-[1.25rem] min-[400px]:tracking-[0.14em] sm:text-[1.45rem]">
          Lahima <span className="text-bronze-deep">In-Des</span>
        </span>
        <span className="text-taupe-deep mt-1.5 text-[0.5rem] font-semibold tracking-[0.24em] uppercase min-[400px]:text-[0.5625rem] min-[400px]:tracking-[0.3em] sm:text-[0.625rem]">
          {siteConfig.shortDescriptor}
        </span>
      </span>
    </Link>
  );
}
