import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/admin/lib/auth";
import {
  deleteTestimonial,
  listTestimonials,
  reorderTestimonials,
  restoreTestimonial,
  togglePublishTestimonial,
} from "@/admin/lib/api";
import type { AdminTestimonial } from "@/admin/lib/types";
import { API_BASE, type ApiError } from "@/lib/api";
import { Alert } from "@/admin/components/ui/alert";
import { Badge } from "@/admin/components/ui/badge";
import { Button } from "@/admin/components/ui/button";
import { Card } from "@/admin/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/admin/components/ui/table";

const PAGE_SIZE = 25;

const RATING_MAX = 5;

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    const e = err as ApiError;
    if (e.status === 401) return "Your session has expired. Please sign in again.";
    if (e.status === 403) return "You do not have access";
    if (e.status === 0 || !e.status) return "Network error — check your connection.";
  }
  return "Could not load testimonials";
}

function initials(name: string): string {
  return name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase();
}

function ratingStars(rating: number): string {
  const filled = Math.max(0, Math.min(RATING_MAX, rating));
  return "★".repeat(filled) + "☆".repeat(RATING_MAX - filled);
}

export function TestimonialsPage() {
  const navigate = useNavigate();
  const { role } = useAuth();
  // Delete / restore / "Show deleted" are super_admin-only.
  const isSuperAdmin = role === "super_admin";
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [page, setPage] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<AdminTestimonial | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listTestimonials({ deleted: showDeleted });
      setItems(res);
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) navigate("/admin/login", { replace: true });
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [showDeleted, navigate]);

  useEffect(() => { void load(); }, [load]);

  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  async function onTogglePublish(t: AdminTestimonial) {
    setBusy(true);
    setError(null);
    try {
      await togglePublishTestimonial(t.id, !t.isPublished);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  async function onReorder(newOrder: AdminTestimonial[]) {
    setBusy(true);
    setError(null);
    try {
      await reorderTestimonials(newOrder.map((t) => t.id));
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  function moveUp(index: number) {
    if (index <= 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    setItems(next);
    void onReorder(next);
  }

  function moveDown(index: number) {
    if (index >= items.length - 1) return;
    const next = [...items];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    setItems(next);
    void onReorder(next);
  }

  async function onDelete() {
    if (!confirming) return;
    setBusy(true);
    setError(null);
    try {
      await deleteTestimonial(confirming.id);
      setConfirming(null);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  async function onRestore(t: AdminTestimonial) {
    setBusy(true);
    setError(null);
    try {
      await restoreTestimonial(t.id);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Testimonials</h1>
            <p className="text-sm text-muted-foreground">Manage client testimonials shown on the home page</p>
          </div>
          <Button onClick={() => navigate("/admin/testimonials/new")}>New testimonial</Button>
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
          <div className="border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {isSuperAdmin && (
                <Button
                  variant={showDeleted ? "secondary" : "outline"}
                  size="sm"
                  aria-pressed={showDeleted}
                  onClick={() => { setShowDeleted((v) => !v); setPage(1); }}
                >
                  {showDeleted ? "Showing deleted" : "Show deleted"}
                </Button>
              )}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Portrait</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-muted-foreground">Company</TableHead>
                <TableHead className="text-right w-16">Rating</TableHead>
                <TableHead className="w-20">Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && items.length === 0
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <TableCell key={j}>
                          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : items.length === 0
                  ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-14 text-center text-muted-foreground">
                        No testimonials found
                      </TableCell>
                    </TableRow>
                  )
                  : paged.map((t, i) => {
                      const globalIndex = (page - 1) * PAGE_SIZE + i;
                      const imageUrl = t.image ? `${API_BASE}${t.image}` : null;
                      return (
                        <TableRow key={t.id}>
                          <TableCell>
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt=""
                                loading="lazy"
                                className="size-10 shrink-0 rounded-full object-cover ring-1 ring-border"
                              />
                            ) : (
                              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-400/15 text-sm font-bold text-sky-200 ring-1 ring-sky-300/40">
                                {initials(t.name)}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{t.name}</span>
                            {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {t.company ?? "-"}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-right">
                            {ratingStars(t.rating)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={t.isPublished ? "outline" : "secondary"}
                              className="text-xs"
                            >
                              {t.isPublished ? "Published" : "Hidden"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/admin/testimonials/${t.id}/edit`)}
                              >
                                <PencilIcon className="size-3.5" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={busy}
                                onClick={() => onTogglePublish(t)}
                              >
                                {t.isPublished ? "Hide" : "Publish"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={busy || globalIndex === 0}
                                onClick={() => moveUp(globalIndex)}
                                className="text-destructive hover:text-destructive"
                              >
                                <ChevronUpIcon className="size-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={busy || globalIndex === items.length - 1}
                                onClick={() => moveDown(globalIndex)}
                                className="text-destructive hover:text-destructive"
                              >
                                <ChevronDownIcon className="size-3" />
                              </Button>
                              {isSuperAdmin && (showDeleted ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={busy}
                                  onClick={() => void onRestore(t)}
                                >
                                  <RotateCcwIcon className="size-3.5" />
                                  Restore
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={busy}
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setConfirming(t)}
                                >
                                  <Trash2Icon className="size-3.5" />
                                </Button>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
            </TableBody>
          </Table>
        </Card>

        {items.length > 0 && (
          <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {`Page ${page} of ${pages} · ${items.length} total`}
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

      {confirming && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <div className="w-full max-w-sm rounded-lg border bg-card p-5 shadow-lg">
            <h2 id="confirm-delete-title" className="text-base font-semibold">
              Delete testimonial?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              “{confirming.name}” will be moved to deleted. You can restore it later.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => setConfirming(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={busy}
                onClick={() => void onDelete()}
              >
                {busy ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
