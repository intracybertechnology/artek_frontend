import { Link, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { DetailPageLayout } from "@/components/common/DetailPageLayout";
import { BrandLogo } from "@/components/common/BrandLogo";
import { brandLogo, getBrand, getBrandProducts, slugify, whatsappLink } from "@/data/catalog";
import { company } from "@/data/company";
import NotFound from "@/pages/NotFound";

/** One brand: logo, products (or ask-us block), and sibling brands in the sidebar. */
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
  const wa = whatsappLink(`Hi, I'm interested in ${name} products.`);

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
        label: "Request a quote",
        href: `/contact?brand=${encodeURIComponent(name)}`,
      }}
      callHref={company.phoneHref}
      sidebarTitle="Other brands"
      sidebarLinks={otherBrands.map((b) => ({
        label: b,
        to: `/brands/${slugify(b)}`,
      }))}
      bottomCtaTitle={`${name} products`}
      quoteMessage={`Hi, I'm interested in ${name} products.`}
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
                  to={`/contact?product=${encodeURIComponent(item.name)}&category=${encodeURIComponent(item.groupTitle)}&brand=${encodeURIComponent(name)}`}
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
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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
            <Link
              to={`/contact?brand=${encodeURIComponent(name)}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-semibold text-text transition-colors hover:border-white/45 hover:bg-white/[0.04]"
            >
              Request a quote
            </Link>
          </div>
        </div>
      )}
    </DetailPageLayout>
  );
}
