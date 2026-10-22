import Link from "next/link";
import type { ReactNode } from "react";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { contactActions, type ContactAction } from "@/lib/contact";
import { cn } from "@/lib/utils";

const icons: Record<ContactAction["key"], ReactNode> = {
  call: <PhoneIcon />,
  book: <CalendarIcon />,
  whatsapp: <WhatsAppIcon />,
};

/** Solid colour per action (all keep 4.5:1 contrast with white text). */
const tone: Record<ContactAction["key"], string> = {
  call: "bg-espresso hover:bg-black",
  book: "bg-bronze-deep hover:bg-bronze-deeper",
  whatsapp: "bg-[#17794c] hover:bg-[#10603b]",
};

function ActionLink({
  action,
  className,
  children,
}: {
  action: ContactAction;
  className?: string;
  children: ReactNode;
}) {
  const common = {
    className,
    "aria-label": action.label,
  };
  return action.external ? (
    <a
      href={action.href}
      {...(action.key === "whatsapp"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...common}
    >
      {children}
    </a>
  ) : (
    <Link href={action.href} {...common}>
      {children}
    </Link>
  );
}

/**
 * Mobile/tablet: sticky bottom bar with Call, Book Us and WhatsApp.
 * Desktop (lg+): slim vertical dock fixed to the middle of the right edge;
 * each button slides out its label on hover/focus.
 */
export function ContactDock() {
  return (
    <>
      {/* Mobile + tablet bottom bar */}
      <nav
        aria-label="Quick contact"
        className="border-line fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-18px_rgba(53,44,39,0.45)] lg:hidden"
      >
        {contactActions.map((action) => (
          <ActionLink
            key={action.key}
            action={action}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 px-2 py-2 text-[0.6875rem] font-semibold tracking-[0.1em] text-white uppercase transition-colors",
              tone[action.key],
            )}
          >
            {icons[action.key]}
            <span>{action.label}</span>
          </ActionLink>
        ))}
      </nav>

      {/* Desktop side dock */}
      <nav
        aria-label="Quick contact"
        className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      >
        {contactActions.map((action) => (
          <ActionLink
            key={action.key}
            action={action}
            className={cn(
              "group flex h-14 w-14 flex-row-reverse items-center overflow-hidden rounded-l-sm text-white shadow-[0_10px_26px_-12px_rgba(53,44,39,0.6)] transition-[width,background-color] duration-500 ease-(--ease-out-expo) hover:w-40 focus-visible:w-40",
              tone[action.key],
            )}
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center">
              {icons[action.key]}
            </span>
            <span className="pl-5 text-[0.75rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase">
              {action.label}
            </span>
          </ActionLink>
        ))}
      </nav>
    </>
  );
}
