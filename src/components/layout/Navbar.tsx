import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { activeNavTo, navItems } from "@/data/navigation";
import { company } from "@/data/company";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrolled } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrolled(24);
  const activeTo = activeNavTo(useLocation().pathname);

  const linkCls =
    "relative inline-flex items-center rounded-md px-3 py-2 text-[13.5px] font-semibold tracking-[0.01em] text-text outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-paper/60 before:absolute before:inset-x-3 before:-bottom-0.5 before:h-px before:origin-center before:scale-x-0 before:bg-paper before:transition-transform before:duration-200";

  const activeCls = "before:!scale-x-100";

  return (
    <header className="fixed inset-x-0 top-0 z-40">

      {/* ── Topbar (desktop only) ────────────────────────────────────── */}
      <div className="hidden sm:block">
        <div className="border-b border-white/[0.07] bg-black/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-[87.5rem] items-center justify-end gap-6 px-6 py-1.5">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-text-muted transition-colors duration-200 hover:text-text"
            >
              <Phone className="size-3 shrink-0" aria-hidden="true" />
              {company.phoneDisplay}
            </a>
            {company.email && (
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-text-muted transition-colors duration-200 hover:text-text"
              >
                <Mail className="size-3 shrink-0" aria-hidden="true" />
                {company.email}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Main navbar ──────────────────────────────────────────────────── */}
      <div className="px-3 pt-2 sm:px-6 sm:pt-2">
        <div className="mx-auto max-w-[87.5rem]">
          <div
            className={cn(
              "flex h-14 items-center justify-between gap-2 rounded-xl border px-3 transition-[background-color,border-color,box-shadow] duration-300 sm:h-[3.75rem] sm:gap-4 sm:px-5",
              scrolled
                ? "border-white/10 bg-black/45 shadow-[0_8px_30px_rgb(0_0_0/0.45)] backdrop-blur-xl"
                : "border-white/[0.08] bg-black/20 backdrop-blur-md",
            )}
          >
            <Logo />

            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(linkCls, item.to === activeTo && activeCls)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-paper px-3.5 text-[13px] font-semibold text-surface outline-none transition-colors duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-paper/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:px-4"
              >
                <span className="hidden sm:inline">Get a Quote</span>
                <span className="sm:hidden">Quote</span>
                <ArrowRight
                  className="hidden size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 sm:block"
                  aria-hidden="true"
                />
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
