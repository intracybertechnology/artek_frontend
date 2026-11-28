import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { DetailPageLayout } from "@/components/common/DetailPageLayout";
import { BrandLogo } from "@/components/common/BrandLogo";
import { ModelCard } from "@/components/common/ModelCard";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brandDetails, brandGroups, getProduct, slugify } from "@/data/catalog";
import { productContent } from "@/data/productContent";
import { company } from "@/data/company";
import {
  fetchPaginatedModels,
  type ModelsPageSort,
  type PaginatedModelsPage,
} from "@/lib/catalogApi";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";
import { PRODUCT_IMAGE_FILES } from "@/data/productImages.generated";

/** Models per grid page. */
const MODELS_PAGE_SIZE = 12;

/** "Benefits" — plain check list; rendered only when the product has benefits. */
function BenefitsSection({ benefits }: { benefits: readonly string[] }) {
  return (
    <section className="mt-10">
      <Reveal as="h2" className="text-2xl font-bold text-ink">Benefits</Reveal>
      <ul className="mt-4 space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green-600/20 text-green-400">
              <Check className="size-4" aria-hidden="true" />
            </span>
            <span className="text-base leading-relaxed text-slate-300">{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Compact page list for the grid pager: every number while there are at
 * most 7 pages, otherwise first/last plus the pages around the current
 * one with "…" where numbers are skipped. */
function pageNumbers(page: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const wanted = new Set([1, totalPages, page - 1, page, page + 1]);
  const list: (number | "gap")[] = [];
  let previous = 0;
  for (let p = 1; p <= totalPages; p++) {
    if (!wanted.has(p)) continue;
    if (previous > 0 && p - previous > 1) list.push("gap");
    list.push(p);
    previous = p;
  }
  return list;
}

/**
 * "{Product} models" — the full-width model grid at the bottom of the
 * page, directly above the "Looking for {product}?" band (passed to
 * DetailPageLayout as belowContent). The backend does the paging,
 * sorting and searching: 12 models per page, oldest first by default so
 * new models appear at the end of the grid.
 *
 * Renders nothing while the first page loads and nothing when the
 * product type has no models (or the request fails) — visitors never
 * see an error and the page keeps its plain layout. Only a search that
 * filters to zero keeps the toolbar, so the visitor can clear it.
 * While a page loads the previous grid stays in place (dimmed) so the
 * height never collapses and the page does not jump.
 */
function ModelsSection({
  name,
  groupSlug,
  productSlug,
  typeImage,
}: {
  name: string;
  groupSlug: string;
  productSlug: string;
  /** The product type's own picture — the card fallback when a model has no photo. */
  typeImage?: string;
}) {
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sort, setSort] = useState<ModelsPageSort>("created_asc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PaginatedModelsPage | null>(null);
  /** True while a page is loading — the previous grid stays visible meanwhile. */
  const [pending, setPending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* The grid page — refetched whenever a control changes. */
  useEffect(() => {
    let active = true;
    setPending(true);
    fetchPaginatedModels(productSlug, {
      page,
      limit: MODELS_PAGE_SIZE,
      sort,
      search: appliedSearch || undefined,
    }).then((res) => {
      /* fetchPaginatedModels always resolves — failures come back as safe defaults. */
      if (!active) return;
      setData(res);
      setPending(false);
    });
    return () => {
      active = false;
    };
  }, [productSlug, page, sort, appliedSearch]);

  /* Search box: debounced 300 ms; Enter and the Search button apply immediately. */
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppliedSearch(searchText.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  /* Nothing before the first page arrives; nothing when the product type
     has no models. A search that filters to zero keeps the toolbar. */
  if (!data || (data.total === 0 && !appliedSearch)) return null;

  const totalPages = data.totalPages;
  const from = Math.min((page - 1) * MODELS_PAGE_SIZE + 1, data.total);
  const to = Math.min(page * MODELS_PAGE_SIZE, data.total);
  const applySearch = () => {
    setAppliedSearch(searchText.trim());
    setPage(1);
  };
  const gotoPage = (next: number) => {
    setPage(next);
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: "start" }));
  };

  return (
    <section ref={sectionRef} className="scroll-mt-28 bg-mist-2 pb-12 sm:pb-16">
      <div className="container-page">
        <Reveal as="h2" className="text-2xl font-bold text-ink">{name} models</Reveal>

        {/* Toolbar: result count, sort and search — all handled by the server */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted" role="status">
            Showing {from}–{to} of {data.total} results
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Sort — Default is oldest first, so new models appear at the end */}
            <Select value={sort} onValueChange={(v) => { setSort(v as ModelsPageSort); setPage(1); }}>
              <SelectTrigger aria-label="Sort models" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_asc">Default</SelectItem>
                <SelectItem value="created_desc">Newest first</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applySearch();
                }
              }}
              placeholder="Search models in this category"
              aria-label="Search models in this category"
              className="w-56"
            />
            <Button variant="outline" size="sm" type="button" onClick={applySearch}>
              Search
            </Button>
          </div>
        </div>

        {/* Grid — 4 columns on desktop, 3 on large tablet, 2 on small tablet,
            1 on phone. While the next page loads the previous one stays
            (dimmed) so the height never collapses. */}
        <ul
          aria-busy={pending}
          className={cn(
            "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            pending && "pointer-events-none opacity-60",
          )}
        >
          {data.products.map((product) => (
            <ModelCard
              key={product.id}
              brand={{ name: product.brandName ?? "" }}
              modelCode={product.modelNumber}
              typeLabel={product.type ?? name}
              availability={product.availability}
              imageUrl={product.image}
              typeImage={typeImage}
              modelSlug={product.slug}
              groupSlug={groupSlug}
              productSlug={productSlug}
            />
          ))}
        </ul>

        {/* Pager — hidden while everything fits on one page */}
        {totalPages > 1 && (
          <nav className="mt-8 flex flex-wrap items-center gap-2" aria-label="Model pages">
            <Button variant="outline" size="sm" type="button" disabled={page <= 1} onClick={() => gotoPage(page - 1)}>
              Previous
            </Button>
            {pageNumbers(page, totalPages).map((p, i) =>
              p === "gap" ? (
                <span key={`gap-${i}`} className="px-1 text-xs text-text-muted">…</span>
              ) : (
                <button
                  key={p}
                  type="button"
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => gotoPage(p)}
                  className={cn(
                    "min-w-9 rounded-md border px-2.5 py-1.5 text-sm font-semibold transition-colors",
                    p === page
                      ? "border-text bg-text text-surface"
                      : "border-white/15 text-text-muted hover:border-white/40 hover:text-text",
                  )}
                >
                  {p}
                </button>
              ),
            )}
            <Button variant="outline" size="sm" type="button" disabled={page >= totalPages} onClick={() => gotoPage(page + 1)}>
              Next
            </Button>
          </nav>
        )}
      </div>
    </section>
  );
}

/** One product: description, benefits, backend models and brand logos. */
export default function ProductDetail() {
  const { group: groupSlug, product: productSlug } = useParams<{ group: string; product: string }>();
  const product = groupSlug && productSlug ? getProduct(groupSlug, productSlug) : undefined;
  const { group, name, detail } = product ?? {};

  if (!product || !group || !name) return <NotFound />;

  const productKey = `${group.slug}/${slugify(name)}`;
  const image = PRODUCT_IMAGE_FILES[productKey];
  const description = detail?.description
    ?? `${name} from our ${group.title} range, supplied and supported by Artek Computers LLC in Dubai.`;
  const brandGroup = brandGroups.find((b) => b.title === group.brandGroupTitle);
  const others = group.items.filter((item) => item !== name);
  const content = productContent[slugify(name)];
  /** Reverse lookup: brands whose brandDetails.products list this product. */
  const contentBrands = content
    ? brandGroups.flatMap((bg) =>
        bg.brands.filter((brand) => brandDetails[slugify(brand)]?.products?.includes(name)),
      )
    : [];

  return (
    <DetailPageLayout
      title={`${name} in Dubai, UAE`}
      intro={description}
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: group.title, to: `/products/${group.slug}` },
        { label: name, to: `/products/${group.slug}/${slugify(name)}` },
      ]}
      primaryCta={{
        label: "Request a Free Quote",
        href: `/contact?message=${encodeURIComponent(`I'm interested in ${name} (${group.title}).`)}`,
      }}
      callHref={company.phoneHref}
      sidebarTitle={`More ${group.title.toUpperCase()}`}
      sidebarLinks={others.map((item) => ({
        label: item,
        to: `/products/${group.slug}/${slugify(item)}`,
      }))}
      sidebarAllLink={{ label: "All products", to: "/products" }}
      belowContent={
        <ModelsSection
          key={productSlug ?? slugify(name)}
          name={name}
          groupSlug={group.slug}
          productSlug={productSlug ?? slugify(name)}
          typeImage={image}
        />
      }
      bottomCtaTitle={name}
      seo={{
        title: `${name} in Dubai, UAE | Artek Computers LLC`,
        description,
        canonical: `/products/${group.slug}/${slugify(name)}`,
        image: image ? `${company.siteUrl}${image}` : undefined,
      }}
    >
      {/* ── Description — only when the product has no custom description in catalog.ts ── */}
      {!detail?.description && (
        <p className="mt-6 text-pretty text-base text-slate-300 sm:text-lg">{description}</p>
      )}

      {/* ── Benefits (only for products with benefits in productContent) ── */}
      {content?.benefits && <BenefitsSection benefits={content.benefits} />}

      {/* ── Article sections (only for products with productContent entries) ── */}
      {content && (
        <>
          <section className="mt-10">
            <Reveal as="h2" className="text-2xl font-bold text-ink">What {content.plural ? "are" : "is"} {name}?</Reveal>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{content.whatIs}</p>
          </section>

          <section className="mt-10">
            <Reveal as="h2" className="text-2xl font-bold text-ink">Where {content.plural ? "are" : "is"} {name} used?</Reveal>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{content.whereUsed}</p>
          </section>

          {contentBrands.length > 0 && (
            <section className="mt-10">
              <Reveal as="h2" className="text-2xl font-bold text-ink">Brands we supply</Reveal>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                {name} from brands including{" "}
                {contentBrands.map((brand, i) => (
                  <span key={brand}>
                    {i > 0 && (i === contentBrands.length - 1 ? " and " : ", ")}
                    <Link
                      to={`/brands/${slugify(brand)}`}
                      className="font-medium text-slate-200 underline-offset-4 transition-colors hover:text-accent-600 hover:underline"
                    >
                      {brand}
                    </Link>
                  </span>
                ))}
                .
              </p>
            </section>
          )}

          <section className="mt-10">
            <Reveal as="h2" className="text-2xl font-bold text-ink">How we can help</Reveal>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{content.howWeHelp}</p>
          </section>

          <section className="mt-10">
            <Reveal as="h2" className="text-2xl font-bold text-ink">Frequently asked questions</Reveal>
            <FAQAccordion faqs={content.faqs} className="mt-6" />
          </section>
        </>
      )}

      {/* ── Brands we supply in this area ────────────────────────── */}
      {brandGroup && (
        <div className="mt-8">
          <Reveal as="h2" className="text-lg font-bold text-ink">Brands we supply in this area</Reveal>
          <ul className="mt-4 flex flex-wrap gap-2">
            {brandGroup.brands.map((brand) => (
              <li key={brand}>
                <Link
                  to={`/brands/${slugify(brand)}`}
                  aria-label={brand}
                  className="flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <BrandLogo name={brand} className="h-8 w-16 shrink-0" showNameFallback />
                  <span className="sr-only">{brand}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DetailPageLayout>
  );
}
