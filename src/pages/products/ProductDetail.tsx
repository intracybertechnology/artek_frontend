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
  fetchModelsBySubcategory,
  fetchSubcategoryBrands,
  type ModelsPage,
  type ModelsSort,
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

/** Where the models list would be: when the category has no models in the
 * backend (or it cannot be reached) the visitor still gets a clear next step. */
function AskUsCard({ name, groupTitle }: { name: string; groupTitle: string }) {
  /* Ram's quote flow: the product type's context in the query string. */
  const quoteTo =
    `/contact?product=${encodeURIComponent(name)}` +
    `&category=${encodeURIComponent(groupTitle)}` +
    `&message=${encodeURIComponent(`I am interested in ${name}.`)}`;

  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <Reveal as="h2" className="text-2xl font-bold text-ink">Ask us about {name}</Reveal>
        <p className="mt-2 text-sm text-slate-300">
          Tell us the brand, model and quantity you need and we will reply with a clear quote.
        </p>
        <Link
          to={quoteTo}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Request a Free Quote
        </Link>
      </div>
    </section>
  );
}

/**
 * "{Product} products" — backend-driven model grid: brand chips, a toolbar
 * (result count, sort, search), the card grid and Previous/Next paging, all
 * served by GET /api/products (page, limit, search, sort, brand). While the
 * first page loads nothing renders; when the category has no models (or the
 * backend is unreachable) the ask-us card takes the grid's place.
 */
function ModelsSection({
  name,
  groupSlug,
  groupTitle,
  productSlug,
  typeImage,
}: {
  name: string;
  groupSlug: string;
  groupTitle: string;
  productSlug: string;
  /** The product type's own picture — the card fallback when a model has no photo. */
  typeImage?: string;
}) {
  const [brands, setBrands] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sort, setSort] = useState<ModelsSort>("oldest");
  const [brand, setBrand] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ModelsPage | null>(null);
  /** True when the last page fetch failed (backend unreachable or errored). */
  const [failed, setFailed] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  /* Brand chips: one unfiltered fetch of the whole subcategory, oldest first. */
  useEffect(() => {
    let active = true;
    fetchSubcategoryBrands(productSlug)
      .then((names) => {
        if (active) setBrands(names);
      })
      .catch(() => {
        /* No chips on failure — the grid below still loads. */
      });
    return () => {
      active = false;
    };
  }, [productSlug]);

  /* The grid page — refetched whenever a control changes. */
  useEffect(() => {
    let active = true;
    fetchModelsBySubcategory(productSlug, {
      page,
      limit: MODELS_PAGE_SIZE,
      sort,
      search: appliedSearch || undefined,
      brand: brand ?? undefined,
    })
      .then((res) => {
        if (active) {
          setFailed(false);
          setData(res);
        }
      })
      .catch(() => {
        /* Backend unreachable or errored — the ask-us card takes over below. */
        if (active) {
          setFailed(true);
          setData(null);
        }
      });
    return () => {
      active = false;
    };
  }, [productSlug, page, sort, appliedSearch, brand]);

  /* Search box: debounced 300 ms; Enter and the Search button apply immediately. */
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppliedSearch(searchText.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  /* Nothing while the first page loads; the ask-us card when the category is
     empty or the backend failed. A filtered-to-zero search keeps the toolbar. */
  if (data === null && !failed) return null;
  if (failed || (data !== null && data.total === 0 && !appliedSearch && !brand)) {
    return <AskUsCard name={name} groupTitle={groupTitle} />;
  }
  if (!data) return null;

  const totalPages = Math.max(1, data.totalPages);
  const from = data.total === 0 ? 0 : (page - 1) * MODELS_PAGE_SIZE + 1;
  const to = Math.min(page * MODELS_PAGE_SIZE, data.total);
  const applySearch = () => {
    setAppliedSearch(searchText.trim());
    setPage(1);
  };
  const gotoPage = (next: number) => {
    setPage(next);
    requestAnimationFrame(() => toolbarRef.current?.scrollIntoView({ block: "start" }));
  };

  return (
    <section className="mt-10 scroll-mt-28">
      <Reveal as="h2" className="text-2xl font-bold text-ink">{name} products</Reveal>

      {brands.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter models by brand">
          {["All", ...brands].map((b) => {
            const isActive = b === "All" ? brand === null : brand === slugify(b);
            return (
              <button
                key={b}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setBrand(b === "All" ? null : slugify(b));
                  setPage(1);
                }}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                  isActive
                    ? "border-text bg-text text-surface"
                    : "border-white/15 text-text-muted hover:border-white/40 hover:text-text",
                )}
              >
                {b}
              </button>
            );
          })}
        </div>
      )}

      <div ref={toolbarRef} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-muted" role="status">
          Showing {from}–{to} of {data.total} results
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {/* Sort — only the orders the backend supports: newest first, and
              oldest first assembled from it. The API's only other sort value
              ("name") orders by product name, not model code. */}
          <Select value={sort} onValueChange={(v) => { setSort(v as ModelsSort); setPage(1); }}>
            <SelectTrigger aria-label="Sort products" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oldest">Default</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
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
            placeholder="Search products in this category"
            aria-label="Search products in this category"
            className="w-56"
          />
          <Button variant="outline" size="sm" type="button" onClick={applySearch}>
            Search
          </Button>
        </div>
      </div>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((product) => (
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

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" size="sm" type="button" disabled={page <= 1} onClick={() => gotoPage(page - 1)}>
            Previous
          </Button>
          <span className="text-xs text-text-muted">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="sm" type="button" disabled={page >= totalPages} onClick={() => gotoPage(page + 1)}>
            Next
          </Button>
        </div>
      )}
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

      {/* ── {Product} products — backend models, or the ask-us card when there are none ── */}
      <ModelsSection
        key={productSlug ?? slugify(name)}
        name={name}
        groupSlug={group.slug}
        groupTitle={group.title}
        productSlug={productSlug ?? slugify(name)}
        typeImage={image}
      />

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
