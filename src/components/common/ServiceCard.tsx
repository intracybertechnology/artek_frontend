import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Cctv,
  Cloud,
  Monitor,
  Network,
  Phone,
  Server,
  Shield,
  Wrench,
} from "lucide-react";
import type { Service } from "@/types";
import SpotlightCard from "@/components/ui/SpotlightCard";

const ICONS = {
  cloud: Cloud,
  monitor: Monitor,
  network: Network,
  phone: Phone,
  cctv: Cctv,
  wrench: Wrench,
  server: Server,
  shield: Shield,
} as const;

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Shield;

  return (
    <SpotlightCard
      theme="dark"
      spotlightColor="#ffffff"
      intensity={0.12}
      spotlightSize={260}
      softness={0.75}
      borderGlow={0.5}
      proximity={90}
      smoothing={0.25}
      grain={0.04}
      className="group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 focus-within:border-white/35"
      style={{ "--spotlight-card-surface": "rgba(255, 255, 255, 0.04)" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-text-muted backdrop-blur-sm transition-all duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-surface group-hover:shadow-lift">
          <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span
          aria-hidden="true"
          className="font-display text-[13px] font-medium tabular-nums tracking-wider text-white/25"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 text-[17px] font-semibold leading-snug tracking-tight text-text">
        <Link
          to={`/solutions/${service.slug}`}
          className="transition-colors after:absolute after:inset-0 after:rounded-[inherit]"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-text-muted">
        {service.shortDescription}
      </p>
      <span
        aria-hidden="true"
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted transition-colors group-hover:text-text"
      >
        Explore
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </SpotlightCard>
  );
}
