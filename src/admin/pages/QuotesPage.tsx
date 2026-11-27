import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listQuotes, updateQuoteStatus } from "@/admin/lib/api";
import type { Quote, QuoteStatus } from "@/admin/lib/types";
import { QUOTE_STATUSES } from "@/admin/lib/types";
import { type ApiError } from "@/lib/api";
import { Alert } from "@/admin/components/ui/alert";
import { Button } from "@/admin/components/ui/button";
import { Card } from "@/admin/components/ui/card";
import { Input } from "@/admin/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/admin/components/ui/select";
import { Skeleton } from "@/admin/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/admin/components/ui/table";
import { QuoteStatusBadge } from "@/admin/components/StatusBadge";
import { QuoteSheet } from "@/admin/components/QuoteSheet";

const PAGE_SIZE = 25;
const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    const e = err as ApiError;
    if (e.status === 401) return "Your session has expired. Please sign in again.";
    if (e.status === 403) return "You do not have access";
    if (e.status === 0 || !e.status) return "Network error — check your connection.";
  }
  return "Could not load quotes";
}

export function QuotesPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Quote[]>([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"" | QuoteStatus>("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listQuotes({
        page,
        limit: PAGE_SIZE,
        status: statusFilter || "",
      });
      setItems(res.quotes);
      setTotal(res.total);
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) navigate("/admin/login", { replace: true });
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, navigate]);

  useEffect(() => { void load(); }, [load]);

  // Client-side search over the current page (API has no search param)
  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const lq = q.toLowerCase();
    return items.filter(
      (r) =>
        r.name.toLowerCase().includes(lq) ||
        r.email.toLowerCase().includes(lq) ||
        (r.phone ?? "").includes(lq) ||
        (r.company ?? "").toLowerCase().includes(lq),
    );
  }, [items, q]);

  async function changeStatus(next: QuoteStatus) {
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      const res = await updateQuoteStatus(selected.id, next);
      setSelected(res.data);
      setItems((prev) => prev.map((e) => (e.id === res.data.id ? res.data : e)));
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setSaving(false);
    }
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold tracking-tight">Quotes</h1>
          <p className="text-sm text-muted-foreground">
            Incoming product and service quote requests
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        {error && (
          <Alert tone="destructive" className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => void load()}>
              Retry
            </Button>
          </Alert>
        )}

        <Card className="gap-0 py-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Client-side search */}
            <div className="relative w-full sm:max-w-sm">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, email, phone, company…"
                className="pl-9"
                aria-label="Search quotes"
              />
            </div>

            <Select
              value={statusFilter || "all"}
              onValueChange={(v) => {
                setStatusFilter(v === "all" ? "" : (v as QuoteStatus));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]" aria-label="Filter by status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {QUOTE_STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Product / Model</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && filtered.length === 0
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full max-w-[140px]" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : filtered.length === 0
                  ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-14 text-center text-muted-foreground">
                        {total === 0
                          ? "No quote requests yet"
                          : `No quotes${statusFilter ? ` with status "${statusFilter}"` : ""}${
                              q ? ` matching "${q}"` : ""
                            }.`}
                      </TableCell>
                    </TableRow>
                  )
                  : filtered.map((r) => (
                    <TableRow
                      key={r.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(r)}
                      data-state={selected?.id === r.id ? "selected" : undefined}
                    >
                      <TableCell>
                        <span className="font-medium">{r.name}</span>
                        {r.company && (
                          <div className="text-xs text-muted-foreground">{r.company}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${r.email}`}
                          onClick={(ev) => ev.stopPropagation()}
                          className="underline-offset-4 hover:underline"
                        >
                          {r.email}
                        </a>
                        <div>
                          {r.phone ? (
                            <a
                              href={`tel:${r.phone.replace(/\s/g, "")}`}
                              onClick={(ev) => ev.stopPropagation()}
                              className="text-muted-foreground hover:underline"
                            >
                              {r.phone}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{r.product_name ?? "-"}</span>
                        {r.model_number && (
                          <div className="text-xs text-muted-foreground">{r.model_number}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.brand_name ?? "-"}
                      </TableCell>
                      <TableCell>
                        <QuoteStatusBadge status={r.status} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {fmt(r.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Card>

        {total > 0 && (
          <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {`Page ${page} of ${pages} · ${total} total`}
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-muted-foreground">
                {page} / {pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </nav>
        )}
      </main>

      <QuoteSheet
        quote={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        onChangeStatus={changeStatus}
        saving={saving}
      />
    </div>
  );
}
