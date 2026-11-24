import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { approvedTestimonials, demoTestimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const preview = import.meta.env.DEV && approvedTestimonials.length === 0;
const stories = preview ? demoTestimonials : approvedTestimonials;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  if (!stories.length) return null;

  const active = stories[index];
  const multiple = stories.length > 1;
  const initials = active.name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase();

  function select(next: number) {
    const target = (next + stories.length) % stories.length;
    if (target === index) return;
    setIndex(target);
    setAnnouncement(`${preview ? "Sample" : "Story"} ${target + 1} of ${stories.length}: ${stories[target].name}`);
  }

  return (
    <section className="on-paper bg-white text-slate-900 band" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <SectionHeading
          id="testimonials-heading"
          tone="paper"
          eyebrow={preview ? "Design preview" : "Client stories"}
          title={preview ? "A preview of our client stories." : "What clients say after the work is done."}
          description={preview ? "Fictional examples for layout review only. These are not customer endorsements." : undefined}
        />
        <div
          className="relative isolate mx-auto mt-8 max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-700 bg-[#0b1220] px-5 py-7 text-white shadow-[0_24px_64px_-36px_#102a43] sm:mt-12 sm:p-10 lg:px-14"
          role="group"
          aria-roledescription="carousel"
          aria-label={preview ? "Sample stories" : "Client stories"}
          onKeyDown={(event) => {
            if (!multiple || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            select(index + (event.key === "ArrowRight" ? 1 : -1));
          }}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = multiple && event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || event.touches.length) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) select(index + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#123b53,transparent_65%)]" aria-hidden="true" />
          <div className="flex items-center justify-between gap-4">
            <Quote className="size-8 text-sky-300" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.16em] text-sky-200 uppercase tabular-nums">
              {preview ? "Sample" : "Story"} {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
            </span>
          </div>
          <div id="client-story" className="mt-5 grid">
            {stories.map((story) => (
              <div key={story.id} aria-hidden="true" className="invisible col-start-1 row-start-1 pb-20 text-lg leading-relaxed sm:text-2xl lg:text-3xl">{story.quote}</div>
            ))}
            <figure key={active.id} className="col-start-1 row-start-1 flex flex-col justify-between gap-6 motion-safe:animate-fade-up">
              <blockquote className="font-display text-lg leading-relaxed text-pretty sm:text-2xl lg:text-3xl">{active.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                {active.image ? (
                  <img src={active.image} alt="" loading="lazy" className="size-11 shrink-0 rounded-full object-cover ring-1 ring-sky-300/40" />
                ) : (
                  <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-sky-400/15 text-sm font-bold text-sky-200 ring-1 ring-sky-300/40">{initials}</span>
                )}
                <div>
                  <p className="text-sm font-bold text-white">{active.name}</p>
                  <p className="mt-1 text-xs text-slate-300">{[active.role, active.company].filter(Boolean).join(" · ")}</p>
                </div>
              </figcaption>
            </figure>
          </div>
          {multiple && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
              <div role="group" aria-label="Choose a story" className="flex flex-wrap">
                {stories.map((story, i) => (
                  <button key={story.id} type="button" onClick={() => select(i)} aria-label={`Show ${preview ? "sample" : "story"} ${i + 1}: ${story.name}`} aria-current={i === index ? "true" : undefined} aria-controls="client-story" className="grid size-10 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-sky-300">
                    <span aria-hidden="true" className={cn("h-2 rounded-full", i === index ? "w-5 bg-sky-300" : "w-2 bg-slate-400")} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {[{ icon: ChevronLeft, label: "Previous story", offset: -1 }, { icon: ChevronRight, label: "Next story", offset: 1 }].map(({ icon: Icon, label, offset }) => (
                  <button key={label} type="button" aria-label={label} aria-controls="client-story" onClick={() => select(index + offset)} className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-sky-300 hover:bg-sky-300/15 focus-visible:outline-2 focus-visible:outline-sky-300">
                    <Icon className="size-5" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}
          <p role="status" className="sr-only">{announcement}</p>
        </div>
      </div>
    </section>
  );
}
