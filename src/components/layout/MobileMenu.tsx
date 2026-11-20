import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { activeNavTo, navItems } from "@/data/navigation";
import { menuGroupOrder, productGroups, slugify, topBrands } from "@/data/catalog";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation — a white sheet fixed below the dark header bar.
 *
 * "Products" (links to /brands) is an expandable accordion item (chevron)
 * containing:
 *   - a "View all brands" link to /brands
 *   - "Top brands" (flat list)
 *   - "Shop by category" (nested accordion per product group, menu order)
 *
 * The sheet is its own scroll container (dvh height, overflow-y-auto,
 * overscroll-contain, pb-24). The Radix Dialog locks the body scroll while
 * open and restores it on close/unmount; a pathname effect also closes the
 * sheet on route change. Tapping any link closes the whole menu.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { pathname } = useLocation();
  const activeTo = activeNavTo(pathname);
  const productsActive = activeTo === "/brands";

  // Close (and unlock body scroll) if the route changes while open.
  useEffect(() => { setOpen(false); }, [pathname]);

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
        ? "text-blue-700 before:bg-blue-700"
        : "text-slate-600 before:bg-transparent hover:text-slate-900 hover:before:bg-slate-300",
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
          className="size-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500"
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
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />

        {/* Own scroll container: sheet below the 4rem header (pt-2 + h-14),
            dvh height so mobile browser chrome never hides the content. */}
        <Dialog.Content className="fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white pb-24 shadow-xl outline-none">

          {/* Header row */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
            <Dialog.Title asChild>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Menu</p>
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Site navigation. Choose a section, or call us directly.
            </Dialog.Description>
            <Dialog.Close asChild>
              <button
                className="inline-flex size-11 items-center justify-center rounded-lg text-slate-500 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </Dialog.Close>
          </div>

          {/* Call strip */}
          <div className="border-b border-slate-200 px-5 py-4">
            <a
              href={company.phoneHref}
              className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Phone className="size-4 shrink-0 text-slate-500" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Call us</span>
                <span className="text-[15px] font-semibold tracking-tight text-slate-900">{company.phoneDisplay}</span>
              </span>
            </a>
          </div>

          {/* Nav */}
          <nav aria-label="Mobile" className="px-3 pt-4">

            {/* Explore group */}
            <div>
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Explore</p>
              <ul>{plainItemsFor(["/about", "/solutions", "/industries"]).map(row)}</ul>
            </div>

            {/* ── Products accordion ─────────────────────────────────── */}
            <div className="mt-6">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Products</p>

              <Accordion.Root type="multiple">
                <Accordion.Item value="brands" className="border-t border-slate-200">
                  <Accordion.Trigger
                    className={cn(
                      "group flex w-full min-h-[52px] items-center justify-between gap-3 pl-4 pr-2 text-[17px] font-medium tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-600",
                      productsActive ? "text-blue-700" : "text-slate-900 hover:text-blue-700",
                    )}
                  >
                    Products
                    <ChevronDown
                      className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content>

                    {/* View all brands */}
                    <NavLink
                      to="/brands"
                      onClick={close}
                      className="group flex min-h-[48px] items-center justify-between gap-3 pl-6 pr-2 text-[15px] font-medium text-slate-900 transition-colors hover:text-blue-700 hover:underline"
                    >
                      View all brands
                      <ArrowRight
                        className="size-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500"
                        aria-hidden="true"
                      />
                    </NavLink>

                    <Accordion.Root type="multiple">

                      {/* Top brands */}
                      <Accordion.Item value="top-brands" className="border-t border-slate-200">
                        <Accordion.Trigger className="group flex w-full min-h-[48px] items-center justify-between gap-3 pl-4 pr-2 text-[15px] font-medium text-slate-900 outline-none transition-colors hover:text-blue-700 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600">
                          Top brands
                          <ChevronDown
                            className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          />
                        </Accordion.Trigger>
                        <Accordion.Content>
                          <ul className="space-y-0.5 pb-3 pl-6 pr-2">
                            {topBrands.map((brand) => (
                              <li key={brand}>
                                <Link
                                  to={`/brands/${slugify(brand)}`}
                                  onClick={close}
                                  className="block py-1.5 text-[14px] font-medium text-slate-900 transition-colors hover:text-blue-700 hover:underline"
                                >
                                  {brand}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion.Content>
                      </Accordion.Item>

                      {/* Shop by category */}
                      <Accordion.Item value="categories" className="border-t border-slate-200">
                        <Accordion.Trigger className="group flex w-full min-h-[48px] items-center justify-between gap-3 pl-4 pr-2 text-[15px] font-medium text-slate-900 outline-none transition-colors hover:text-blue-700 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600">
                          Shop by category
                          <ChevronDown
                            className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          />
                        </Accordion.Trigger>
                        <Accordion.Content>
                          {/* Nested accordion per product group */}
                          <Accordion.Root type="multiple" className="pb-2 pl-2">
                            {orderedGroups.map((g) => (
                              <Accordion.Item key={g.slug} value={g.slug} className="border-t border-slate-100">
                                <Accordion.Trigger className="group flex w-full min-h-[44px] items-center justify-between gap-3 pl-4 pr-2 text-[13.5px] font-bold text-slate-900 outline-none transition-colors hover:text-blue-700 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600">
                                  <span className="flex-1 text-left">{g.title}</span>
                                  <ChevronDown
                                    className="size-3.5 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    aria-hidden="true"
                                  />
                                </Accordion.Trigger>
                                <Accordion.Content>
                                  <ul className="pb-2 pl-6">
                                    {g.items.map((item) => (
                                      <li key={item}>
                                        <Link
                                          to={`/products/${g.slug}/${slugify(item)}`}
                                          onClick={close}
                                          className="block py-1.5 text-[13px] text-slate-900 transition-colors hover:text-blue-700 hover:underline"
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
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">More</p>
              <ul>{plainItemsFor(["/contact"]).map(row)}</ul>
            </div>

          </nav>

          {/* CTA */}
          <div className="space-y-2.5 border-t border-slate-200 px-5 pt-4">
            <Dialog.Close asChild>
              <Link
                to="/contact"
                className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-900 text-[15px] font-semibold text-white outline-none transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-600"
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
