import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, CalendarDays, Users, Headphones } from "lucide-react";
import { trustClaims } from "@/data/company";
import SpotlightCard from "@/components/ui/SpotlightCard";

const CLAIM_LINKS: Partial<Record<(typeof trustClaims)[number]["id"], string>> = {
  sira: "/solutions/sira-approved-cctv-dubai",
};

const CLAIM_ICONS: Partial<Record<(typeof trustClaims)[number]["id"], typeof ShieldCheck>> = {
  sira: ShieldCheck,
  years: CalendarDays,
  clients: Users,
  support: Headphones,
};

export function TrustIndicators() {
  return (
    <section
      className="border-t border-white/[0.08]"
      aria-label="Credentials"
    >
      <div className="container-page band-tight">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustClaims.map((claim) => {
            const to = CLAIM_LINKS[claim.id];
            const Icon = CLAIM_ICONS[claim.id];
            const body = (
              <div className="flex h-full flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  {Icon && (
                    <span className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-sm transition-colors duration-200 group-hover:border-white/20 group-hover:bg-white/[0.1]">
                      <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  )}
                  <p className="text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                    {claim.label}
                    {to && (
                      <ArrowUpRight
                        className="ml-1 inline size-4 text-white/50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </p>
                </div>
                {claim.detail && (
                  <p className="text-xs leading-snug text-white/60">{claim.detail}</p>
                )}
              </div>
            );

            return (
              <SpotlightCard
                key={claim.id}
                theme="dark"
                spotlightColor="#ffffff"
                intensity={0.12}
                spotlightSize={220}
                softness={0.8}
                borderGlow={0.5}
                proximity={70}
                smoothing={0.3}
                grain={0.03}
                className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  padding: "1.25rem",
                  "--spotlight-card-surface": "rgba(255, 255, 255, 0.05)",
                } as React.CSSProperties}
              >
                {to ? (
                  <Link to={to} className="block h-full">
                    {body}
                  </Link>
                ) : (
                  <div className="h-full">{body}</div>
                )}
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
