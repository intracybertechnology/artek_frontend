import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import { DetailPageLayout } from "@/components/common/DetailPageLayout";
import { BrandLogo } from "@/components/common/BrandLogo";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { Reveal } from "@/components/common/Reveal";
import { REAL_PHOTO_KEYS } from "@/data/imageNotes";
import { brandDetails, brandGroups, getProduct, slugify } from "@/data/catalog";
import { productContent } from "@/data/productContent";
import { company } from "@/data/company";
import NotFound from "@/pages/NotFound";
import { PRODUCT_IMAGE_FILES } from "@/data/productImages.generated";

/** One product: image, description, brand logos and sibling products in the sidebar. */
export default function ProductDetail() {
  const { group: groupSlug, product: productSlug } = useParams<{ group: string; product: string }>();
  const product = groupSlug && productSlug ? getProduct(groupSlug, productSlug) : undefined;
  const { group, name, detail } = product ?? {};

  const [failedImage, setFailedImage] = useState(false);

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
      {/* ── Product image ────────────────────────────────────────── */}
      <figure className="w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/10">
        {image && !failedImage ? (
          <img
            src={image}
            alt={`${name} supplied by Artek Computers LLC in Dubai`}
            width={1000}
            height={750}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={() => setFailedImage(true)}
            className="aspect-[4/3] w-full object-contain"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-white/5 p-6 text-center">
            <ImageIcon className="size-8 text-slate-500" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">{name}</span>
          </div>
        )}
      </figure>

      {image && !failedImage && !REAL_PHOTO_KEYS.has(productKey) && (
        <p className="mt-2 text-sm text-slate-400">Image for illustration only.</p>
      )}

      {/* ── Description — only when the hero shows the generic fallback (no custom description) ── */}
      {!detail?.description && (
        <p className="mt-6 text-pretty text-base text-slate-300 sm:text-lg">{description}</p>
      )}

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
