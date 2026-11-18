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
  { label: "Products", to: "/products" },
  { label: "Insights", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

/** Only the most specific matching item is active, so a nested page doesn't light up its parent. */
export function activeNavTo(pathname: string): string | undefined {
  return navItems
    .filter((item) =>
      item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`),
    )
    .sort((a, b) => b.to.length - a.to.length)[0]?.to;
}
