import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { activeNavTo, navItems } from "@/data/navigation";
import { productGroups, slugify, topBrands } from "@/data/catalog";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrolled } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * Premium floating navigation with a Brands mega menu.
 *
 * The Brands trigger is a plain link to /brands (click navigates) with a
 * chevron that flips while the panel is open. The panel opens on:
 *   - hover over the trigger (200 ms open delay, 150 ms close delay)
 *   - keyboard focus into the trigger
 * It closes on:
 *   - mouse leaving the trigger + panel (150 ms delay, no flicker)
 *   - Escape key (focus returns to the trigger)
 *   - route change, click outside, focus leaving the header (Tab)
 */
export function Navbar() {
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();
  const activeTo = activeNavTo(pathname);

  const [megaOpen, setMegaOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocusOpen = useRef(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /** Close immediately, dropping any pending open/close timer. */
  const closeNow = useCallback(() => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setMegaOpen(false);
  }, []);

  // Close on route change. Cancels any pending hover-open timer so the panel
  // cannot re-open over the destination page while the cursor rests on the
  // trigger after a click.
  useEffect(() => { closeNow(); }, [pathname]);

  // Close on click outside
  useEffect(() => {
    if (!megaOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) return;
      closeNow();
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [megaOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // Returning focus to the trigger re-fires its onFocus; suppress that
        // one open so Escape actually leaves the menu closed.
        if (document.activeElement !== triggerRef.current) suppressFocusOpen.current = true;
        closeNow();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const scheduleOpen = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    openTimer.current = setTimeout(() => setMegaOpen(true), 200);
  }, []);

  const scheduleClose = useCallback(() => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const linkCls =
    "relative inline-flex items-center rounded-md px-3 py-2 text-[13.5px] font-semibold tracking-[0.01em] text-text outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-paper/60 before:absolute before:inset-x-3 before:-bottom-0.5 before:h-px before:origin-center before:scale-x-0 before:bg-paper before:transition-transform before:duration-200";
  const activeCls = "before:!scale-x-100";

  return (
    <header
      className="fixed inset-x-0 top-0 z-40"
      onBlur={(e) => {
        // Tab support: close when keyboard focus leaves the header entirely.
        if (megaOpen && !e.currentTarget.contains(e.relatedTarget as Node | null)) closeNow();
      }}
    >
      <div className="px-3 pt-2 sm:px-6 sm:pt-3">
        <div className="mx-auto max-w-[87.5rem]">

          {/* ── Nav bar ─────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex h-14 items-center justify-between gap-2 rounded-xl border px-3 transition-[background-color,border-color,box-shadow] duration-300 sm:h-[3.75rem] sm:gap-4 sm:px-5",
              megaOpen
                ? "rounded-b-none border-white/10 bg-black/60 shadow-none backdrop-blur-xl"
                : scrolled
                  ? "border-white/10 bg-black/45 shadow-[0_8px_30px_rgb(0_0_0/0.45)] backdrop-blur-xl"
                  : "border-white/[0.08] bg-black/20 backdrop-blur-md",
            )}
          >
            <Logo />

            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                if (item.to !== "/brands") {
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={cn(linkCls, item.to === activeTo && activeCls)}
                    >
                      {item.label}
                    </NavLink>
                  );
                }

                // ── Brands trigger ──────────────────────────────────
                // Click still navigates to /brands; hover or keyboard focus
                // opens the mega panel.
                return (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={scheduleOpen}
                    onMouseLeave={scheduleClose}
                  >
                    <NavLink
                      ref={triggerRef}
                      to={item.to}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onFocus={() => {
                        if (suppressFocusOpen.current) { suppressFocusOpen.current = false; return; }
                        cancelClose();
                        setMegaOpen(true);
                      }}
                      className={cn(linkCls, "gap-1", item.to === activeTo && activeCls)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-4 text-white/50 transition-transform duration-200",
                          megaOpen && "rotate-180 text-white/70",
                        )}
                        aria-hidden="true"
                      />
                    </NavLink>
                  </div>
                );
              })}
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

          {/* ── Mega menu panel ─────────────────────────────────────── */}
          {megaOpen && (
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Brands and products menu"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className={cn(
                "max-h-[75vh] overflow-y-auto rounded-b-xl border border-t-0 border-white/10 bg-black/60 backdrop-blur-xl",
                "shadow-[0_20px_60px_rgb(0_0_0/0.55)]",
              )}
            >
              <div className="container-page grid gap-8 py-8 lg:grid-cols-[4fr_11fr_5fr]">

                {/* LEFT (~20%) — intro card */}
                <div className="flex flex-col rounded-xl border border-white/10 bg-surface-2/60 p-5">
                  <h3 className="display-title text-lg text-text">
                    Shop by brand and category
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-text-muted">
                    Browse the cabling, networking, computer and security products we supply in Dubai.
                  </p>
                  <Link
                    to="/brands"
                    onClick={() => setMegaOpen(false)}
                    className="group mt-6 inline-flex h-9 items-center gap-1.5 self-start rounded-lg bg-paper px-3.5 text-[12.5px] font-semibold text-surface outline-none transition-colors duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-paper/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    Shop all brands
                    <ArrowRight
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                {/* MIDDLE (~55%) — categories */}
                <div>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Shop by category
                  </p>
                  <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    {productGroups.map((g) => (
                      <div key={g.slug}>
                        <Link
                          to={`/products/${g.slug}`}
                          onClick={() => setMegaOpen(false)}
                          className="block text-[13px] font-semibold text-white/90 hover:text-white"
                        >
                          {g.title}
                        </Link>
                        <div className="mt-2 mb-2.5 h-px bg-white/[0.08]" aria-hidden="true" />
                        <p className="mb-2.5 line-clamp-2 text-[11.5px] italic leading-snug text-white/35">
                          {g.intro}
                        </p>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {g.items.map((item) => (
                            <li key={item}>
                              <Link
                                to={`/products/${g.slug}/${slugify(item)}`}
                                onClick={() => setMegaOpen(false)}
                                className="flex items-start gap-1.5 rounded-sm text-[12px] leading-snug text-white/50 outline-none transition-colors hover:text-white/90 focus-visible:ring-1 focus-visible:ring-paper/50"
                              >
                                <span
                                  className="mt-[6px] size-[3px] shrink-0 rounded-full bg-white/25"
                                  aria-hidden="true"
                                />
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT (~25%) — top brands */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Top brands
                  </p>
                  <ul className="space-y-1.5">
                    {topBrands.map((brand) => (
                      <li key={brand}>
                        <Link
                          to={`/brands/${slugify(brand)}`}
                          onClick={() => setMegaOpen(false)}
                          className="block rounded-sm text-[13px] font-medium text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-paper/50"
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 border-t border-white/[0.08] pt-4">
                    <Link
                      to="/brands"
                      onClick={() => setMegaOpen(false)}
                      className="group inline-flex items-center gap-1.5 rounded-sm text-[13px] font-semibold text-text outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-paper/50"
                    >
                      View all brands
                      <ArrowRight
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
