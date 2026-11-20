import type { NavItem } from "@/types";

/**
 * Central navigation configuration — single source of truth for navbar links
 * (desktop + mobile menu). Update labels/destinations here only.
 */
export const navItems: readonly NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Company", to: "/about" },
  { label: "Solutions", to: "/solutions" },
  { label: "ELV & Access Control", to: "/solutions/elv-access-control-uae" },
  { label: "Industries", to: "/industries" },
  { label: "Brands", to: "/brands" },
  { label: "Insights", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

/** Only the most specific matching item is active, so a nested page doesn't light up its parent.
 *  /products/* also activates the Brands item since Brands is the entry point for products. */
export function activeNavTo(pathname: string): string | undefined {
  const effective =
    pathname === "/products" || pathname.startsWith("/products/") ? "/brands" : pathname;
  return navItems
    .filter((item) =>
      item.to === "/" ? effective === "/" : effective === item.to || effective.startsWith(`${item.to}/`),
    )
    .sort((a, b) => b.to.length - a.to.length)[0]?.to;
}
