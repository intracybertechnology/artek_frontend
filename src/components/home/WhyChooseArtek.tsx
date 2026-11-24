import { ClipboardList, Headset, Users } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RevealBox } from "@/components/common/RevealBox";
import "./WhyChooseArtek.css";

const reasons = [
  {
    icon: Users,
    title: "One team for the whole project",
    description: "Coordinate CCTV, networking, and IT through one point of contact.",
  },
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

export function WhyChooseArtek() {
  return (
    <section className="why-artek on-paper bg-white text-slate-900 band" aria-labelledby="why-heading">
      <div className="container-page">
        <SectionHeading
          id="why-heading"
          tone="paper"
          eyebrow="Why ARTEK"
          title="A technology partner, not a supplier."
          description="From the first survey to ongoing support, you don’t have to coordinate several vendors to keep your premises running."
        />
        <ul className="mx-auto mt-8 grid max-w-6xl gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <RevealBox as="li" key={title} delay={index * 110}>
              <div className="why-artek__glass h-full p-5 md:p-6 lg:p-8">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-5">
                  <span className="why-artek__icon grid size-10 shrink-0 place-items-center rounded-xl border border-sky-200/80 bg-white/75 text-sky-800">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold leading-snug md:text-lg">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            </RevealBox>
          ))}
        </ul>
      </div>
    </section>
  );
}
