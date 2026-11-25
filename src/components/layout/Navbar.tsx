import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { activeNavTo, navItems } from "@/data/navigation";
import { menuGroupOrder, productGroups, slugify, topBrands } from "@/data/catalog";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrolled } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";


/**
 * Premium floating navigation with a Products mega menu.
 *
 * The Products trigger is a plain link to /products (click navigates) with a
 * chevron that flips while the panel is open. The panel opens on:
 *   - hover over the trigger (200 ms open delay, 150 ms close delay)
 *   - keyboard focus into the trigger
 * It closes on:
 *   - mouse leaving the trigger + panel (150 ms delay, no flicker)
 *   - Escape key (focus returns to the trigger)
 *   - route change, click outside, focus leaving the header (Tab)
 *
 * The bar stays dark; the white panel below it shows a category rail on the
 * left, the selected category's products in the middle, and top brands on
 * the right — no dark overlay or glow over the page content.
 */
export function Navbar() {
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();
  const activeTo = activeNavTo(pathname);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [panelCanScroll, setPanelCanScroll] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocusOpen = useRef(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const categoryListRef = useRef<HTMLElement>(null);
  const panelScrollRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /** Groups in menu order: menuGroupOrder first, unlisted slugs after (stable). */
  const orderedGroups = useMemo(() => {
    const rank = (slug: string) => {
      const i = menuGroupOrder.indexOf(slug);
      return i === -1 ? menuGroupOrder.length : i;
    };
    return [...productGroups].sort((a, b) => rank(a.slug) - rank(b.slug));
  }, []);

  // The menu always opens on the first category in the order.
  useEffect(() => {
    if (megaOpen) setActiveSlug(orderedGroups[0]?.slug ?? null);
  }, [megaOpen, orderedGroups]);

  const activeGroup = orderedGroups.find((g) => g.slug === activeSlug) ?? orderedGroups[0];

  /** Hovering a rail row activates it after 80 ms; leaving cancels. */
  const scheduleActivate = useCallback((slug: string) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveSlug(slug), 80);
  }, []);

  const cancelActivate = useCallback(() => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = undefined; }
  }, []);

  /** ArrowUp/ArrowDown move focus through the rail rows; focusing a row
   *  also activates it (rows activate on focus). */
  const onCategoryListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const rows = categoryListRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (!rows?.length) return;
    const list = [...rows];
    const i = list.indexOf(document.activeElement as HTMLAnchorElement);
    const next = list[i + (e.key === "ArrowDown" ? 1 : -1)] ?? list[e.key === "ArrowDown" ? 0 : list.length - 1];
    next?.focus();
  };

  /** "Scroll for more" pill: shown only while the panel actually overflows. */
  const updatePanelFade = useCallback(() => {
    const el = panelScrollRef.current;
    if (el) setPanelCanScroll(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    if (panelScrollRef.current) panelScrollRef.current.scrollTop = 0;
    requestAnimationFrame(updatePanelFade);
    window.addEventListener("resize", updatePanelFade, { passive: true });
    return () => window.removeEventListener("resize", updatePanelFade);
  }, [megaOpen, updatePanelFade]);

  /** Close immediately, dropping any pending timer. */
  const closeNow = useCallback(() => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = undefined; }
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
        <div className="relative mx-auto max-w-[87.5rem]">

          {/* ── Nav bar ─────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex h-14 items-center justify-between gap-2 rounded-xl border px-3 transition-[background-color,border-color,box-shadow] duration-300 sm:h-[3.75rem] sm:gap-4 sm:px-5",
              megaOpen
                ? "border-white/10 bg-surface shadow-none"
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

                // ── Products trigger ─────────────────────────────────
                // Click still navigates to /products; hover or keyboard focus
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
                      to="/products"
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
            // Hover area = invisible bridge + card, so the pointer can cross
            // the gap between the header bar and the card without closing.
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Products and brands menu"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="absolute left-1/2 top-full z-30 mt-2 w-[900px] max-w-[calc(100vw-2rem)] -translate-x-1/2"
            >
              {/* Invisible bridge over the header→card gap */}
              <div aria-hidden="true" className="absolute inset-x-0 -top-3 h-3" />
              {/* The card scrolls only on really short screens (.menu-scroll) */}
              <div
                ref={panelScrollRef}
                onScroll={updatePanelFade}
                data-lenis-prevent
                className="menu-scroll overscroll-contain max-h-[calc(100vh-6rem)] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
              >
                <div className="grid grid-cols-[230px_1fr] gap-6">

                  {/* LEFT — category rail */}
                  <div>
                    <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Categories
                    </p>
                    <nav
                      ref={categoryListRef}
                      aria-label="Product categories"
                      onKeyDown={onCategoryListKeyDown}
                      className="flex flex-col gap-0.5"
                    >
                      {orderedGroups.map((g) => {
                        const isActive = g.slug === activeGroup?.slug;
                        return (
                          <Link
                            key={g.slug}
                            to={`/products/${g.slug}`}
                            onClick={() => setMegaOpen(false)}
                            onMouseEnter={() => scheduleActivate(g.slug)}
                            onMouseLeave={cancelActivate}
                            onFocus={() => { cancelActivate(); setActiveSlug(g.slug); }}
                            className={cn(
                              "flex items-center justify-between gap-2 rounded-md px-3 py-1.5 text-[15px] font-medium text-slate-900 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
                              isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100",
                            )}
                          >
                            {g.title}
                            <ChevronRight
                              className={cn("size-4 shrink-0", isActive ? "text-white/70" : "text-slate-400")}
                              aria-hidden="true"
                            />
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  {/* MIDDLE — products of the selected category */}
                  <div className="min-h-[300px]">
                    {activeGroup && (
                      <>
                        <Link
                          to={`/products/${activeGroup.slug}`}
                          onClick={() => setMegaOpen(false)}
                          className="text-xl font-extrabold text-slate-900 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        >
                          {activeGroup.title}
                        </Link>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{activeGroup.intro}</p>
                        <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1">
                          {activeGroup.items.map((item) => (
                            <li key={item}>
                              <Link
                                to={`/products/${activeGroup.slug}/${slugify(item)}`}
                                onClick={() => setMegaOpen(false)}
                                className="flex items-center gap-1.5 rounded-sm py-0.5 text-[15px] font-medium text-slate-900 outline-none transition-colors hover:text-blue-700 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600"
                              >
                                <span className="size-1 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={`/products/${activeGroup.slug}`}
                          onClick={() => setMegaOpen(false)}
                          className="group mt-6 inline-flex items-center gap-1.5 rounded-sm text-[13px] font-semibold text-slate-900 outline-none transition-colors hover:text-blue-700 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600"
                        >
                          View all {activeGroup.title}
                          <ArrowRight
                            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* BOTTOM — top brands strip */}
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-slate-200 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Top brands
                  </p>
                  {topBrands.map((brand) => (
                    <Link
                      key={brand}
                      to={`/brands/${slugify(brand)}`}
                      onClick={() => setMegaOpen(false)}
                      className="rounded-sm text-sm font-medium text-slate-900 outline-none transition-colors hover:text-blue-700 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      {brand}
                    </Link>
                  ))}
                  <Link
                    to="/brands"
                    onClick={() => setMegaOpen(false)}
                    className="group inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-slate-900 outline-none transition-colors hover:text-blue-700 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    View all brands
                    <ArrowRight
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
              {panelCanScroll && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center rounded-b-2xl bg-gradient-to-t from-white pb-3 pt-6 to-transparent"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                    Scroll for more
                    <ChevronDown className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </header>
  );
}
