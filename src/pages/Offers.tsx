import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bell, Cctv, Check, Headset, Phone, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { Reveal } from "@/components/common/Reveal";
import { SpecularButton } from "@/components/common/SpecularButton";
import { company } from "@/data/company";
import { offer, offerCopy, offerFaqs, offerPercent } from "@/data/offers";
import "./Offers.css";

/**
 * /offers — CCTV installation offer (conversion landing page).
 *
 * The draft notice shows while the offer is a draft, but it is never part of
 * the customer-facing design: open /offers?preview=1 to hide it. While the
 * offer is a draft the page is also noindex and out of the sitemap.
 * Copy lives in data/offers.ts; motion respects prefers-reduced-motion
 * (Offers.css).
 */

const POINT_ICONS = [Cctv, Wind, Bell, Headset] as const;

const CTA = "/contact?intent=offer";

/** Renders *asterisk-wrapped* parts of the headline through `wrap`. */
function highlighted(text: string, wrap: (part: string) => ReactNode) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i}>{wrap(part.slice(1, -1))}</span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const AT_A_GLANCE = [
  { label: "Saving", value: offerCopy.savingFact },
  { label: "Valid until", value: offer.validUntil },
  { label: "Minimum", value: offer.minimum },
  { label: "Area", value: "Dubai; other emirates on request" },
] as const;

export default function Offers() {
  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="offer-hero overflow-hidden pt-28">
        <div className="offer-hero__glow" aria-hidden="true" />
        <div className="container-page relative pb-14 sm:pb-20">
          <div className="[&_a]:text-slate-400 [&_span]:text-slate-400">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Offers", to: "/offers" }]} />
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            {/* Left: message */}
            <div className="hero-fade">
              <p className="offer-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {offer.badge}
              </p>
              <h1 className="mt-5 max-w-[34rem] text-[clamp(2rem,1.45rem+2.2vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-text">
                {highlighted(offer.headline, (part) => <span className="offer-highlight">{part}</span>)}
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-text-muted sm:text-[17px]">
                {offer.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SpecularButton to={CTA}>
                  {offerCopy.headlineCta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </SpecularButton>
                <a href={company.phoneHref} className="offer-phone">
                  <Phone className="size-4" aria-hidden="true" />
                  Call {company.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Right: the offer made visual */}
            <div className="relative min-w-0">
              <div className="offer-offer-panel">
                <div className="offer-cam" aria-hidden="true">
                  <div className="offer-cam__beam" />
                  <div className="offer-cam__body">
                    <Cctv className="size-9" strokeWidth={1.4} />
                    <span className="offer-cam__live"><i />LIVE</span>
                  </div>
                  <p className="offer-cam__caption">Professional CCTV installation</p>
                </div>

                <div className="offer-discount">
                  <span className="offer-discount__value">{offerPercent}%</span>
                  <span className="offer-discount__label">OFF</span>
                </div>

                <dl className="offer-glance">
                  {AT_A_GLANCE.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>

                <Link to={CTA} className="offer-panel__cta">
                  Claim your offer
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="offer-ticker" aria-label="Offer highlights">
          <div className="offer-ticker__track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <ul key={copy} className="offer-ticker__group">
                {[...offerCopy.ticker, `Valid until ${offer.validUntil}`].map((t) => (
                  <li key={t}>
                    <span className="offer-ticker__dot" />
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-surface py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,30rem)] lg:gap-14">
          <div className="min-w-0 max-w-2xl space-y-14">
            {/* Pitch */}
            <section className="min-w-0">
              <Reveal>
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">Don&apos;t wait for a close call.</h2>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-text-muted sm:text-base">
                  {offer.pitch}
                </p>
              </Reveal>
            </section>

            {/* What you get */}
            <section className="min-w-0">
              <Reveal>
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">What&apos;s included</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{offerCopy.includesNote}</p>
              </Reveal>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {offer.points.map((point, i) => {
                  const Icon = POINT_ICONS[i] ?? ShieldCheck;
                  return (
                    <Reveal as="li" key={point} className="offer-point">
                      <span className="offer-point__icon">
                        <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      {point}
                    </Reveal>
                  );
                })}
              </ul>
            </section>

            {/* Terms */}
            <section className="min-w-0">
              <Reveal>
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">Offer terms</h2>
              </Reveal>
              <dl className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10">
                {offer.terms.map((term) => (
                  <div key={term.label} className="grid gap-1 px-5 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="text-sm font-medium text-text-muted">{term.label}</dt>
                    <dd className="text-sm text-text-muted">{term.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* FAQ */}
            <section className="min-w-0">
              <Reveal>
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">Frequently asked questions</h2>
              </Reveal>
              <FAQAccordion faqs={offerFaqs} className="mt-6" />
            </section>
          </div>

          {/* Sticky claim card — secondary; the hero CTA is primary. Fills its column. */}
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="offer-card">
              <div className="offer-card__shine" aria-hidden="true" />
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-200">{offer.badge}</p>
              <p className="offer-card__value mt-2 font-extrabold leading-none tracking-tight text-text">{offerPercent}%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#bedffa]">{offerCopy.savingLabel}</p>
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-text-muted">
                {["High-definition, weatherproof cameras", "Night vision and instant mobile alerts", "Clean, tidy installation"].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#bedffa]" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to={CTA} className="offer-card__cta mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold">
                {offerCopy.claimCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={company.phoneHref}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm text-text-muted transition-colors hover:border-white/40 hover:text-text"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                Prefer to call? {company.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
