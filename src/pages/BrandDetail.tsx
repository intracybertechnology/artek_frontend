import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Camera } from "lucide-react";
import { DetailPageLayout } from "@/components/common/DetailPageLayout";
import { Reveal } from "@/components/common/Reveal";
import { BrandLogo } from "@/components/common/BrandLogo";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { brandLogo, getBrand, getBrandProducts, slugify, type BrandModel } from "@/data/catalog";
import { brandContent } from "@/data/brandContent";
import { company } from "@/data/company";
import { fetchProductsByBrand, type ApiProduct } from "@/lib/catalogApi";
import NotFound from "@/pages/NotFound";

/** Single model card: image card, or a compact card when there is no image. */
function ModelCard({ brand, model, accent }: { brand: string; model: BrandModel; accent?: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const quoteTo = `/contact?message=${encodeURIComponent(`I'm interested in ${brand} ${model.code} (${model.type}).`)}`;

  const quoteButton = (
    <Link
      to={quoteTo}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      Request a Free Quote
    </Link>
  );

  /* No image: compact card — camera icon beside the code, no placeholder box */
  if (!model.image) {
    return (
      <li
        className="rounded-2xl border border-slate-200 bg-white p-5"
        style={accent ? { borderTopColor: "var(--brand-accent)" } : undefined}
      >
        <div className="flex items-center gap-2.5">
          <Camera className="size-6 shrink-0 text-slate-400" aria-hidden="true" />
          <p className="break-words text-sm font-bold text-slate-900">{model.code}</p>
        </div>
        <p className="mt-1 text-sm text-slate-600">{model.type}</p>
        {quoteButton}
      </li>
    );
  }

  return (
    <li
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
      style={accent ? { borderTopColor: "var(--brand-accent)" } : undefined}
    >
      {/* Image or placeholder */}
      <div className="flex aspect-[4/3] items-center justify-center bg-slate-100">
        {model.image && !imgFailed ? (
          <img
            src={model.image}
            alt={model.imageAlt ?? `${brand} ${model.code}`}
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <Camera className="size-10 text-slate-400" aria-hidden="true" />
        )}
      </div>
      {/* Info */}
      <div className="p-4">
        <p className="break-words text-sm font-bold text-slate-900">{model.code}</p>
        <p className="mt-0.5 text-sm text-slate-600">{model.type}</p>
        {quoteButton}
      </div>
    </li>
  );
}

/** Backend product → card model: code = modelNumber, type = type, image when present. */
const toModel = (p: ApiProduct): BrandModel => ({
  code: p.modelNumber,
  type: p.type ?? "Product",
  image: p.image ?? undefined,
});

/** One brand: logo, popular models, products (or ask-us block), and sibling brands in the sidebar. */
export default function BrandDetail() {
  const { brand: brandSlug } = useParams<{ brand: string }>();
  const brand = brandSlug ? getBrand(brandSlug) : undefined;
  const { name, group, detail } = brand ?? {};
  /** Live models from /api/products; null until loaded — the catalog models show meanwhile. */
  const [apiModels, setApiModels] = useState<BrandModel[] | null>(null);

  useEffect(() => {
    if (!brandSlug) return;
    let active = true;
    setApiModels(null);
    fetchProductsByBrand(brandSlug)
      .then((products) => {
        if (active && products.length > 0) setApiModels(products.map(toModel));
      })
      .catch(() => {
        /* Backend unreachable or errored — the visitor keeps seeing the catalog models. */
      });
    return () => {
      active = false;
    };
  }, [brandSlug]);

  if (!brand || !name || !group) return <NotFound />;

  const content = brandContent[slugify(name ?? "")];
  /** Hero: the brand's intro when it has content, else the page description, else the generic line. */
  const intro = content?.intro
    || detail?.description
    || `Browse the ${name} products we supply in Dubai and request a quote.`;
  /** Card models: backend products once loaded, else the catalog.ts models. */
  const models = apiModels ?? detail?.models ?? [];

  const products = getBrandProducts(brandSlug ?? "");
  const otherBrands = group.brands.filter((b) => b !== name);
  const logoSrc = brandLogo(name);
  const quoteHref = `/contact?message=${encodeURIComponent(`I'm interested in ${name} products.`)}`;

  return (
    <DetailPageLayout
      title={`${name} in Dubai, UAE`}
      intro={intro}
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Brands", to: "/brands" },
        { label: name, to: `/brands/${slugify(name)}` },
      ]}
      primaryCta={{
        label: "Request a Free Quote",
        href: quoteHref,
      }}
      callHref={company.phoneHref}
      sidebarTitle="Other brands"
      sidebarLinks={otherBrands.map((b) => ({
        label: b,
        to: `/brands/${slugify(b)}`,
      }))}
      sidebarAllLink={{ label: "All brands", to: "/brands" }}
      bottomCtaTitle={`${name} products`}
      accent={detail?.accent}
      seo={{
        title: `${name} Products in Dubai, UAE | Artek Computers LLC`,
        description: `Browse ${name} products supplied by Artek Computers LLC in Dubai and the UAE. Request a quote by call or WhatsApp.`,
        canonical: `/brands/${slugify(name)}`,
        image: logoSrc,
      }}
    >
      {/* ── Brand logo ────────────────────────────────────────────── */}
      {logoSrc && (
        <div className="mb-6">
          <BrandLogo name={name} className="h-20 w-40" />
        </div>
      )}
      {/* ── Popular models — backend products, catalog.ts models as fallback ── */}
      {models.length > 0 && (
        <div className="mb-8">
          <Reveal as="h2" className="text-xl font-bold text-ink">Popular {name} models</Reveal>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {models.map((model) => (
              <ModelCard key={model.code} brand={name} model={model} accent={detail?.accent} />
            ))}
          </ul>
        </div>
      )}
      {/* ── Products grid or ask-us block ─────────────────────────── */}
      {products.length > 0 ? (
        <div>
          <Reveal as="h2" className="text-xl font-bold text-ink">{name} products</Reveal>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {products.map((item) => (
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
                  to={`/contact?message=${encodeURIComponent(`I'm interested in ${item.name} (${item.groupTitle}) from ${name}.`)}`}
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
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-ink">Ask us about {name} products</h2>
          <p className="mt-2 text-sm text-slate-300">
            Tell us what you need and we will check availability and reply with a quote.
          </p>
          <div className="mt-4">
            <Link
              to={quoteHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request a Free Quote
            </Link>
          </div>
        </div>
      )}

      {content && (
        <>
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

      {/* ── Trademark note (every brand page) ─────────────────────── */}
      <p className="mt-10 border-t border-slate-200 pt-4 text-sm text-slate-400">
        {name} is a trademark of its respective owner. Artek Computers LLC is a reseller of {name} products.
      </p>
    </DetailPageLayout>
  );
}
