import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { activeNavTo, navItems } from "@/data/navigation";
import { menuGroupOrder, productGroups, slugify, topBrands } from "@/data/catalog";
import { company } from "@/data/company";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

/** Shared animation classes for every Accordion.Content in this panel. */
const contentAnim =
  "overflow-hidden data-[state=closed]:animate-[accordion-up_0.2s_ease-out] data-[state=open]:animate-[accordion-down_0.2s_ease-out]";

/**
 * Mobile navigation panel.
 *
 * "Products" (links to /brands) is an expandable accordion item (chevron)
 * containing:
 *   - a "View all brands" link to /brands
 *   - "Top brands" (flat list)
 *   - "Shop by category" (nested accordion per product group)
 *
 * All other items are plain nav rows as before. Tapping any link closes
 * the whole menu.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { pathname } = useLocation();
  const activeTo = activeNavTo(pathname);
  const productsActive = activeTo === "/brands";

  /** Groups in menu order: menuGroupOrder first, unlisted slugs after (stable). */
  const menuGroupRank = (slug: string) => {
    const i = menuGroupOrder.indexOf(slug);
    return i === -1 ? menuGroupOrder.length : i;
  };
  const orderedGroups = [...productGroups].sort((a, b) => menuGroupRank(a.slug) - menuGroupRank(b.slug));

  const plainItemsFor = (paths: readonly string[]) =>
    navItems.filter((item) => paths.includes(item.to));

  const linkClass = (isActive: boolean) =>
    cn(
      "group relative flex min-h-[52px] items-center justify-between gap-3 pl-4 pr-2 text-[17px] font-medium tracking-[-0.01em] outline-none transition-colors",
      "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-px before:-translate-y-1/2 before:transition-colors",
      isActive
        ? "text-text before:bg-paper"
        : "text-text-muted before:bg-transparent hover:text-text hover:before:bg-white/30",
    );

  const row = (item: (typeof navItems)[number]) => (
    <li key={item.to} className="list-none">
      <NavLink
        to={item.to}
        onClick={close}
        className={linkClass(item.to === activeTo)}
      >
        {item.label}
        <ArrowRight
          className="size-4 shrink-0 text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-text-muted"
          aria-hidden="true"
        />
      </NavLink>
    </li>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex size-11 items-center justify-center rounded-lg text-text outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-paper/60 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" strokeWidth={1.75} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[90vw] max-w-sm flex-col border-l border-white/10 bg-surface-2 shadow-[-20px_0_60px_rgb(0_0_0/0.6)] outline-none">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Dialog.Title asChild><Logo /></Dialog.Title>
            <Dialog.Description className="sr-only">
              Site navigation. Choose a section, or call us directly.
            </Dialog.Description>
            <Dialog.Close asChild>
              <button
                className="inline-flex size-11 items-center justify-center rounded-lg text-text-muted outline-none transition-colors hover:bg-white/[0.06] hover:text-text focus-visible:ring-2 focus-visible:ring-paper/60"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </Dialog.Close>
          </div>

          {/* Call strip */}
          <div className="border-b border-white/10 px-5 py-4">
            <a
              href={company.phoneHref}
              className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-4 py-3 outline-none transition-colors hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-paper/60"
            >
              <Phone className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Call us</span>
                <span className="text-[15px] font-semibold tracking-tight text-text">{company.phoneDisplay}</span>
              </span>
            </a>
          </div>

          {/* Nav — scrolls inside itself; bottom padding for the CTA bar */}
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-3 pt-4 pb-6">

            {/* Explore group */}
            <div>
              <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Explore</p>
              <ul>{plainItemsFor(["/about", "/solutions", "/industries"]).map(row)}</ul>
            </div>

            {/* ── Products accordion ─────────────────────────────────── */}
            <div className="mt-6">
              <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Products</p>

              <Accordion.Root type="multiple">
                <Accordion.Item value="brands" className="border-t border-white/[0.06]">
                  <Accordion.Trigger
                    className={cn(
                      "group flex w-full min-h-[52px] items-center justify-between gap-3 pl-4 pr-2 text-[17px] font-medium tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-paper/60",
                      productsActive ? "text-text" : "text-text-muted hover:text-text",
                    )}
                  >
                    Products
                    <ChevronDown
                      className="size-4 shrink-0 text-white/30 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className={contentAnim}>

                    {/* View all brands */}
                    <NavLink
                      to="/brands"
                      onClick={close}
                      className="group flex min-h-[48px] items-center justify-between gap-3 pl-6 pr-2 text-[15px] font-medium text-text transition-colors hover:underline"
                    >
                      View all brands
                      <ArrowRight
                        className="size-4 shrink-0 text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-text-muted"
                        aria-hidden="true"
                      />
                    </NavLink>

                    <Accordion.Root type="multiple">

                      {/* Top brands */}
                      <Accordion.Item value="top-brands" className="border-t border-white/[0.06]">
                        <Accordion.Trigger className="group flex w-full min-h-[48px] items-center justify-between gap-3 pl-4 pr-2 text-[15px] font-medium text-text outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-paper/60">
                          Top brands
                          <ChevronDown
                            className="size-4 shrink-0 text-white/30 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          />
                        </Accordion.Trigger>
                        <Accordion.Content className={contentAnim}>
                          <ul className="space-y-0.5 pb-3 pl-6 pr-2">
                            {topBrands.map((brand) => (
                              <li key={brand}>
                                <Link
                                  to={`/brands/${slugify(brand)}`}
                                  onClick={close}
                                  className="block py-1.5 text-[14px] font-medium text-text transition-colors hover:underline"
                                >
                                  {brand}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion.Content>
                      </Accordion.Item>

                      {/* Shop by category */}
                      <Accordion.Item value="categories" className="border-t border-white/[0.06]">
                        <Accordion.Trigger className="group flex w-full min-h-[48px] items-center justify-between gap-3 pl-4 pr-2 text-[15px] font-medium text-text outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-paper/60">
                          Shop by category
                          <ChevronDown
                            className="size-4 shrink-0 text-white/30 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          />
                        </Accordion.Trigger>
                        <Accordion.Content className={contentAnim}>
                          {/* Nested accordion per product group */}
                          <Accordion.Root type="multiple" className="pb-2 pl-2">
                            {orderedGroups.map((g) => (
                              <Accordion.Item key={g.slug} value={g.slug} className="border-t border-white/[0.04]">
                                <Accordion.Trigger className="group flex w-full min-h-[44px] items-center justify-between gap-3 pl-4 pr-2 text-[13.5px] font-bold text-text outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-paper/60">
                                  <span className="flex-1 text-left">{g.title}</span>
                                  <ChevronDown
                                    className="size-3.5 shrink-0 text-white/25 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    aria-hidden="true"
                                  />
                                </Accordion.Trigger>
                                <Accordion.Content className={contentAnim}>
                                  <ul className="pb-2 pl-6">
                                    {g.items.map((item) => (
                                      <li key={item}>
                                        <Link
                                          to={`/products/${g.slug}/${slugify(item)}`}
                                          onClick={close}
                                          className="block py-1.5 text-[13px] text-white transition-colors hover:underline"
                                        >
                                          {item}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </Accordion.Content>
                              </Accordion.Item>
                            ))}
                          </Accordion.Root>
                        </Accordion.Content>
                      </Accordion.Item>

                    </Accordion.Root>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>

            {/* More group */}
            <div className="mt-6">
              <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">More</p>
              <ul>{plainItemsFor(["/contact"]).map(row)}</ul>
            </div>

          </nav>

          {/* CTA */}
          <div className="space-y-2.5 border-t border-white/10 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Dialog.Close asChild>
              <Link
                to="/contact"
                className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-paper text-[15px] font-semibold text-surface outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-paper/40"
              >
                Get a Quote
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Dialog.Close>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
