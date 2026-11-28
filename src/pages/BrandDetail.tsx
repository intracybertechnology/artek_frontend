import { Link, useParams } from "react-router-dom";
import { DetailPageLayout } from "@/components/common/DetailPageLayout";
import { Reveal } from "@/components/common/Reveal";
import { BrandLogo } from "@/components/common/BrandLogo";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { brandLogo, getBrand, getBrandProducts, slugify } from "@/data/catalog";
import { brandContent } from "@/data/brandContent";
import { company } from "@/data/company";
import NotFound from "@/pages/NotFound";

/** One brand: logo, products (or ask-us block), and sibling brands in the sidebar. */
export default function BrandDetail() {
  const { brand: brandSlug } = useParams<{ brand: string }>();
  const brand = brandSlug ? getBrand(brandSlug) : undefined;
  const { name, group, detail } = brand ?? {};

  if (!brand || !name || !group) return <NotFound />;

  const content = brandContent[slugify(name ?? "")];
  /** Hero: the brand's intro when it has content, else the page description, else the generic line. */
  const intro = content?.intro
    || detail?.description
    || `Browse the ${name} products we supply in Dubai and request a quote.`;

  const products = getBrandProducts(brandSlug ?? "");
  const otherBrands = group.brands.filter((b) => b !== name);
  const logoSrc = brandLogo(name);
  const quoteHref = `/contact?message=${encodeURIComponent(`I'm interested in ${name} products.`)}`;

  return (
    <DetailPageLayout
      title={`${name} in Dubai, UAE`}
      intro={intro}
      heroImage={detail?.heroImage}
      heroImageAlt={detail?.heroImageAlt}
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
