import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2Icon, MailIcon, ShieldCheckIcon } from "lucide-react";
import { useAuth } from "@/admin/lib/auth";
import { Alert } from "@/admin/components/ui/alert";
import { Button } from "@/admin/components/ui/button";
import { Input } from "@/admin/components/ui/input";
import { Label } from "@/admin/components/ui/label";
import { PasswordInput } from "@/admin/components/ui/password-input";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-[var(--sidebar)] p-12 text-white lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-[var(--sidebar-active)]/30 blur-3xl"
        />
        <div className="relative">
          <p className="text-[11px] font-bold tracking-[0.25em] text-[var(--sidebar-muted)] uppercase">ARTEK Computers</p>
        </div>
        <div className="relative max-w-md">
          <ShieldCheckIcon className="mb-6 size-10 text-[#93c5fd]" aria-hidden="true" />
          <h2 className="text-3xl leading-tight font-semibold tracking-tight">Website administration</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--sidebar-foreground)]">
            Review website enquiries and publish blog articles for Artek Computers in one place.
          </p>
        </div>
        <p className="relative text-xs text-[var(--sidebar-muted)]">For authorised ARTEK staff only.</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <p className="text-[11px] font-bold tracking-[0.25em] text-[var(--muted-foreground)] uppercase">ARTEK Computers</p>
            <p className="mt-1 text-sm font-semibold">Website administration</p>
          </div>

          <div className="rounded-2xl border bg-card p-7 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.12)] sm:p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-muted-foreground mt-1.5 text-sm">Use your staff email and password.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <MailIcon
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="username"
                    required
                    placeholder="you@artekteam.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-card pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-card"
                />
              </div>

              {error && <Alert tone="destructive">{error}</Alert>}

              <Button
                type="submit"
                className="h-11 w-full bg-[#1d4ed8] text-[15px] text-white shadow-lg shadow-blue-600/25 hover:bg-[#1e40af]"
                disabled={busy}
              >
                {busy && <Loader2Icon className="animate-spin" />}
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>

          <p className="text-muted-foreground mt-6 text-center text-xs">
            Need access? Ask your website administrator.
          </p>
        </div>
      </section>
    </main>
  );
}
