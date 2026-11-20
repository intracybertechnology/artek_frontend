import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { menuGroupOrder, productGroups, slugify } from "@/data/catalog";

/** Product index: every category and its items, each with a quote action. */
export default function Products() {
  const { hash } = useLocation();

  const mgRank = (slug: string) => {
    const i = menuGroupOrder.indexOf(slug);
    return i === -1 ? menuGroupOrder.length : i;
  };
  const orderedGroups = [...productGroups].sort((a, b) => mgRank(a.slug) - mgRank(b.slug));

  /* react-router doesn't scroll to hash anchors on client navigation — do it after render */
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <article>
      <header className="bg-navy-950 pb-14 pt-32 text-white sm:pb-16">
        <div className="container-page">
          <div className="[&_a]:text-slate-400 [&_span]:text-slate-400">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Products", to: "/products" }]} />
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            IT, cabling and security products in Dubai
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">
            Cables, networking, computers and security equipment, supplied and supported by Artek Computers LLC.
          </p>
        </div>
      </header>

      <nav aria-label="Product groups" className="border-b border-white/10 bg-navy-950">
        <div className="container-page flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {orderedGroups.map((g) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="shrink-0 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-white/40 hover:text-white"
            >
              {g.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="bg-mist-2 py-14 sm:py-20">
        <div className="container-page space-y-16">
          {orderedGroups.map((g) => (
            <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-heading`} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 id={`${g.slug}-heading`} className="text-2xl font-bold text-ink">
                    <Link to={`/products/${g.slug}`} className="hover:text-accent-600">
                      {g.title}
                    </Link>
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-slate-300">{g.intro}</p>
                </div>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((name) => {
                  return (
                    <li
                      key={name}
                      id={slugify(name)}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <Link
                        to={`/products/${g.slug}/${slugify(name)}`}
                        className="text-sm font-semibold text-ink underline-offset-4 transition-colors hover:text-accent-600 hover:underline"
                      >
                        {name}
                      </Link>
                      <span className="flex shrink-0 items-center gap-2">
                        <Link
                          to={`/contact?product=${encodeURIComponent(name)}&category=${encodeURIComponent(g.title)}`}
                          rel="nofollow"
                          aria-label={`Request a quote for ${name}`}
                          className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          Get a quote
                        </Link>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-20">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text">Looking for a specific product?</h2>
            <p className="mt-2 max-w-2xl text-sm text-text-muted sm:text-base">
              Tell us the product and brand you need. We will check availability, quote clearly and handle delivery,
              installation and support.
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
