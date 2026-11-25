import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { homeFaqs } from "@/data/faqs";
import { company } from "@/data/company";

/**
 * Homepage FAQ — questions on the left, a help panel that stays in view on
 * the right until the last question scrolls past. The panel is the section's
 * exit: a quote request and the phone number, so the last band before the
 * footer asks for something. Light surface, so no `overflow-hidden` ancestor
 * (that would silently break the sticky panel).
 */
export function FAQSection() {
  return (
    <section
      className="on-paper bg-[linear-gradient(160deg,#eff9ff_0%,#fff_45%)] text-slate-900 band"
      aria-labelledby="faq-heading"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.75fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              id="faq-heading"
              tone="paper"
              align="left"
              eyebrow="Questions"
              title="The things people ask before the site visit."
              description="Clear answers, no sales pressure. If your question isn't here, call and ask."
            />
            <div className="mt-8 sm:mt-10">
              <FAQAccordion faqs={homeFaqs} tone="paper" card />
            </div>
          </div>

          <aside aria-labelledby="faq-help-title" className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_18px_40px_-30px_rgb(15_23_42/35%)] sm:p-7">
              <div
                className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-sky-200/70 blur-3xl"
                aria-hidden="true"
              />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-800">
                Still deciding?
              </p>
              <h3 id="faq-help-title" className="display-title mt-3 text-2xl text-slate-900">
                Ask an engineer, not a salesperson.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Send the site details and we&rsquo;ll come back with the scope, the equipment and a
                fixed, itemised quote — no obligation.
              </p>

              <Link
                to="/contact"
                className="group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-paper transition-colors hover:bg-black"
              >
                Request a free quote
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={company.phoneHref}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-900/20 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900/45 hover:bg-slate-900/[0.04]"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {company.phoneDisplay}
              </a>

              <p className="mt-4 text-center text-[11px] text-slate-500">
                Dubai-based team · Projects across the UAE
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
