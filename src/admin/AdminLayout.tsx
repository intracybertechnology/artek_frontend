import { type ReactNode } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { LayoutListIcon, PackageIcon, QuoteIcon, LogOutIcon } from "lucide-react";
import { AuthProvider, useAuth } from "./lib/auth";
import type { AdminRole } from "./lib/types";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";

// ── Route guards ─────────────────────────────────────────────────────────

/** Redirects to /admin/login until auth check settles. */
export function Protected({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

/** Redirects already-authenticated users to their home. */
export function PublicOnly({ children }: { children: ReactNode }) {
  const { user, loading, role } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to={roleHome(role)} replace />;
  return <>{children}</>;
}

/**
 * Restricts a route to specific roles.
 * Wrong role is sent to their own home; unauthenticated to login.
 */
export function RoleGuard({
  allow,
  children,
}: {
  allow: AdminRole[];
  children: ReactNode;
}) {
  const { user, loading, role } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!role || !allow.includes(role)) return <Navigate to={roleHome(role)} replace />;
  return <>{children}</>;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function roleHome(role: AdminRole | null): string {
  return role === "super_admin" ? "/admin/quotes" : "/admin/products";
}

function Spinner() {
  return (
    <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────

const NAV: { label: string; to: string; icon: ReactNode; roles: AdminRole[] }[] = [
  {
    label: "Quotes",
    to: "/admin/quotes",
    icon: <LayoutListIcon className="size-4" />,
    roles: ["super_admin"],
  },
  {
    label: "Products",
    to: "/admin/products",
    icon: <PackageIcon className="size-4" />,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Testimonials",
    to: "/admin/testimonials",
    icon: <QuoteIcon className="size-4" />,
    roles: ["super_admin", "admin"],
  },
];

function AdminSidebar() {
  const { user, role, logout } = useAuth();
  const { pathname } = useLocation();

  const links = NAV.filter((n) => role && n.roles.includes(role));

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r bg-card">
      <div className="border-b px-5 py-4">
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          ARTEK Computers
        </p>
        <p className="mt-0.5 text-sm font-semibold">Admin</p>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 space-y-0.5 p-3">
        {links.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith(n.to)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {n.icon}
            {n.label}
          </Link>
        ))}
      </nav>

      <div className="border-t px-4 py-4 space-y-1">
        <p className="text-xs font-medium truncate">{user?.name}</p>
        <p className="text-[11px] text-muted-foreground capitalize">{user?.role?.replace("_", " ")}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full justify-start gap-2"
          onClick={() => void logout()}
        >
          <LogOutIcon className="size-3.5" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}

// ── Shell (authenticated pages only) ─────────────────────────────────────

function AdminShell() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return (
    <div className="flex min-h-dvh">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

// ── Root layout (wraps everything under /admin) ───────────────────────────

export function AdminLayout() {
  return (
    <div className="admin-portal min-h-dvh bg-background text-foreground">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export { AdminShell };
