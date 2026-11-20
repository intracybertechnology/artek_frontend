import { Phone } from "lucide-react";
import { company } from "@/data/company";
import { useScrolled } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * Mobile-only floating call button — fixed bottom-right.
 * Appears after the user scrolls past the hero (64px).
 * Hidden on sm+ where the topbar already shows the phone number.
 */
export function FloatingCallButton() {
  const visible = useScrolled(64);

  return (
    <a
      href={company.phoneHref}
      aria-label={`Call us: ${company.phoneDisplay}`}
      className={cn(
        "fixed bottom-6 right-5 z-50 flex items-center gap-2 sm:hidden",
        "h-13 rounded-full bg-white pl-4 pr-5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
        "text-[13px] font-semibold text-surface",
        "transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none",
      )}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface">
        <Phone className="size-3.5 text-white" aria-hidden="true" />
      </span>
      {company.phoneDisplay}
    </a>
  );
}
