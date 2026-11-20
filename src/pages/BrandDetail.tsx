import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BrandLogo } from "@/components/common/BrandLogo";
import { getBrand, getBrandProducts, slugify, whatsappLink } from "@/data/catalog";
import NotFound from "@/pages/NotFound";

/** One brand: the product categories it appears in, and its sibling brands. */
export default function BrandDetail() {
  const { brand: brandSlug } = useParams<{ brand: string }>();
  const brand = brandSlug ? getBrand(brandSlug) : undefined;
  const { name, group, detail } = brand ?? {};

  useEffect(() => {
    if (name) document.title = `${name} in Dubai | Artek Computers LLC`;
  }, [name]);

  if (!brand || !name || !group) return <NotFound />;

  const wa = whatsappLink(`Hi, I'm interested in ${name} products.`);

  const products = getBrandProducts(brandSlug ?? "");
  const byGroup = new Map<string, { groupSlug: string; name: string }[]>();
  for (const p of products) {
    byGroup.set(p.groupTitle, [...(byGroup.get(p.groupTitle) ?? []), { groupSlug: p.groupSlug, name: p.name }]);
  }
  const otherBrands = group.brands.filter((b) => b !== name);

  return (
    <article>
      <header className="bg-navy-950 pb-14 pt-32 text-white sm:pb-16">
        <div className="container-page">
          <div className="[&_a]:text-slate-400 [&_span]:text-slate-400">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Brands", to: "/brands" },
                { label: name, to: `/brands/${slugify(name)}` },
              ]}
            />
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            <BrandLogo name={name} className="mb-3 h-12 w-24" />
            {name} in Dubai
          </h1>
        </div>
      </header>

      <section className="bg-mist-2 py-14 sm:py-20">
        <div className="container-page">
          {detail?.description ? (
            <p className="max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">{detail.description}</p>
          ) : null}
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
            <Link
              to="/brands"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 text-[15px] font-semibold text-text transition-colors hover:border-white/45 hover:bg-white/[0.04]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to all brands
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-16"
        aria-labelledby="brand-products-heading"
      >
        <div className="container-page">
          <h2 id="brand-products-heading" className="text-2xl font-bold text-text">
            {name} products
          </h2>
          {[...byGroup.entries()].map(([groupTitle, items]) => (
            <div key={groupTitle} className="mt-8 first:mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{groupTitle}</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <Link
                      to={`/products/${item.groupSlug}/${slugify(item.name)}`}
                      className="text-sm font-semibold text-ink underline-offset-4 transition-colors hover:text-accent-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <Link
                      to={`/contact?product=${encodeURIComponent(item.name)}&category=${encodeURIComponent(groupTitle)}&brand=${encodeURIComponent(name)}`}
                      rel="nofollow"
                      aria-label={`Request a quote for ${item.name}`}
                      className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Get a quote
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {otherBrands.length > 0 && (
        <section className="bg-mist-2 py-14 sm:py-16" aria-labelledby="other-brands-heading">
          <div className="container-page">
            <h2 id="other-brands-heading" className="text-2xl font-bold text-ink">
              Other brands in this area
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {otherBrands.map((b) => (
                <li key={b}>
                  <Link
                    to={`/brands/${slugify(b)}`}
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/25 hover:bg-white/10"
                  >
                    <BrandLogo name={b} />
                    <span className="text-xs font-medium text-text-muted">{b}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
