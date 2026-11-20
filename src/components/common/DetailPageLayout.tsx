import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { whatsappLink } from "@/data/catalog";
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
  primaryCta: { label: string; href: string };
  callHref: string;
  sidebarTitle: string;
  sidebarLinks: readonly SidebarLink[];
  children: ReactNode;
  bottomCtaTitle: string;
  quoteMessage: string;
  /** SEO data — rendered by SEOHead in MainLayout via resolvePageSeo, not here. */
  seo: DetailPageSeo;
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
 * Structure: dark hero → breadcrumb strip → main content + sticky sidebar
 * (quote card + related links) → bottom CTA band.
 *
 * SEO (title, description, canonical, JSON-LD) is handled globally by
 * SEOHead in MainLayout via resolvePageSeo(path) — the `seo` prop here
 * documents the expected metadata but is not rendered directly.
 */
export function DetailPageLayout({
  title,
  intro,
  breadcrumbs,
  primaryCta,
  callHref,
  sidebarTitle,
  sidebarLinks,
  children,
  bottomCtaTitle,
  quoteMessage,
  seo: _seo,
}: DetailPageLayoutProps) {
  const wa = whatsappLink(quoteMessage);

  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="bg-navy-950 pb-16 pt-32 text-white">
        <div className="container-page">
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-4xl text-pretty text-lg text-slate-200">{intro}</p>
          <div className="mt-5 h-1 w-28 rounded bg-accent" />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
              >
                <FaWhatsapp className="size-4" aria-hidden="true" />
                Get a quote
              </a>
            )}
            <a
              href={callHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-[15px] font-semibold text-navy-950 transition-colors hover:bg-slate-100"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call now
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
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div className="min-w-0">{children}</div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {/* Quote card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="bg-navy-950 px-5 py-3">
                <p className="text-sm font-bold text-white">Get a quote</p>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600">
                  Tell us what you need and we will reply with a clear quote.
                </p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <Button asChild size="lg" className="w-full">
                    <Link to={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
                    >
                      <FaWhatsapp className="size-4" aria-hidden="true" />
                      WhatsApp
                    </a>
                  )}
                </div>
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                  <a href={callHref} className="flex items-center gap-2 text-slate-600 transition-colors hover:text-accent-600">
                    <Phone className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                    {company.phoneDisplay}
                  </a>
                  {company.email && (
                    <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-slate-600 transition-colors hover:text-accent-600">
                      <Mail className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                      {company.email}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Related card */}
            {sidebarLinks.length > 0 && (
              <div className="rounded-2xl bg-mist-2 p-5">
                <h2 className="text-sm font-bold text-ink">{sidebarTitle}</h2>
                <div className="mt-2 h-0.5 w-12 rounded bg-accent" />
                <ul className="mt-4 space-y-2">
                  {sidebarLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm transition-all hover:shadow-md"
                      >
                        <span className="truncate">{link.label}</span>
                        <ArrowRight className="size-4 shrink-0 text-accent-600" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-2xl text-2xl font-bold text-text sm:text-3xl">
            Looking for <span className="text-accent">{bottomCtaTitle}</span>?
          </h2>
          <Button asChild size="lg">
            <Link to="/contact">Enquire now</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
