import { useEffect, useRef, useState } from "react";
import { Cctv, ClipboardList, Headset, Monitor, Network, Users } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import "./WhyChooseArtek.css";

const services = [
  { icon: Cctv, label: "CCTV" },
  { icon: Network, label: "Networking" },
  { icon: Monitor, label: "IT" },
] as const;

const supportingReasons = [
  {
    icon: ClipboardList,
    title: "Clear, itemised quotes",
    description: "See what’s included before work starts.",
  },
  {
    icon: Headset,
    title: "Support after handover",
    description: "Get help with maintenance and changes as your needs grow.",
  },
] as const;

function TeamDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const diagram = ref.current;
    if (!diagram || typeof IntersectionObserver === "undefined") return;
    // Don't replay the entrance if the diagram is already visible on mount.
    if (diagram.getBoundingClientRect().top < window.innerHeight) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(diagram);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="why-artek__diagram" data-entered={entered} aria-hidden="true">
      <div className="why-artek__sources">
        {services.map(({ icon: Icon, label }) => (
          <span key={label} className="why-artek__source">
            <Icon className="size-5 text-sky-700" strokeWidth={1.7} />
            {label}
          </span>
        ))}
      </div>
      <svg className="why-artek__connectors" viewBox="0 0 300 64" preserveAspectRatio="none" fill="none" stroke="currentColor" focusable="false">
        <path pathLength="1" d="M50 0 V16 Q50 32 66 32 H134 Q150 32 150 48 V64" />
        <path pathLength="1" d="M150 0 V64" />
        <path pathLength="1" d="M250 0 V16 Q250 32 234 32 H166 Q150 32 150 48 V64" />
      </svg>
      <span className="why-artek__destination">
        <Users className="size-5 text-sky-300" strokeWidth={1.7} />
        One point of contact
      </span>
    </div>
  );
}

export function WhyChooseArtek() {
  return (
    <section className="on-paper bg-white text-slate-900 band" aria-labelledby="why-heading">
      <div className="container-page">
        <SectionHeading
          id="why-heading"
          tone="paper"
          eyebrow="Why ARTEK"
          title="A technology partner, not a supplier."
        />
        <div className="mx-auto mt-9 grid max-w-6xl gap-7 md:mt-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center md:gap-10 lg:gap-16">
          <div className="why-artek__lead rounded-2xl border border-sky-100 p-4 sm:p-7 lg:p-9">
            <h3 className="display-title text-2xl sm:text-3xl">One team for the whole project</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Coordinate CCTV, networking, and IT through one point of contact.
            </p>
            <TeamDiagram />
          </div>
          <ul className="divide-y divide-slate-200 border-y border-slate-200 md:border-y-0">
            {supportingReasons.map(({ icon: Icon, title, description }) => (
              <li key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-6 lg:py-8">
                <span className="grid size-10 place-items-center rounded-xl bg-sky-50 text-sky-700">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
