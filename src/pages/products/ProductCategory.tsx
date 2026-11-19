import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { ArrowRight, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { brandGroups, getProductGroup, slugify, whatsappLink } from "@/data/catalog";
import { getServiceBySlug } from "@/data/services";
import NotFound from "@/pages/NotFound";

const faqsFor = (phone: string) => [
  {
    question: "How do I get a quote?",
    answer: `Send an enquiry with the products and quantities you need, or call ${phone}. We will quote clearly.`,
  },
  {
    question: "Do you supply other products too?",
    answer: "Yes. See the full list on our Products page.",
  },
];

/** One product category: its items, photo, brands, related service and FAQs. */
export default function ProductCategory() {
  const { group: groupSlug } = useParams<{ group: string }>();
  const group = groupSlug ? getProductGroup(groupSlug) : undefined;

  useEffect(() => {
    if (group) document.title = `${group.title} in Dubai | Artek Computers LLC`;
  }, [group]);

  if (!group) return <NotFound />;

  const brandGroup = brandGroups.find((b) => b.title === group.brandGroupTitle);
  const relatedService = group.relatedSolution ? getServiceBySlug(group.relatedSolution) : undefined;

  return (
    <article>
      <header className="bg-navy-950 pb-14 pt-32 text-white sm:pb-16">
        <div className="container-page">
          <div className="[&_a]:text-slate-400 [&_span]:text-slate-400">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: group.title, to: `/products/${group.slug}` },
              ]}
            />
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {group.title} in Dubai
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">{group.intro}</p>
        </div>
      </header>

      <section className="bg-mist-2 py-14 sm:py-20" aria-labelledby="items-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 id="items-heading" className="sr-only">
              {group.title} we supply
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.items.map((name) => {
                const wa = whatsappLink(`Hi, I'm interested in ${name} (${group.title}).`);
                return (
                  <li
                    key={name}
                    id={slugify(name)}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="text-sm font-semibold text-ink">{name}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      <Link
                        to={`/contact?product=${encodeURIComponent(name)}&category=${encodeURIComponent(group.title)}`}
                        rel="nofollow"
                        aria-label={`Request a quote for ${name}`}
                        className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Get a quote
                      </Link>
                      {wa && (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ask about ${name} on WhatsApp (opens in a new tab)`}
                          className="inline-flex size-8 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5b]"
                        >
                          <FaWhatsapp className="size-4" aria-hidden="true" />
                        </a>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <figure className="overflow-hidden rounded-xl border border-white/10">
            <img
              src={group.image}
              alt={`${group.title} supplied by Artek Computers LLC`}
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="aspect-[8/5] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      {brandGroup && (
        <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-16" aria-labelledby="brands-heading">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="brands-heading" className="text-2xl font-bold text-text">
                Brands we supply in this area
              </h2>
              <Link to="/brands" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:underline">
                See all brands
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {brandGroup.brands.map((brand) => (
                <li key={brand} className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-text-muted">
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {relatedService && (
        <section className="bg-mist-2 py-14" aria-labelledby="related-heading">
          <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="related-heading" className="text-xl font-bold text-ink">
                Need installation or support?
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Where this is part of a project, we can also plan, install and support it.
              </p>
            </div>
            <Link
              to={`/solutions/${relatedService.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:underline"
            >
              {relatedService.title}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      <section className="bg-mist-2 pb-14" aria-labelledby="faq-heading">
        <div className="container-page max-w-3xl">
          <h2 id="faq-heading" className="text-2xl font-bold text-ink">
            Frequently asked questions
          </h2>
          <FAQAccordion faqs={faqsFor(company.phoneDisplay)} className="mt-6" />
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-slate-safe py-14 sm:py-16">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text">Looking for {group.title.toLowerCase()}?</h2>
            <p className="mt-2 max-w-2xl text-sm text-text-muted sm:text-base">
              Tell us the products and quantities you need. We will check availability, quote clearly and handle
              delivery and support.
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
