import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { brandGroups } from "@/data/catalog";

/** Every brand we supply, grouped by category. */
export default function Brands() {
  return (
    <article>
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

      <section className="bg-mist-2 py-14 sm:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {brandGroups.map((g) => (
            <div key={g.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-ink">{g.title}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.brands.map((brand) => (
                  <li key={brand} className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-text-muted">
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="container-page mt-8 text-xs text-slate-400">
          All brand names are trademarks of their respective owners.
        </p>
      </section>

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
