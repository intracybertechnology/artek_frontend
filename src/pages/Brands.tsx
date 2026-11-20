import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { brandGroups, brandGroupOrder, brandLogo, slugify } from "@/data/catalog";

/** ------------------------------------------------------------------ *
 *  Single brand tile                                                    *
 *  - Shows the logo image (object-contain, fills the tile).            *
 *  - Brand name in small text under the logo.                          *
 *  - If the image fails: name only, centered and bold — once.          *
 * ------------------------------------------------------------------- */
function BrandTile({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const src = brandLogo(name);
  const noImage = !src || failed;

  return (
    <Link
      to={`/brands/${slugify(name)}`}
      aria-label={name}
      className="group flex h-28 items-center justify-center rounded-xl border border-white/15 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:shadow-[0_6px_20px_rgb(0_0_0/0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface xl:h-32"
    >
      {noImage ? (
        <span className="px-2 text-center text-xl font-bold leading-tight text-slate-900 md:text-2xl">
          {name}
        </span>
      ) : (
        <>
          <img
            src={src}
            alt={`${name} logo`}
            width={120}
            height={60}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="max-h-full max-w-full object-contain"
          />
          <span className="sr-only">{name}</span>
        </>
      )}
    </Link>
  );
}

/** /brands — all brands grouped by category, one section per group. */
export default function Brands() {
  const bgRank = (title: string) => {
    const i = brandGroupOrder.indexOf(title);
    return i === -1 ? brandGroupOrder.length : i;
  };
  const orderedBrandGroups = [...brandGroups].sort((a, b) => bgRank(a.title) - bgRank(b.title));
  return (
    <article>
      {/* ── Page header ─────────────────────────────────────────────── */}
      <header className="bg-navy-950 pb-14 pt-32 text-white sm:pb-16">
        <div className="container-page">
          <div className="[&_a]:text-slate-400 [&_span]:text-slate-400">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Brands", to: "/brands" }]} />
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Brands we supply in Dubai
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">
            Technology from the brands your business already trusts, supplied and supported by Artek Computers LLC.
          </p>
        </div>
      </header>

      {/* ── Brand sections ──────────────────────────────────────────── */}
      <div className="bg-mist-2">
        <div className="container-page divide-y divide-white/[0.07]">
          {orderedBrandGroups.map((g) => (
            <section key={g.title} className="py-10 sm:py-12" aria-labelledby={`group-${slugify(g.title)}`}>
              {/* Section heading + count */}
              <div className="flex flex-wrap items-baseline gap-3">
                <h2
                  id={`group-${slugify(g.title)}`}
                  className="text-2xl font-semibold text-ink"
                >
                  {g.title}
                </h2>
                <span className="text-sm text-text-muted">
                  {g.brands.length} {g.brands.length === 1 ? "brand" : "brands"}
                </span>
              </div>

              {/* Brand grid */}
              <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {g.brands.map((brand) => (
                  <li key={brand}>
                    <BrandTile name={brand} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="container-page pb-6 text-xs text-slate-400">
          All brand names are trademarks of their respective owners.
        </p>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-20">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text">Do not see the brand you need?</h2>
            <p className="mt-2 max-w-2xl text-sm text-text-muted sm:text-base">
              We supply many more brands than we can list. Tell us what you are looking for and we will source it,
              supply it and support it.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={company.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {company.phoneDisplay}
            </a>
            <Button asChild size="lg">
              <Link to="/contact">Request a free quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
