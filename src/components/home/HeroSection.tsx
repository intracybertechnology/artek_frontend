import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { heroSlides } from "@/data/heroSlides";
import { company } from "@/data/company";

/**
 * Homepage hero — fully responsive (320px → 2xl).
 *
 * Mobile:  full-bleed cinematic layout — carousel fills the viewport height,
 *          text and CTA float over the image in a bottom overlay.
 *          Feels like a premium app / Apple-style landing on phone.
 *
 * Desktop (lg+): two-column layout — copy left, carousel right.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface" aria-labelledby="hero-heading">

      {/* ── MOBILE HERO (< lg) — full-bleed cinematic ───────────────────── */}
      <div className="relative lg:hidden" style={{ height: "100svh", minHeight: "560px", maxHeight: "900px" }}>

        {/* Carousel fills the entire viewport height */}
        <div className="absolute inset-0">
          <HeroCarousel slides={heroSlides} mobileFullBleed />
        </div>

        {/* Deep gradient scrim so text is readable over any image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.1) 35%, rgba(5,5,5,0.15) 55%, rgba(5,5,5,0.88) 100%)",
          }}
        />

        {/* Top — eyebrow anchored under navbar */}
        <div className="absolute inset-x-0 top-0 px-5 pt-24">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
            <ShieldCheck className="size-3 shrink-0" aria-hidden="true" />
            SIRA Approved · IT &amp; CCTV · Dubai
          </p>
        </div>

        {/* Bottom — headline + body + CTAs */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10">
          <h1
            id="hero-heading"
            className="display-title text-white"
            style={{ fontSize: "clamp(2rem, 1.4rem + 3.2vw, 2.75rem)", lineHeight: 1.12 }}
          >
            One partner.
            <br />
            Every system{" "}
            <em className="not-italic text-white/50">covered.</em>
          </h1>

          <p className="mt-3 text-[13px] leading-relaxed text-white/65">
            Security, networking and IT across the UAE —<br />
            installed and supported by one team.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/contact"
              className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-white text-[15px] font-semibold tracking-wide text-surface transition-colors duration-200 hover:bg-white/90"
            >
              Get a free site survey
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.06] text-[14px] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP HERO (lg+) — two-column ─────────────────────────────── */}
      <div className="hidden lg:block">
        {/* Background composition (decorative) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
          <div
            className="absolute left-[-14%] top-[4%] aspect-square w-[46rem] max-w-[46rem] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.07), rgba(255,255,255,0.03) 55%, rgba(255,255,255,0) 100%)",
            }}
          />
          <svg
            className="absolute inset-0 h-full w-full"
            style={{
              maskImage: "radial-gradient(ellipse 92% 82% at 50% 42%, black 26%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 92% 82% at 50% 42%, black 26%, transparent 78%)",
            }}
          >
            <defs>
              <pattern id="hero-fine-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="#FFFFFF" strokeOpacity="0.055" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-fine-grid)" />
          </svg>
        </div>

        <div className="container-page relative grid items-center gap-14 pt-32 pb-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-20 xl:pt-36">
          {/* LEFT — content */}
          <div className="min-w-0 text-left">
            <p className="animate-fade-up flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              <ShieldCheck className="size-3.5 shrink-0 text-white/60" aria-hidden="true" />
              {company.heroEyebrow}
            </p>

            <h1
              id="hero-heading"
              className="display-title animate-fade-up mt-6 text-text"
              style={{
                animationDelay: "70ms",
                fontSize: "clamp(2.5rem, 1.5rem + 3.6vw, 4.25rem)",
                lineHeight: 1.1,
              }}
            >
              One partner.
              <br />
              Every system{" "}
              <em className="not-italic text-white/55">covered.</em>
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-xl text-pretty text-text-muted"
              style={{
                animationDelay: "140ms",
                fontSize: "clamp(0.9375rem, 0.88rem + 0.3vw, 1.0625rem)",
                lineHeight: 1.75,
              }}
            >
              Security, networking and IT for homes and businesses across the UAE —
              surveyed, installed and supported by one accountable team.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "210ms" }}
            >
              <Link
                to="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-lg bg-paper px-7 text-[15px] font-semibold text-surface transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                Get a free site survey
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={company.phoneHref}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/20 px-7 text-[15px] font-semibold text-text transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.04]"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
            </div>
          </div>

          {/* RIGHT — carousel */}
          <div className="animate-fade-in min-w-0">
            <div className="aspect-[4/3.1] w-full">
              <HeroCarousel slides={heroSlides} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
