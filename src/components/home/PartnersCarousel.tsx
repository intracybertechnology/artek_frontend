import { useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FlexCarousel from "@/components/FlexCarousel";
import { brandLogo, slugify } from "@/data/catalog";

const items = ["Cisco", "Fortinet", "Ubiquiti", "Aruba", "Dell", "HP", "Microsoft", "APC"].flatMap((title) => {
  const src = brandLogo(title);
  return src ? [{ src, title }] : [];
});

export function PartnersCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const navigate = useNavigate();
  if (!items.length) return null;
  const current = items[active] ?? items[0];

  return (
    <section className="on-paper relative isolate border-y border-slate-200 bg-[#eef3f9] text-slate-900 band-tight" aria-labelledby="technology-brands-heading">
      {/* Faint sky wash at the top edge — the logo files sit on white, so the
          tint is what gives the carousel's cards a visible edge. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(ellipse_at_top,#d7e7f7_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="technology-brands-heading" className="display-title text-2xl sm:text-3xl">Technology brands in our catalog</h2>
          <Link to="/brands" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-sky-800 hover:underline">
            View all brands <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        {unavailable ? (
          <ul className="mt-6 flex gap-3 overflow-x-auto p-2" aria-label="Featured brands">
            {items.map(({ src, title }) => (
              <li key={title} className="shrink-0">
                <Link to={`/brands/${slugify(title)}`} className="flex h-24 w-36 items-center justify-center rounded-xl border border-slate-200 bg-white p-4">
                  <img src={src} alt={title} loading="lazy" className="h-full w-full object-contain" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="mt-4 h-[clamp(14rem,28vw,22rem)]" id="technology-brands-carousel">
              <FlexCarousel
                items={items}
                intro="none"
                cardHeight={0.52}
                fit="landscape"
                containImages
                radius={14}
                autoplay={!paused}
                driftSpeed={70}
                interval={4}
                captions={false}
                captureWheel={false}
                focusOnClick={false}
                ariaLabel="Featured brands. Drag, swipe, or use the arrow keys to browse."
                onChange={setActive}
                onSelect={(_, { title }) => navigate(`/brands/${slugify(title)}`)}
                onUnavailable={() => setUnavailable(true)}
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-center text-xs text-slate-600">Drag, swipe, or use the arrow keys to browse</p>
              <div className="flex items-center gap-3">
                <Link to={`/brands/${slugify(current.title)}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-sky-800 hover:underline">
                  Explore {current.title} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <button type="button" onClick={() => setPaused((value) => !value)} aria-controls="technology-brands-carousel" aria-label={paused ? "Resume brand carousel" : "Pause brand carousel"} className="grid size-11 cursor-pointer place-items-center rounded-full text-sky-800 hover:bg-sky-50 motion-reduce:hidden">
                  {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
