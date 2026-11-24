import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, ConciergeBell, Factory, Home, Store, Warehouse } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArrowCTA } from "@/components/common/CTAButton";
import { industries } from "@/data/industries";
import "./IndustriesSection.css";

const icons = {
  "building-2": Building2,
  store: Store,
  home: Home,
  warehouse: Warehouse,
  "concierge-bell": ConciergeBell,
  factory: Factory,
} as const;

const images: Partial<Record<string, string>> = {
  "corporate-offices": "/images/services/computer-systems.jpg",
  "retail-shopping": "/images/services/cctv.jpg",
  "residential-properties": "/images/hero/slide4-entry.webp",
  "warehouses-logistics": "/images/industries/warehouse.webp",
  hospitality: "/images/industries/hospitality.webp",
  "industrial-facilities": "/images/industries/industrial-facilities.webp",
};

/** React Bits–style expanding panels, using CSS sizing transitions. */
export function IndustriesSection() {
  const [active, setActive] = useState(industries[0]?.slug);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  return (
    <section className="band-lg" aria-labelledby="industries-heading">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            id="industries-heading"
            align="left"
            eyebrow="Industries"
            title="Built around how your premises actually runs."
            description="A villa, a warehouse and a clinic have different risks, budgets and regulations. The work starts with yours."
          />
          <ArrowCTA to="/industries">See all industries we serve</ArrowCTA>
        </div>

        <ul
          className="industries-gallery mt-8"
          aria-label="Industries we serve"
          onPointerLeave={() => { pointer.current = null; }}
        >
          {industries.map((industry) => {
            const Icon = icons[industry.icon as keyof typeof icons] ?? Building2;
            const image = images[industry.slug];
            const expanded = industry.slug === active;
            const detailsId = `industry-preview-${industry.slug}`;
            return (
              <li
                key={industry.slug}
                className="industries-gallery__panel"
                data-expanded={expanded}
                onPointerMove={(event) => {
                  if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 64rem)").matches) return;
                  const x = event.clientX;
                  const y = event.clientY;
                  // Resizing panels can move under a stationary pointer. Only
                  // switch when the visitor actually moves the mouse.
                  if (pointer.current?.x === x && pointer.current.y === y) return;
                  pointer.current = { x, y };
                  if (!expanded && !event.currentTarget.parentElement?.contains(document.activeElement)) {
                    setActive(industry.slug);
                  }
                }}
              >
                {image
                  ? <img className="industries-gallery__image" src={image} alt="" loading="lazy" decoding="async" />
                  : <Icon className="industries-gallery__watermark" aria-hidden="true" />}
                <div className="industries-gallery__caption">
                  <h3>
                    <button
                      type="button"
                      className="industries-gallery__trigger"
                      aria-expanded={expanded}
                      aria-controls={detailsId}
                      onClick={() => setActive(industry.slug)}
                    >
                      <Icon className="size-5 shrink-0 text-sky-300" aria-hidden="true" />
                      <span>
                        {industry.slug === "hospitality" ? (
                          <>Hospitality <span className={expanded ? undefined : "lg:block"}>Venues</span></>
                        ) : industry.name}
                      </span>
                    </button>
                  </h3>
                  <div id={detailsId} className="industries-gallery__details" hidden={!expanded}>
                    <p className="text-sm leading-relaxed text-slate-200">{industry.description}</p>
                    <Link to={`/industries/${industry.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                      Explore {industry.name} <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {/* <p className="mt-4 text-xs text-text-muted">Images are illustrative, not photos of ARTEK projects.</p> */}
      </div>
    </section>
  );
}
