import { Link, NavLink, Outlet } from "react-router-dom";
import { FileTextIcon, InboxIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "@/admin/lib/auth";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { to: "/admin", label: "Enquiries", icon: InboxIcon, end: true },
  { to: "/admin/blog", label: "Blog posts", icon: FileTextIcon, end: false },
];

/**
 * Admin layout for signed-in screens: a dark sidebar on desktop, and a compact
 * top bar with horizontal section links on phones.
 */
export function AdminShell() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="bg-[var(--sidebar)] text-[var(--sidebar-foreground)] lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col">
        <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-3 lg:pt-7 lg:pb-6">
          <Link to="/admin" className="leading-tight">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--sidebar-muted)] uppercase">ARTEK Computers</p>
            <p className="text-base font-semibold text-white">Admin</p>
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            aria-label="Sign out"
            className="rounded-md p-2 text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-white lg:hidden"
          >
            <LogOutIcon className="size-4" />
          </button>
        </div>

        <nav
          aria-label="Admin sections"
          className="flex gap-1 overflow-x-auto px-3 pb-3 [scrollbar-width:none] lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {SECTIONS.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              className={({ isActive }) =>
                cn(
                  "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--sidebar-active)] text-white"
                    : "hover:bg-[var(--sidebar-hover)] hover:text-white",
                )
              }
            >
              <s.icon className="size-4" aria-hidden="true" />
              {s.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden border-t border-white/10 p-4 lg:block">
          <p className="truncate text-sm font-medium text-white">{user?.name}</p>
          <p className="mb-3 text-xs text-[var(--sidebar-muted)] capitalize">{user?.role}</p>
          <button
            type="button"
            onClick={() => void logout()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[var(--sidebar-hover)] hover:text-white"
          >
            <LogOutIcon className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
