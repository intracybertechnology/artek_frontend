import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BrandLogo } from "@/components/common/BrandLogo";
import { Button } from "@/components/ui/button";
import { brandGroups, getProduct, slugify, whatsappLink } from "@/data/catalog";
import NotFound from "@/pages/NotFound";

/** One product: photo (or neutral placeholder), quote actions and its sibling products. */
export default function ProductDetail() {
  const { group: groupSlug, product: productSlug } = useParams<{ group: string; product: string }>();
  const product = groupSlug && productSlug ? getProduct(groupSlug, productSlug) : undefined;
  const { group, name, detail } = product ?? {};

  useEffect(() => {
    if (name) document.title = `${name} in Dubai | Artek Computers LLC`;
  }, [name]);

  /* remember which src failed, so the placeholder resets when navigating to another product */
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const image = detail?.image;

  if (!product || !group || !name) return <NotFound />;

  const wa = whatsappLink(`Hi, I'm interested in ${name} (${group.title}).`);
  const others = group.items.filter((item) => item !== name);
  const brandGroup = brandGroups.find((b) => b.title === group.brandGroupTitle);

  return (
    <article>
      <header className="bg-navy-950 pb-14 pt-32 text-white sm:pb-16">
        <div className="container-page">
          <div className="[&_a]:text-slate-400 [&_span]:text-slate-400">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Brands", to: "/brands" },
                { label: group.title, to: `/products#${group.slug}` },
                { label: name, to: `/products/${group.slug}/${slugify(name)}` },
              ]}
            />
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>
        </div>
      </header>

      <section className="bg-mist-2 py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{group.title}</p>
            {detail?.description ? (
              <p className="mt-4 max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">{detail.description}</p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              <Button asChild variant="outline" size="lg">
                <Link to={`/contact?product=${encodeURIComponent(name)}&category=${encodeURIComponent(group.title)}`}>
                  Request a quote
                </Link>
              </Button>
            </div>
            <Link
              to={`/brands`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to {group.title}
            </Link>
          </div>

          <figure className="order-first overflow-hidden rounded-xl border border-white/10 lg:order-none">
            {image && image !== failedImage ? (
              <img
                src={image}
                alt={`${name} supplied by Artek Computers LLC`}
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                onError={() => setFailedImage(image)}
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-white/5 p-6 text-center">
                <ImageIcon className="size-8 text-slate-500" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink">{name}</span>
              </div>
            )}
          </figure>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-16" aria-labelledby="more-heading">
          <div className="container-page">
            <h2 id="more-heading" className="text-2xl font-bold text-text">
              More {group.title.toLowerCase()}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <li key={item}>
                  <Link
                    to={`/products/${group.slug}/${slugify(item)}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25"
                  >
                    <span className="text-sm font-semibold text-ink">{item}</span>
                    <ArrowRight className="size-4 shrink-0 text-accent-600" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {brandGroup && (
        <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-16" aria-labelledby="brands-heading">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="brands-heading" className="text-2xl font-bold text-text">
                Brands we supply in this area
              </h2>
              <Link
                to="/brands"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:underline"
              >
                See all brands
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {brandGroup.brands.map((brand) => (
                <li key={brand}>
                  <Link
                    to={`/brands/${slugify(brand)}`}
                    className="flex items-center gap-2 rounded-lg border border-white/15 px-2 py-1.5 transition-colors hover:border-white/30 hover:bg-white/5"
                  >
                    <BrandLogo name={brand} className="h-7 w-14 shrink-0" />
                    <span className="text-sm font-medium text-text-muted">{brand}</span>
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
