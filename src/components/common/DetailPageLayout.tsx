import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { QuoteSidebar } from "@/components/common/QuoteSidebar";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import type { BreadcrumbItem, JsonLdObject } from "@/types";

interface SidebarLink {
  label: string;
  to: string;
}

export interface DetailPageSeo {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  jsonLd?: readonly JsonLdObject[];
}

interface DetailPageLayoutProps {
  title: string;
  intro: string;
  breadcrumbs: readonly BreadcrumbItem[];
  /**
   * URL the "Request a Free Quote" button links to — passed straight through
   * to QuoteSidebar.quoteTo and used in the hero primary CTA.
   * Callers pass e.g. "/contact?message=I'm+interested+in+Cat6+Cable".
   */
  primaryCta: { label: string; href: string };
  callHref: string;
  /** Uppercase label above the related links box, e.g. "MORE COPPER CABLING". */
  sidebarTitle: string;
  sidebarLinks: readonly SidebarLink[];
  /** "See all" link at the bottom of the related box. */
  sidebarAllLink: { label: string; to: string };
  children: ReactNode;
  bottomCtaTitle: string;
  /** SEO data — rendered by SEOHead in MainLayout via resolvePageSeo, not here. */
  seo: DetailPageSeo;
  /** Optional brand accent colour (hex) — set as --brand-accent on the wrapper; only the hero accent line and the model card top borders consume it. */
  accent?: string;
}

/** Neutral trust ticks — no claims about warranties, dealers or stock. */
const TRUST_TICKS = [
  "Supplied in Dubai and the UAE",
  "Quotes on request",
  "Call or WhatsApp our team",
];

/**
 * Shared page template for product and brand detail pages.
 *
 * Uses the same QuoteSidebar as the Solutions pages so both look identical.
 * Hero CTAs match Ram's Solutions hero: white "Request a Free Quote" primary,
 * outlined phone button secondary.
 */
export function DetailPageLayout({
  title,
  intro,
  breadcrumbs,
  primaryCta,
  callHref,
  sidebarTitle,
  sidebarLinks,
  sidebarAllLink,
  children,
  bottomCtaTitle,
  seo: _seo,
  accent,
}: DetailPageLayoutProps) {
  return (
    <article
      style={accent ? ({ "--brand-accent": accent } as CSSProperties) : undefined}
    >
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="bg-navy-950 pb-16 pt-32 text-white">
        <div className="container-page">
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-4xl text-pretty text-lg text-slate-200">{intro}</p>
          <div
            className="mt-5 h-1 w-28 rounded bg-accent"
            style={accent ? { backgroundColor: "var(--brand-accent)" } : undefined}
          />
          {/* Hero CTAs match Ram's Solutions hero */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to={primaryCta.href}>
                Request a Free Quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <a
              href={callHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-7 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {company.phoneDisplay}
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_TICKS.map((tick) => (
              <li key={tick} className="flex items-center gap-2 text-sm text-slate-300">
                <Check className="size-4 text-accent" aria-hidden="true" />
                {tick}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ── Breadcrumb strip ──────────────────────────────────────── */}
      <div className="border-b border-white/10 bg-mist-2 py-3">
        <div className="container-page">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* ── Main + sidebar ────────────────────────────────────────── */}
      <section className="bg-mist-2 py-10 sm:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          {/* Main content */}
          <div className="min-w-0">{children}</div>

          {/* Sidebar — same component as Solutions pages */}
          <QuoteSidebar
            quoteTo={primaryCta.href}
            relatedLabel={sidebarTitle}
            relatedLinks={sidebarLinks}
            allLink={sidebarAllLink}
          />
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal as="h2" className="max-w-2xl text-2xl font-bold text-text sm:text-3xl">
            Looking for <span className="text-accent">{bottomCtaTitle}</span>?
          </Reveal>
          <Button asChild size="lg">
            <Link to="/contact">Enquire now</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
