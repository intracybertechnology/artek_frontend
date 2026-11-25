import { ClipboardCheck, Headset, MapPin, Wrench } from "lucide-react";

const highlights = [
  { icon: MapPin, label: "Dubai-based team" },
  { icon: ClipboardCheck, label: "Site surveys" },
  { icon: Wrench, label: "Installation & handover" },
  { icon: Headset, label: "Ongoing support" },
] as const;

export function TrustIndicators() {
  return (
    <section className="border-y border-slate-200 bg-white text-slate-900" aria-label="Working with ARTEK">
      <ul className="container-page grid grid-cols-2 py-2 sm:py-4 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2.5 border-slate-200 px-2 py-3.5 even:border-l nth-[n+3]:border-t sm:justify-center sm:gap-3 sm:px-4 lg:border-t-0 lg:nth-[n+3]:border-t-0 lg:not-first:border-l"
          >
            <Icon className="size-5 shrink-0 text-sky-700" strokeWidth={1.7} aria-hidden="true" />
            <span className="text-sm font-semibold leading-snug">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
