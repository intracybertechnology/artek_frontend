import {
  ArrowRight, ArrowUpRight, Cctv, Headset, LayoutGrid, Network, ShieldCheck,
} from "lucide-react";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { coreServices } from "@/data/services";

const featured = [
  { id: "cctv", icon: Cctv, layout: "md:col-span-2" },
  { id: "network", icon: Network, layout: "" },
  { id: "it-services", icon: Headset, layout: "" },
  { id: "cybersecurity", icon: ShieldCheck, layout: "" },
] as const;

export function SolutionsSection() {
  return (
    <section id="solutions" className="scroll-mt-24 border-t border-white/10 bg-[#10141c] band-lg" aria-labelledby="solutions-heading">
      <div className="container-page">
        <SectionHeading
          id="solutions-heading"
          eyebrow="What we do"
          title="Everything your premises needs, from one team."
          description="Explore our security, networking, IT, cloud and cybersecurity services."
        />
        <ul className="mx-auto mt-9 grid max-w-6xl gap-3 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-5">
          {featured.map(({ id, icon: Icon, layout }) => {
            const service = coreServices.find((entry) => entry.id === id);
            if (!service) return null;
            return (
              <li key={service.slug} className={layout}>
                <SpotlightCard
                  to={`/solutions/${service.slug}`}
                  className={`group flex h-full flex-col rounded-2xl border p-4 transition-colors hover:border-sky-400/60 hover:bg-white/[0.09] focus-visible:border-sky-300 sm:p-6 ${id === "cctv" ? "border-sky-400/25 bg-gradient-to-br from-sky-400/15 to-white/[0.04]" : "border-white/12 bg-white/[0.05]"}`}
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-white sm:text-lg">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{service.shortDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300" aria-hidden="true">
                    Explore <ArrowUpRight className="size-4 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                  </span>
                </SpotlightCard>
              </li>
            );
          })}
          <li className="sm:col-span-2 md:col-span-1">
            <SpotlightCard to="/solutions" className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-white transition-colors hover:border-sky-300 hover:bg-sky-400/15 sm:p-6">
              <div>
                <span className="grid size-11 place-items-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
                  <LayoutGrid className="size-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug sm:text-lg">View all solutions</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Find the right service for your site.</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300" aria-hidden="true">Browse solutions <ArrowRight className="size-4" /></span>
            </SpotlightCard>
          </li>
        </ul>
      </div>
    </section>
  );
}
