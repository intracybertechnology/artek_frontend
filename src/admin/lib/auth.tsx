import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { authLogin, authLogout, authMe } from "./api";
import type { AdminRole, AdminUser } from "./types";
import { type ApiError } from "@/lib/api";

type AuthState = {
  user: AdminUser | null;
  role: AdminRole | null;
  /** true until the initial /me check settles — prevents a login flash */
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

/**
 * Session state for the admin SPA.
 * The JWT lives in an httpOnly cookie; on load we call /api/auth/me to
 * restore the session. A 401 means signed out — not an error to surface.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    authMe()
      .then((r) => { if (!cancelled) setUser(r.user); })
      .catch((err: ApiError) => {
        // 401 = not signed in; anything else is a network/server issue —
        // either way we start signed out.
        if (!cancelled) setUser(null);
        if (err.status && err.status !== 401) {
          console.error("Auth check failed:", err.message);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const r = await authLogin(email, password);
    if (!r.success) throw new Error("Sign-in failed.");
    setUser(r.user);
  }, []);

  const logout = useCallback(async () => {
    await authLogout().catch(() => undefined);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, role: user?.role ?? null, loading, login, logout }),
    [user, loading, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
