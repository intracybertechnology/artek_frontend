import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export interface QuoteSidebarLink {
  label: string;
  to: string;
}

interface QuoteSidebarProps {
  /**
   * URL the "Request a Free Quote" button links to.
   * Solutions pages pass "/contact"; product/brand pages pass
   * "/contact?message=..." to carry context into the form.
   */
  quoteTo: string;
  /** Small uppercase label above the related links (e.g. "Related solutions"). */
  relatedLabel: string;
  /** Links shown in the related box. */
  relatedLinks: readonly QuoteSidebarLink[];
  /** The "see all" link at the bottom of the related box (e.g. "All solutions →"). */
  allLink: { label: string; to: string };
}

/**
 * Sidebar shared between Solutions pages and product/brand detail pages.
 *
 * Matches Ram's Solutions page sidebar exactly:
 *   - Dark card: "Start with a free quote", paragraph, white "Request a Free
 *     Quote" button, outlined phone button with the company number.
 *   - Bordered box: uppercase muted label, plain text links (no arrows per
 *     row), "See all →" link in accent colour.
 */
export function QuoteSidebar({ quoteTo, relatedLabel, relatedLinks, allLink }: QuoteSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      {/* Quote card — matches Ram's bg-navy-950 card */}
      <div className="rounded-xl bg-navy-950 p-6 text-white">
        <h2 className="text-lg font-semibold">Start with a free quote</h2>
        <p className="mt-2 text-sm text-slate-300">
          Tell us what you need and we&apos;ll respond with a tailored proposal.
        </p>
        <Button asChild className="mt-4 w-full">
          <Link to={quoteTo}>Request a Free Quote</Link>
        </Button>
        <a
          href={company.phoneHref}
          className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <Phone className="size-4" aria-hidden="true" />
          {company.phoneDisplay}
        </a>
      </div>

      {/* Related links box — matches Ram's border border-white/10 nav */}
      {relatedLinks.length > 0 && (
        <nav aria-label={relatedLabel} className="rounded-xl border border-white/10 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            {relatedLabel}
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            {relatedLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-medium text-slate-200 underline-offset-4 transition-colors hover:text-accent-600 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={allLink.to}
                className="inline-flex items-center gap-1 text-accent-600 underline-offset-4 hover:underline"
              >
                {allLink.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </aside>
  );
}
