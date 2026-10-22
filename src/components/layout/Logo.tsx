import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Monogram + text wordmark. Swap for the real logo once `TODO_VERIFY_LOGO_PATH`
 * is supplied (needs final dimensions, so it is intentionally not wired yet).
 */
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
      <span
        aria-hidden="true"
        className="font-heading border-bronze text-bronze-deep group-hover:bg-bronze-deep grid h-9 w-9 shrink-0 place-items-center border text-[1.6rem] leading-none font-semibold transition-colors duration-500 group-hover:text-white min-[400px]:h-10 min-[400px]:w-10 sm:h-11 sm:w-11"
      >
        L
      </span>
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
