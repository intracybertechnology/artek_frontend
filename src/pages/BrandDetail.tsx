import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Camera } from "lucide-react";
import { DetailPageLayout } from "@/components/common/DetailPageLayout";
import { BrandLogo } from "@/components/common/BrandLogo";
import { brandLogo, getBrand, getBrandProducts, slugify, type BrandModel } from "@/data/catalog";
import { company } from "@/data/company";
import NotFound from "@/pages/NotFound";

/** Single model card: placeholder or image, code, type, and quote button. */
function ModelCard({ brand, model }: { brand: string; model: BrandModel }) {
  const [imgFailed, setImgFailed] = useState(false);
  const quoteTo = `/contact?message=${encodeURIComponent(`I'm interested in ${brand} ${model.code} (${model.type}).`)}`;

  return (
    <li className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
        <Link
          to={quoteTo}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Request a Free Quote
        </Link>
      </div>
    </li>
  );
}

/** One brand: logo, popular models, products (or ask-us block), and sibling brands in the sidebar. */
export default function BrandDetail() {
  const { brand: brandSlug } = useParams<{ brand: string }>();
  const brand = brandSlug ? getBrand(brandSlug) : undefined;
  const { name, group, detail } = brand ?? {};

  if (!brand || !name || !group) return <NotFound />;

  const intro = detail?.description
    || `Browse the ${name} products we supply in Dubai and request a quote.`;
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
      seo={{
        title: `${name} Products in Dubai, UAE | Artek Computers LLC`,
        description: `Browse ${name} products supplied by Artek Computers LLC in Dubai and the UAE. Request a quote by call or WhatsApp.`,
        canonical: `/brands/${slugify(name)}`,
        image: logoSrc,
      }}
    >
      {/* ── Brand logo ────────────────────────────────────────────── */}
      {logoSrc && (
        <div className="mb-6 flex justify-center">
          <BrandLogo name={name} className="h-20 w-40" />
        </div>
      )}

      {/* ── Popular models ────────────────────────────────────────── */}
      {detail?.models && detail.models.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-ink">Popular {name} models</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {detail.models.map((model) => (
              <ModelCard key={model.code} brand={name} model={model} />
            ))}
          </ul>
        </div>
      )}

      {/* ── Products grid or ask-us block ─────────────────────────── */}
      {products.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold text-ink">{name} products</h2>
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
    </DetailPageLayout>
  );
}
